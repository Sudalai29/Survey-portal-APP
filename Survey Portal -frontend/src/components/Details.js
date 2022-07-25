import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/action/login.action";

const Details = ({ userData, logout }) => {
  const [logindata, setLoginData] = useState(null);

  const history = useNavigate();

  const [show, setShow] = useState(false);

  var todayDate = new Date().toISOString().slice(0, 10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Birthday = () => {
    // const getuser = localStorage.getItem("user_login");
    // if (getuser && getuser.length) {
    //   const user = JSON.parse(getuser);

    //   setLoginData(user);
    if (logindata.role === "participant") {
      const userBirthday =
        logindata.dob.substring(4) === todayDate.substring(4) ? true : false;
      console.log(
        userBirthday,
        logindata.role,
        logindata.dob.substring(4),
        todayDate.substring(4)
      );
      if (userBirthday) {
        setTimeout(() => {
          //   console.log("ok");
          //   handleShow();
          setShow(true);
        }, 3000);
      }
    }
    // }
  };

  const userlogout = () => {
    logout();
    history("/");
  };

  useEffect(() => {
    setLoginData(userData.user);
  }, []);

  useEffect(() => {
    console.log(show);
  }, [show]);

  useEffect(() => {
    console.log(logindata);
    if (userData.loggedIn === true && logindata !== null) Birthday();
  }, [logindata]);

  return (
    <>
      {logindata === null ? (
        "errror"
      ) : (
        <>
          <h1>detials page</h1>
          <h1>{logindata.name}</h1>
          <Button onClick={userlogout}>LogOut</Button>

          {logindata.dob === todayDate ? (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{logindata.name} 😄</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Wish you many many happy returns of the day ! 🍰
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.Login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
