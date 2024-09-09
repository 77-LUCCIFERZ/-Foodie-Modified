import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
 import mailSvc from '../../service/mail.service.js';
 import { randomString } from '../../utilities/helpers.js';
import userModel from './userModel.js'; 

class UserService {

    transformUserCreate = async (req) => {
        // Data mapping
        const data = req.body;
       

        // Password encryption
        data.password = await bcrypt.hashSync(data.password,10);

        // User account manipulation
        data.status = "inactive"; // For the first time when we create the account, the account is inactive
        data.activationToken = randomString(100); // Generate activation token
        data.activeFor = new Date(Date.now() + 8* 60 * 60 * 1000); // Expiry time set to 8 hours from now

        return data; // Return the transformed data to be used elsewhere
    }

    sendActivationEMail = async ({ to, name, token, subject = "Activate your account" }) => {
        try {
            await mailSvc.sendEmail({
                to: to,
                subject: subject,
                message: `
                    <p> Dear ${name}, </p>
                    <p> Your account has been registered successfully.</p>
                    <p> Please click on the link below or copy-paste the URL into your browser to activate your account.</p>
                    <p> ^^^^This token is only active for 3 hours ^^^^ </p>
                    <a href="${process.env.FRONTEND_URL}/activate/${token}">
                        ${process.env.FRONTEND_URL}/activate/${token}
                    </a>
                    <p> ------------------------------------------------------------------------------</p>
                    <p> Regards, </p>
                    <p> System admin </p>
                    <p> ${process.env.STMP_FROM} </p>
                    <p>
                        <small>
                            <em> Please don't reply to this email </em>
                        </small>
                    </p>
                `
            });
        } catch (exception) {
            console.log(exception);
        }
    }

    storeUser = async (data) => { // store data inactive
        try {
            
            const user = new userModel(data); // Create a new instance of the User model
            return await user.save(); // Insert the new user into the database
        } catch (exception) {
            throw exception;
        }
    }

    getSingleUserByFilter = async (filter) => {
        try {
            // Retrieve a single user by a filter (e.g., email, username)
            const user = await userModel.findOne(filter);
            return user;
        } catch (exception) {
            throw exception;
        }
    }

    
}

// Export the class as the default export
export default new UserService();
