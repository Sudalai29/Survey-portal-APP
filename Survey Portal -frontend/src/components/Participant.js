import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSurveys } from "../redux/action/survey.action";
import Loading from "./Loading";

const Participant = ({ userData, surveys, getSurveys }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("mount");
    getSurveys(userData.user);
  }, []);

  return (
    <>
      <div className="container mt-5">
        <p style={{ fontSize: "24px", color: "#1b4a33", fontWeight: "600" }}>
          Welcome {userData.user.name},
        </p>
        {surveys.loading && <Loading content="Get existing surveys..." />}
        {!surveys.loading && surveys.survey !== null && (
          <div className="surveys-grid">
            {/* {console.log(surveys.survey)} */}
            {surveys.survey.map((survey) => {
              return (
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{survey.topic}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    {survey.questions.map((question, i) => {
                      return (
                        <li className="list-group-item">
                          {`${i + 1})`} {question}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="card-body d-flex align-item-center justify-content-center">
                    <button
                      className="btn btn-success"
                      style={{ height: "50px", width: "50%" }}
                      onClick={() => navigate(`/submitsurvey?id=${survey.id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.Login,
    surveys: state.Surveys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSurveys: (user) => dispatch(getSurveys(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Participant);
