import { authService } from "../services/authService";

// Inspired in https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example
export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}