import userService from '../user/user.service.js';

class AuthService {
    // Validate activation token
    validateActivationToken =  (token) => {
        try {
            if (!token) {
                throw { status: 400, message: "Token required for validation" };
            }

            const user =userService.getSingleUserByFilter({activationToken:token});// activayion token prop should be passed in same line it didnt worked until

            if (!user) {
                throw { status: 400, message: "Invalid or expired token ==>auth.service"};
                
            }
       
            

            return user;
        } catch (exception) {
            console.log("AuthService => validateActivationToken => Error", exception);
            throw exception;
        }
    }
}

export default new AuthService();
