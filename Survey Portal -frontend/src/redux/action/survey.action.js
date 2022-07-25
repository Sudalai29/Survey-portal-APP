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

const getSurveyStart = () => {
  return {
    type: GET_SURVEYS_START,
  };
};

const getSurveySuccess = (surveys) => {
  return {
    type: GET_SURVEYS_SUCCESS,
    payload: surveys,
  };
};

const getSurveyFail = (error) => {
  return {
    type: GET_SURVEYS_FAIL,
    payload: error,
  };
};

export const getSurveyById = (id) => {
  return {
    type: GET_SURVEY_BY_ID,
    payload: id,
  };
};

const addNewSurvey = (survey) => {
  return {
    type: ADD_SURVEY,
    payload: survey,
  };
};

const delSurvey = (id) => {
  return {
    type: DEL_SURVEY,
    payload: id,
  };
};

const patchSurvey = (id, survey) => {
  return {
    type: DEL_SURVEY,
    payload: { id, survey },
  };
};

export const getSurveys = (user) => {
  console.log(user);
  return (dispatch) => {
    dispatch(getSurveyStart());
    fetch("http://localhost:3001/survey")
      .then((res) => res.json())
      .then((data) => {
        if (user.role === "participant") {
          let surveys = data.filter((survey) => {
            // console.log(
            //   survey.completed.indexOf(user.id),
            //   survey.completed.indexOf(user.id) === -1
            // );
            let isCompleted = survey.completed.find((participant) => {
              return participant.id === user.id;
            });
            return isCompleted === undefined;
          });
          // console.log(surveys);
          dispatch(getSurveySuccess(surveys));
        } else {
          dispatch(getSurveySuccess(data));
        }
      })
      .catch((err) => dispatch(getSurveyFail(err)));
  };
};

export const addSurvey = (survey) => {
  console.log(survey);
  return (dispatch) => {
    dispatch(getSurveyStart());
    fetch("http://localhost:3001/survey", {
      method: "POST",
      body: JSON.stringify({ ...survey }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => dispatch(addNewSurvey(data)))
      .catch((err) => dispatch(getSurveyFail(err)));
  };
};

export const deleteSurvey = (id) => {
  console.log(id);
  return (dispatch) => {
    // dispatch(getSurveyStart());
    fetch(`http://localhost:3001/survey/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(delSurvey(id));
      })
      .catch((err) => alert(err));
  };
};

export const updateSurvey = (id, survey) => {
  console.log(id);
  return (dispatch) => {
    // dispatch(getSurveyStart());
    fetch(`http://localhost:3001/survey/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...survey }),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(patchSurvey(id, survey));
      })
      .catch((err) => alert(err));
  };
};
