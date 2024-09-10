import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import mailSvc from '../../service/mail.service.js';
import { randomString } from '../../utilities/helpers.js';
import userModel from './userModel.js';

class UserServicE {
    // Transform user data before saving to db
    transformUserCreate = (req) => {
        const data = req.body;

        // Ensure the required fields are present
        if (!data.password) {
            throw { status: 400, message: "Password is required" };
        }

        // Hash password synchronously
        data.password = bcrypt.hashSync(data.password,10);

        // Set default user status and token info
        data.status = "inactive";  // User starts as inactive
        data.activationToken = randomString(40);  // Generate activation token
        data.activeFor = new Date(Date.now() + 8 * 60 * 60 * 1000);  // Expire in 8 hours

        return data;
    }

    // Send an activation email to the user
    sendActivationEMail = async ({ to, name, token, subject = "Activate your account" }) => {
        try {
            await mailSvc.sendEmail({
                to,
                subject,
                message: `
                    <p> Dear ${name}, </p>
                    <p> Your account has been registered successfully.</p>
                    <p> Please click on the link below or copy-paste the URL into your browser to activate your account.</p>
                    <p> ^^^^This token is only active for 8 hours ^^^^ </p>
                    <a href="${process.env.FRONTEND_URL}/activate/${token}">
                        ${process.env.FRONTEND_URL}/activate/${token}
                    </a>
                    <p> ------------------------------------------------------------------------------</p>
                    <p> Regards, </p>
                    <p> System admin </p>
                    <p> ${process.env.SMTP_FROM} </p>
                    <p>
                        <small>
                            <em> Please don't reply to this email </em>
                        </small>
                    </p>
                `
            });
        } catch (exception) {
            console.log("Error sending activation email:", exception);
        }
    }

    sendPostActivationEmail = async ({ to, name }) => {
        try {
            return await mailSvc.sendEmail({
                to: to,
                subject: 'Account Activated',
                message: `<p>Dear ${name},<p>
            <p>Your account has been activated successfully.<p>
            <hr/>
            <p>Regards</p>
            <p>System Admin</p>
            <p>${process.env.SMTP_FROM}</p>
            <p>
            <small>
            <em>Please do not reply to this email</em>
            </small>
            </p>`
            })

        } catch (e) {
            throw (e)
        }
    }


    // Store the user in the database
 storeUser = async (data) => {
        try {
            const user = new userModel(data);
            return await user.save()
        } catch (exception) {
            console.log("Error storing user:", exception);
            throw exception;
        }
    }

    // Retrieve a user by a given filter
    getSingleUserByFilter = async (filter) => {
        try {
            return await userModel.findOne(filter);
        } catch (exception) {
            console.log("Error retrieving user:", exception);
            throw exception;
        }
    }
}
const UserService = new UserServicE
export default UserService
