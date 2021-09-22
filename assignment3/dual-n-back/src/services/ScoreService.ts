import { handleResponse } from '../utils/authHandleResponse';
import { authService } from './authService';

export const scoreService = {
    postScore,
    getScores
};

interface ScoreModel {
    timestamp: Date;
    value: number;
}

function postScore(value: number) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authService.currentUserValue.token
        },
        body: JSON.stringify({ timestamp: new Date(), value })
    };

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/scores`, requestOptions);
}

function getScores() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${process.env.REACT_APP_API_BASE_URL}/scores`, requestOptions);
}