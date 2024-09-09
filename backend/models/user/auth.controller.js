import {GeneralStatus } from "../../config/constants.js";
import userService from "../user/user.service.js";
import authService from "../user/auth.service.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

class AuthController {
    activateUser = async (req, res, next) => {
        try {
            const token = req.params.token;
            const user = await authService.validateActivationToken(token);

            // Ensure `activeFor` is defined in `authService`
            const tokenCreatedAt = user.activeFor.getTime();
            const today = Date.now();

            if (tokenCreatedAt < today) {
                throw { status: 401, detail: { token: "expired" }, message: "Token expired" };
            }

            user.activationToken = null;
            user.activeFor = null;
            user.status = GeneralStatus.ACTIVE;

            await user.save();

            res.json({
                result: null,
                message: "Your account has been activated successfully. Please login to proceed further.",
                meta: null
            });
        } catch (exception) {
            next(exception);
        }
    };

    // resendActivationToken = async (req, res, next) => {
    //     try {
    //         const token = req.params.token || null;
    //         const user = await authService.validateActivationToken(token);

    //         user.activationToken = randomString(100);
    //         user.activeFor = new Date(Date.now() + (6 * 60 * 60 * 1000)); // 3 hours

    //         await user.save();

    //         // Sending re-activation email
    //         await userService.sendActivationEmail({
    //             to: user.email,
    //             name: user.name,
    //             token: user.activationToken,
    //             sub: "Re-activate your account"
    //         });

    //         res.json({
    //             result: null,
    //             message: "Activation token resent successfully.",
    //             meta: null
    //         });
    //     } catch (exception) {
    //         console.log("Auth.controller => resendActivationToken => Error", exception);
    //         next(exception);
    //     }
    // };

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getSingleUserByFilter({ email });

            if (!userExists) {
                throw { status: 400, message: "Invalid credentials provided" };
            }

            if (user && user.status === GeneralStatus.ACTIVE) {
                if (bcrypt.compareSync(password, userExists.password)) {
                    const token = jwt.sign({
                        sub: userExists._id,
                        type: "bearer"
                    }, process.env.JWT_SECRET, {
                        expiresIn: "6h"
                    });

                  


                     res.json({
                       success:true,
                        token: {
                            access: token,
                            refresh: refreshToken
                        },
                        message: "You have successfully logged in.",
                        meta: null
                    });
                } else {
                    throw { status: 400, message: "Credentials don't match" };
                }
            } else {
                throw { status: 400, message: "User not activated" };
            }
        } catch (exception) {
            next(exception);
        }
    };

    getLoggedInUser = async (req, res, next) => {
        try {
            res.json({
                result: req.authUser,
                meta: null,
                message: "Your profile"
            });
        } catch (exception) {
            next(exception);
        }
    };

    logout = async (req, res, next) => {
        try {
            const authUser = req.authUser;
            const currentPat = req.currentsession;

            const query = req.query.logout || null;
            if (query === "all") {
                // Logout from all sessions
                await authService.deletePAT({
                    userId: authUser._id
                });
            } else {
                // Logout from the current session or token
                await authService.deletePAT({
                    _id: currentPat._id
                });
            }
            res.json({
                result: null,
                message: "Logged out successfully",
                meta: null
            });
        } catch (exception) {
            next(exception);
        }
    };
}

export default new AuthController();
