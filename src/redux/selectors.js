export const getUser = state => state.currentUser.currentUser;
export const getAllUsers = state => state.users.users;
export const clientId = state => state.currentUser.clientId;
export const isUserReadyToStartQuiz = state => state.quizReducer.isUserReadyToStartQuiz;
export const setQuiz = state => state.quizReducer.setQuiz;
export const setQuizWaiting = state => state.quizReducer.setQuizWaiting;
export const getQuestions = state => state.questionsList.questions;
export const getAnswers = state => state.quizReducer.answers;
export const setCurrentQuestion = state => state.quizReducer.currentQuestion;
export const quizResult = state => state.quizReducer.quizResult;
export const resultsList = state => state.quizReducer.resultsList;
export const getScore = state => state.quizReducer.correctAnswerCount;
export const getCorrectAnswerCount = state => state.quizReducer.correctAnswerCount;
export const getMessage = state => state.chatReducer.userMessage;
export const getMessages = state => state.chatReducer.messages;

