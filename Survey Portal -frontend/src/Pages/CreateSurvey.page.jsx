import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { ToastContainer, toast } from "react-toastify";
import InputField from "../components/InputField";
import "../Styles/createSurvey.css";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addQuestions,
  clearQuestions,
  delQuestions,
} from "../redux/action/questions.action";
import { addSurvey, getSurveys } from "../redux/action/survey.action";

function generateId() {
  let id = 1;
  this.incrementId = function () {
    return id++;
  };

  this.getId = function () {
    return id;
  };
}

const CreateSurvey = ({
  userData,
  qnsData,
  addQns,
  delQns,
  surveys,
  getSurvey,
  addSurvey,
  clearAllQns,
}) => {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { topic} = qs;
  
      
  const navigate = useNavigate();

  const [fields, setFields] = useState([]);
  const [genId, setGenId] = useState(null);
  const [surveyLength, setSurveyLength] = useState(0);

  const addInputField = () => {
    let id = genId.incrementId();
    addQns({ id, question: "", rate: 0 });
  };

  const postSurvey = () => {
    let arr = qnsData.questions.map(({ question }) => {
      return question;
    });

    if (arr.indexOf("") === -1) {
      addSurvey({ topic:topic, questions: arr, completed: [] });
      console.log("data added succesfully");
      toast.success(`Survey for ${topic} posted successfully`, {
        position: "top-center",
      });
      
      setTimeout(() => {
        navigate("/");
      }, 5000);
}
    else {
      toast.error("Please enter all the questions", {
        position: "top-center",
      });
    }
    
    
  };

  useEffect(() => {
    getSurvey(userData.user);
    clearAllQns();
    setGenId(new generateId());
    addQns({ id: 0, question: "", rate: 0 });
  }, [addQns, clearAllQns, getSurvey, userData.user]);

  useEffect(() => {
    let arr = qnsData.questions.map((question) => {
      return {
        id: question.id,
        field: <InputField id={question.id} type="create" />,
      };
    });
    setFields(arr);
  }, [qnsData]);

  // useEffect(() => {
  //   if (surveyLength < surveys.length) {
  //     if (surveys.error === null) {
  //       toast.success("Survey Posted Succesfully...", {
  //         position: "top-center",
  //       });
  //       setTimeout(() => {
  //         navigate("/");
  //       }, 5000);
  //     } else {
  //       toast.error(surveys.error, {
  //         position: "top-center",
  //       });
  //     }
  //   }
  //   console.log(surveys);
  // }, [surveys]);

  useEffect(() => {
    console.log(surveyLength);
  }, [surveyLength]);

  return (
    <div className="create-survey-container">
      <h1 style={{ width: "90%", margin: "0 auto", color: "#1b4a33" }}>
        Survey for {topic}
      </h1>
      <form className="form">
        {fields.map((input, index) => {
          return (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItem: "center",
                justifyContent: "space-between",
              }}
              key={index}
            >
              {input.field}
              <ion-icon
                name="remove-circle"
                style={{
                  width: "24px",
                  height: "24px",
                  color: "#ff4444",
                  alignSelf: "center",
                  cursor: "pointer",
                }}
                onClick={() => delQns(input.id)}
              ></ion-icon>
            </div>
          );
        })}
        <div style={{ display: "flex", alignItem: "center", gap: "20px" }}>
          <ion-icon
            name="add-circle"
            style={{
              width: "24px",
              height: "24px",
              color: "#1b4a33",
              cursor: "pointer",
            }}
            onClick={addInputField}
          ></ion-icon>
          <ion-icon
            name="send"
            style={{
              width: "24px",
              height: "24px",
              color: "#1b4a33",
              cursor: "pointer",
            }}
            onClick={postSurvey}
          ></ion-icon>
        </div>
      </form>
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
    addQns: (question) => dispatch(addQuestions(question)),
    delQns: (id) => dispatch(delQuestions(id)),
    clearAllQns: () => dispatch(clearQuestions()),
    getSurvey: (user) => dispatch(getSurveys(user)),
    addSurvey: (survey) => dispatch(addSurvey(survey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSurvey);
