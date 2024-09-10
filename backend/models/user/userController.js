
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import UserService from "../user/user.service.js";
import { GeneralStatus } from "../../config/constants.js";
import authService from "./auth.service.js";


dotenv.config();

// Login user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userExists = await UserService.getSingleUserByFilter({ email: email })

        if (!userExists) {
            throw { status: 400, message: 'Invalid credentials provided' }
        }
        if (userExists && userExists.status === GeneralStatus.ACTIVE) {
            if (bcrypt.compareSync(password, userExists.password)) {

                const token = jwt.sign({ sub: userExists._id, type: 'bearer' }, process.env.JWT_SECRET,
                    { expiresIn: '12h' })

                const refreshToken = jwt.sign({ sub: userExists._id, type: 'refresh' }, process.env.JWT_SECRET,
                    { expiresIn: '1day' })

                //pat table populate
                await authService.populatePat(userExists._id, { token, refreshToken })

                res.json({
                    result: {
                        userDetail: {
                            _id: userExists._id,
                            name: userExists.name,
                            email: userExists.email,
                            role: userExists.role,
                            image: userExists.image
                        },
                        token: {
                            access: token,
                            refresh: refreshToken
                        }
                    },
                    message: "You have been successfully loggedin.",
                    meata: null
                })

            } else {
                throw { status: 400, message: 'Invalid credentials does not match' }
            }

        } else {
            throw { status: 400, message: 'User not activated' }
        }

    } catch (error) {
        next(error)
    }
}


// Register user
const registerUser = async (req, res, next) => {
    try {
        // Transform user data (e.g., hash password, set activation token)
        const data = await UserService.transformUserCreate(req); // Here it sends the request to the user.service.js, it modifies the request
        // After this line, we have activeFor, status, and hashed password
        const user = await UserService.storeUser(data);// Store user data in the database

        // Sending activation email
        await UserService.sendActivationEMail({
            to: user.email,
            name: user.name,
            token: user.activationToken
        });

        return res.json({
            result: {
                _id: user._id,
                name: user.name,
                email: user.email,
                activationToken: user.activationToken, // It should be of user.model
                activeFor: user.activeFor,
                phone: user.phone
            },
            message: "User created successfully",
            meta: null
        });
    } catch (exception) {
        next(exception);
    }
};

export { loginUser, registerUser };
