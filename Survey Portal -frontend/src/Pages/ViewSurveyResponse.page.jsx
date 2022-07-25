import queryString from "query-string";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { getSurveyById } from "../redux/action/survey.action";

const ViewSurveyResponse = ({ survey, getSurvey }) => {
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { id } = qs;

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/participants")
      .then((res) => res.json())
      .then((data) => setParticipants(data))
      .catch((err) => alert(err));
    getSurvey(id);
  }, []);

  useEffect(() => {
    console.log(survey);
  }, [survey]);

  useEffect(() => {
    console.log(participants);
  }, [participants]);

  const getParticipantName = (id) => {
    const { name } = participants.find((participant) => {
      return participant.id === id;
    });

    console.log(name);
    return name;
  };

  return (
    <>
      {survey.loading ||
        (participants.length === 0 && (
          <Loading content="fetch survey details" />
        ))}
      {!survey.loading &&
        survey.currentSurvey !== undefined &&
        participants.length > 0 &&
        (survey.currentSurvey.completed.length > 0 ? (
          <div className="container mt-5">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Participant Name</th>
                  {survey.currentSurvey.questions.map((question) => {
                    return <th scope="col">{question}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {survey.currentSurvey.completed.map((res, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <th scope="row">{getParticipantName(res.id)}</th>
                      {res.response.map((resp, i) => {
                        return <td key={i}>{resp.rate}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p
            style={{
              fontSize: "42px",
              fontWeight: "900",
              color: "#ff4444",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            No participant Respond yet...
          </p>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    survey: state.Surveys,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSurvey: (id) => dispatch(getSurveyById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurveyResponse);
