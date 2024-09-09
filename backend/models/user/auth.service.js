import userService from '../user/user.service.js';

class AuthService {
    // Validate activation token
    validateActivationToken = async (token) => {
        try {
            if (!token) {
                throw { status: 400, message: "Token required for validation"};
            }

            const user = await userService.getSingleUserByFilter({
                activationToken: token
            });
            user.activeFor = new Date(Date.now() + 6 * 60 * 60 * 1000); // Set active time

            if (!user) {
                throw { status: 400, message: "Token not found or broken or expired" };
            }
            return user;
        } catch (exception) {
            console.log("Auth service => validateActivationToken => Error", exception);
            throw exception;
        }
    }

  
  

    
}

export default new AuthService();
