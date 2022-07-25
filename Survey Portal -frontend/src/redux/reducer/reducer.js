import { combineReducers } from "redux";
import { loginReducer } from "./login.reducer";
import { questionReducer } from "./questions.reducer";
import { surveyReducer } from "./survey.reducer";

export const reducer = combineReducers({
  Login: loginReducer,
  Questions: questionReducer,
  Surveys: surveyReducer,
});
