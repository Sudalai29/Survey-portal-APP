import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateQuestions } from "../redux/action/questions.action";
import "../Styles/InputField.css";

const InputField = ({ id, updateQns, type, value = "" }) => {
  const [val, setVal] = useState("");

  // const textBox = useRef(null);

  const handleRating = (e, question) => {
    // e.target.name = "star"
    let limit = parseInt(e.target.ariaValueNow);
    let element = e.currentTarget.parentElement;
    for (let i = 0; i < limit; i++) {
      element.children[1].children[i].name = "star";
    }
    for (let i = limit; i < 5; i++) {
      element.children[1].children[i].name = "star-outline";
    }

    updateQns({ ...question, rate: parseInt(limit) });
  };

  // const settextBox = (e) => {
  //   textBox = e.target;
  // };

  // useEffect(() => {
  //   setInput([...input, textBox]);
  // }, [textBox]);

  useEffect(() => {
    if (type === "edit" || type === "submit") setVal(value);
  }, []);

  return (
    <div className="input-group">
      {type === "submit" ? (
        <p style={{ fontSize: "18px", fontWeight: "600", color: "#1b4a33" }}>
          {val}
        </p>
      ) : (
        <input
          id={id}
          type="text"
          placeholder="Enter your question"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={(e) => {
            updateQns({ id, question: e.target.value, rate: 0 });
          }}
        />
      )}
      <div
        className="rate-container"
        onClick={(e) => handleRating(e, { id, question: val, rate: 0 })}
      >
        <ion-icon
          aria-valuenow="1"
          name="star-outline"
          class="hydrated md icon btn"
        ></ion-icon>
        <ion-icon
          aria-valuenow="2"
          name="star-outline"
          class="hydrated md icon btn"
        ></ion-icon>
        <ion-icon
          name="star-outline"
          class="hydrated md icon btn"
          aria-valuenow="3"
        ></ion-icon>
        <ion-icon
          name="star-outline"
          class="hydrated md icon btn"
          aria-valuenow="4"
        ></ion-icon>
        <ion-icon
          name="star-outline"
          class="hydrated md icon btn"
          aria-valuenow="5"
        ></ion-icon>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    qnsData: state.Questions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQns: (question) => dispatch(updateQuestions(question)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
