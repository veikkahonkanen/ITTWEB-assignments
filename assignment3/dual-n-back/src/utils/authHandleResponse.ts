import { withRouter } from "react-router-dom";
import { authService } from "../services/authService";

// Inspired in https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example
export function handleResponse(response: Response) {
    return response.text().then(text => {
        let data;
        try{
            data = text && JSON.parse(text);
        }
        catch{
            data = null;
        }
         
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                authService.logout();
            }

            const error = (data?.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

