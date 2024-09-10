import { GeneralStatus } from "../../config/constants.js";
import userService from "../user/user.service.js";
import authService from "../user/auth.service.js";
import jwt from "jsonwebtoken";
import UserService from "../user/user.service.js";


class AuthController {
    // Activate user with token
    activateUser = async (req, res, next) => {
        try {
            const token = req.params.token;
            const user = await authService.validateActivationToken(token)
            const tokenCreatedAt = user.activeFor.getTime()
            const today = Date.now()
            if (tokenCreatedAt < today) {
                throw { status: 400, detail:{token:'expired'}, message: 'Token expired' }
            }

            // To Activate
            // user.activationToken = null,
            //     user.activeFor = null,
                user.status = GeneralStatus.ACTIVE;

            await user.save();
            await UserService.sendPostActivationEmail({
                to: user.email, name: user.name
            })

            res.json({
                result: null,
                message: 'Your Account has been activated successfully. Please login to further process.'
            })

        } catch (e) {
            next(e)
        }
    }
    // Resend activation token
    resendActivationToken = async (req, res, next) => {
        try {
            const email = req.body.email;
            const user = await userService.getSingleUserByFilter({ email });

            if (!user || user.status === GeneralStatus.ACTIVE) {
                throw { status: 400, message: "Invalid request or user already activated" };
            }

            // Generate a new activation token and set the `activeFor` expiry (6 hours from now)
            user.activationToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "6h" });
            user.activeFor = new Date(Date.now() + (6 * 60 * 60 * 1000)); // Expiry in 6 hours

            await user.save();

            // Sending activation email (userService should handle this)
            await userService.sendActivationEMail ({
                to: user.email,
                name: user.name,
                token: user.activationToken,
                sub: "Activate your account"
            });

            res.json({
                result: null,
                message: "Activation token resent successfully.",
                meta: null
            });
        } catch (exception) {
            console.log("AuthController => resendActivationToken => Error", exception);
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
            const currentSession = req.currentSession;

            const query = req.query.logout || null;
            if (query === "all") {
                // Logout from all sessions
                await authService.deletePAT({ userId: authUser._id });
            } else {
                // Logout from the current session or token
                await authService.deletePAT({ _id: currentSession._id });
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
