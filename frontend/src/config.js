import * as data from './config.json';

const BACKEND_PORT = data.BACKEND_PORT

export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`
export const AUTH = {
  REGISTER_URL: `${BACKEND_URL}/admin/auth/register`,
  LOGIN_URL: `${BACKEND_URL}/admin/auth/login`,
  LOGOUT_URL: `${BACKEND_URL}/admin/auth/logout`
}
export const QUIZ = {
  ADD_URL: `${BACKEND_URL}/admin/quiz/new`,
  GET_LIST_URL: `${BACKEND_URL}/admin/quiz`,
  DELETE_URL: `${BACKEND_URL}/admin/quiz/`,
  PUT_URL: `${BACKEND_URL}/admin/quiz/`,
  GET_SINGLE_URL: (quizid) => `${BACKEND_URL}/admin/quiz/${quizid}`,
  START_URL: (quizid) => `${BACKEND_URL}/admin/quiz/${quizid}/start`,
  END_URL: (quizid) => `${BACKEND_URL}/admin/quiz/${quizid}/end`,
  ADVANCE_URL: (quizid) => `${BACKEND_URL}/admin/quiz/${quizid}/advance`,

}

export const PLAYER = {
  JOIN_URL: (sessionid) => `${BACKEND_URL}/play/join/${sessionid}`,
  STATUS_URL: (playerid) => `${BACKEND_URL}/play/${playerid}/status`,
  ANSWER_URL: (playerid) => `${BACKEND_URL}/play/${playerid}/answer`,
  QUESTION_URL: (playerid) => `${BACKEND_URL}/play/${playerid}/question`,
  RESULTS_URL: (playerid) => `${BACKEND_URL}/play/${playerid}/results`,
}
