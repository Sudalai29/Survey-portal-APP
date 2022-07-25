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
import {
  deleteSurvey,
  getSurveyById,
  updateSurvey,
} from "../redux/action/survey.action";

const SubmitSurvey = ({
  survey,
  getSurvey,
  updateSur,
  deleteSurvey,
  addQns,
  delQns,
  clearAllQns,
  qnsData,
  userData,
}) => {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { id } = qs;

  const navigate = useNavigate();

  useEffect(() => {
    clearAllQns();
    getSurvey(id);
  }, []);

  useEffect(() => {
    if (survey.currentSurvey !== undefined) {
      survey.currentSurvey.questions.map((question, i) => {
        addQns({ id: i, question, rate: 0 });
      });
    }
  }, [survey]);

  // useEffect(() => {
  //   console.log(qnsData);
  // }, [qnsData]);

  const submitSurvey = (e) => {
    e.preventDefault();
    let arr = qnsData.questions.map(({ question, rate }) => {
      return { question, rate };
    });
    // console.log(arr);
    if (
      arr.find((details) => {
        return details.rate === 0;
      })
    ) {
      toast.error("Please give your rating for all the questions", {
        position: "top-center",
      });
    } else {
      
      toast.success(
        `Survey for ${survey.currentSurvey.topic} submitted successfully`,
        
        {
          position: "top-center",
        }
        
      );
      updateSur(survey.currentSurvey.id, {
        ...survey.currentSurvey,
        completed: [
          ...survey.currentSurvey.completed,
          { id: userData.user.id, response: arr },
        ],
      });
      // deleteSurvey(survey.currentSurvey.id);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
    console.log(arr);
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
              return <InputField id={i} type="submit" value={question} />;
            })}
            <button className="btn btn-success" onClick={submitSurvey}>
              Submit
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
    userData: state.Login,
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
    delSurvey: (id) => dispatch(deleteSurvey(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitSurvey);
