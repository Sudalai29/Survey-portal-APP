import { questionActionType } from "../actionType/questions.actionType";

const { ADD_QUESTION, DEL_QUESTION, UPDATE_QUESTION, CLEAR_QUESTIONS } =
  questionActionType;

export const addQuestions = (question) => {
  return {
    type: ADD_QUESTION,
    payload: question,
  };
};

export const delQuestions = (id) => {
  return {
    type: DEL_QUESTION,
    payload: id,
  };
};
export const updateQuestions = (question) => {
  return {
    type: UPDATE_QUESTION,
    payload: question,
  };
};

export const clearQuestions = () => {
  return {
    type: CLEAR_QUESTIONS,
  };
};
