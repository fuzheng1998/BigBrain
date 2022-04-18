import * as data from './config.json';

const BACKEND_PORT = data.BACKEND_PORT

export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`
export const AUTH = {
    REGISTER_URL:`${BACKEND_URL}/admin/auth/register`,
    LOGIN_URL:`${BACKEND_URL}/admin/auth/login`,
    LOGOUT_URL:`${BACKEND_URL}/admin/auth/logout`
}
export const QUIZ = {
    ADD_URL: `${BACKEND_URL}/admin/quiz/new`,

}

export const PLAYER = {
}
