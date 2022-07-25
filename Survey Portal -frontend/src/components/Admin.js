import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

import "../Styles/Admin.css";
import { connect } from "react-redux";
import { deleteSurvey, getSurveys } from "../redux/action/survey.action";

const Admin = ({ userData, surveys, getSurvey, delSurvey }) => {
  const [surveyName, setSurveyName] = useState("");

  const navigate = useNavigate();

  const createSurvey = (e) => {
    e.preventDefault();

    if (surveyName === "") {
      toast.error("Please fill the Topic Name", {
        position: "top-center",
      });
    } else {
      toast.success(`${surveyName} Topic creating...`, {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => navigate(`/createsurvey?topic=${surveyName}`), 4000);
    }
  };

  const deleteSurvey = (id) => {
    delSurvey(id);
  };

  const editSurvey = (id) => {
    navigate(`/editsurvey?id=${id}`);
  };

  useEffect(() => {
    getSurvey(userData.user);
  }, []);

  return (
    <div className="admin-container">
      <div className="create-survey">
        <input
          // className="w-75"
          type="text"
          value={surveyName}
          placeholder="Enter Topic Name"
          onChange={(e) => setSurveyName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createSurvey}>
          Create
        </button>
      </div>
      {surveys.loading && <Loading content="Get existing surveys..." />}
      {!surveys.loading && surveys.survey !== null && (
        <div className="surveys-grid">
          {/* {console.log(surveys.survey)} */}
          {surveys.survey.map((survey, i) => {
            return (
              <div
                className="card"
                style={{ width: "18rem", cursor: "pointer" }}
                key={i}
                onClick={() => navigate(`/viewsurvey?id=${survey.id}`)}
              >
                <div className="card-body">
                  <h5 className="card-title">{survey.topic}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  {survey.questions.map((question, i) => {
                    return (
                      <li className="list-group-item" key={i}>
                        {`${i + 1})`} {question}
                      </li>
                    );
                  })}
                </ul>
                <div className="card-body d-flex align-item-center justify-content-between">
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSurvey(survey.id);
                    }}
                    style={{ height: "50px", width: "40%" }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      editSurvey(survey.id);
                    }}
                    style={{ height: "50px", width: "40%" }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.Login,
    qnsData: state.Questions,
    surveys: state.Surveys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // addQns: (question) => dispatch(addQuestions(question)),
    // delQns: (id) => dispatch(delQuestions(id)),
    // clearAllQns: () => dispatch(clearQuestions()),
    getSurvey: (user) => dispatch(getSurveys(user)),
    delSurvey: (id) => dispatch(deleteSurvey(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
