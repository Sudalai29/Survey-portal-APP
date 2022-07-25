import { surveyActionType } from "../actionType/survey.actionType";

const {
  GET_SURVEYS_START,
  GET_SURVEYS_SUCCESS,
  GET_SURVEYS_FAIL,
  GET_SURVEY_BY_ID,
  ADD_SURVEY,
  DEL_SURVEY,
  UPDATE_SURVEY,
} = surveyActionType;

const initialState = {
  survey: null,
  loading: false,
  error: null,
  currentSurvey: null,
};

export const surveyReducer = (state = initialState, { type, payload }) => {
  console.log(type);
  switch (type) {
    case GET_SURVEYS_START:
      return { ...state, loading: true };
    case GET_SURVEYS_SUCCESS:
      return { survey: payload, loading: false, error: null };
    case GET_SURVEYS_FAIL:
      return { ...state, loading: false, error: payload };
    case GET_SURVEY_BY_ID:
      const survey = state.survey.find((s) => {
        return s.id === parseInt(payload);
      });
      return { ...state, currentSurvey: survey };
    case ADD_SURVEY:
      return { ...state, survey: [...state.survey, payload], error: null };
    case DEL_SURVEY:
      const remain = state.survey.filter((survey) => {
        return survey.id !== parseInt(payload);
      });
      console.log(remain);
      return { ...state, survey: remain, error: null };
    case UPDATE_SURVEY:
      const remainSurvey = state.survey.filter((survey) => {
        return survey.id !== payload.id;
      });
      return {
        ...state,
        survey: [...remainSurvey, payload.survey],
        currentSurvey: null,
      };
    default:
      return state;
  }
};
