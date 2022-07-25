import { questionActionType } from "../actionType/questions.actionType";

const { ADD_QUESTION, DEL_QUESTION, UPDATE_QUESTION, CLEAR_QUESTIONS } =
  questionActionType;

const initailState = {
  questions: [],
};

export const questionReducer = (state = initailState, { type, payload }) => {
  switch (type) {
    case ADD_QUESTION:
      return { questions: [...state.questions, payload] };
    case DEL_QUESTION:
      const remain = state.questions.filter((question) => {
        return question.id !== payload;
      });

      return { questions: remain };
    case UPDATE_QUESTION:
      const remaining = state.questions.filter((question) => {
        return question.id !== payload.id;
      });
      return { questions: [...remaining, payload] };
    case CLEAR_QUESTIONS:
      return initailState;
    default:
      return state;
  }
};
