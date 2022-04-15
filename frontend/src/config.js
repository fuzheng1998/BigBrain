import fs from 'fs';

const configData = JSON.parse(fs.readFileSync('../frontend/src/config.json'));
export const BACKEND_PORT = 'BACKEND_PORT' in configData ? configData.BACKEND_PORT : 5000;

export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`
export const AUTH = {
    REGISTER_URL:`${BACKEND_URL}/admin/auth/register`,
    LOGIN_URL:`${BACKEND_URL}/admin/auth/login`,
    LOGOUT_URL:`${BACKEND_URL}/admin/auth/logout`
}
export const QUIZ = {
}

export const PLAYER = {
}