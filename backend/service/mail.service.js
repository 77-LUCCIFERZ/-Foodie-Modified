import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

class MailService {
    #transport;
    constructor() {
        try {
            this.#transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_PORT == 465, // true if port is 465, otherwise false benv bata
                service: process.env.SMTP_SERVICE || 'gmail', // 'gmail' by default from env
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            this.#transport.verify((error, success) => {
                if (error) {
                    console.error('SMTP configuration is incorrect:', error);
                } else {
                    console.log('SMTP configuration is valid.');
                }
            });

        } catch (exception) {
            console.log(exception)
            console.log('Error connecting to SMTP')
            throw {
                status: 500,
                message: 'Error connecting to SMTP',
                detail: exception
            }
        }
    }
    sendEmail = async ({ to, subject, message, attachments = null }) => {
        try {
            const msgOpts = {
                to: to,
                from: process.env.SMTP_FROM,
                subject: subject,
                html: message,
            };
            if (attachments) {
                msgOpts['attachments'] = attachments
            }

            await this.#transport.sendMail(msgOpts)
            return true

        } catch (exception) {
            console.log(exception)
            console.log('Error in sending mail')
            throw { status: 500, message: 'Error in sending mail', detail: exception }

        }

    }
}


const mailSvc = new MailService()
export default mailSvc;