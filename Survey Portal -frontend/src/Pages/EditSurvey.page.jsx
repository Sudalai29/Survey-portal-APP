import queryString from "query-string";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import InputField from "../components/InputField";
import Loading from "../components/Loading";
import {
  addQuestions,
  clearQuestions,
  delQuestions,
} from "../redux/action/questions.action";
import { getSurveyById, updateSurvey } from "../redux/action/survey.action";

const EditSurvey = ({
  survey,
  getSurvey,
  updateSur,
  addQns,
  delQns,
  clearAllQns,
  qnsData,
}) => {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { id } = qs;

  const navigate = useNavigate();

  useEffect(() => {
    clearAllQns();
    console.log(getSurvey(id));
  }, []);

  useEffect(() => {
    if (survey.currentSurvey !== undefined) {
      survey.currentSurvey.questions.map((question, i) => {
        addQns({ id: i, question, rate: 0 });
      });
    }
  }, [survey]);

  useEffect(() => {
    console.log(qnsData);
  }, [qnsData]);

  const updateSurvey = (e) => {
    e.preventDefault();
    let arr = qnsData.questions.map(({ question }) => {
      return question;
    });

    if (arr.indexOf("") === -1) {
      updateSur(survey.currentSurvey.id, {
        ...survey.currentSurvey,
        questions: arr,
        completed: [],
      });
      toast.success(
        `Survey for ${survey.currentSurvey.topic} updated successfully`,
        {
          position: "top-center",
        }
      );
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      toast.error("Please enter all the questions", {
        position: "top-center",
      });
    }
    // console.log(arr);
  };

  return (
    <>
      {survey.currentSurvey === undefined && (
        <Loading content="fetch survey details..." />
      )}
      {survey.currentSurvey !== undefined && (
        <div className="create-survey-container">
          <h1 style={{ width: "90%", margin: "0 auto", color: "#1b4a33" }}>
            Survey for {survey.currentSurvey.topic}
          </h1>
          <form className="form">
            {survey.currentSurvey.questions.map((question, i) => {
              // console.log({ id: i, question });
              return <InputField id={i} type="edit" value={question} />;
            })}
            <button className="btn btn-success" onClick={updateSurvey}>
              Update survey
            </button>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    survey: state.Surveys,
    qnsData: state.Questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addQns: (question) => dispatch(addQuestions(question)),
    delQns: (id) => dispatch(delQuestions(id)),
    clearAllQns: () => dispatch(clearQuestions()),
    getSurvey: (id) => dispatch(getSurveyById(id)),
    updateSur: (id, survey) => dispatch(updateSurvey(id, survey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSurvey);
