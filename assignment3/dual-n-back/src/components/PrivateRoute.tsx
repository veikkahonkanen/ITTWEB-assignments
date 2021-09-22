import { Route, Redirect, RouteProps } from "react-router-dom";
import { authService } from "../services/authService";

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component?: any;
}
export const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => (
    <Route {...rest} render={(props) => 
        !!authService.currentUserValue
            ? <Component {...props} />
            : <Redirect to="/login" />
    } />
)