import { BehaviorSubject } from "rxjs";
import { handleResponse } from "../utils/authHandleResponse";

const getUserFromStorage = () => {
    const curruser = localStorage.getItem('currentUser');
    return curruser ? JSON.parse(curruser) : null;
}
//Inspired in https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example
const currentUserSubject = new BehaviorSubject<any>(getUserFromStorage());

export const authService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { 
        return currentUserSubject.value 
    }
};

interface UserModel{
    token: string;
}

function login(name:string, password:string): Promise<UserModel> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function register(name:string, password:string) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    };

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, requestOptions)
        .then(handleResponse)
        .then(() => login);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}