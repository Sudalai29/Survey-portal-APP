import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/action/login.action";

import "../Styles/Header.css";

const Header = ({ userData, logout }) => {
  const { user, loggedIn } = userData;
  const navigate = useNavigate();

  const userlogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar className="navbar">
        <Container className="d-flex align-item-center justify-content-end">
          <nav className="w-50 d-flex align-item-center justify-content-evenly">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
            {!loggedIn ? (
              <>
                <Link to="/signup" className="text-decoration-none">
                  SignUp
                </Link>
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
              </>
            ) : (
              <>
                <a>{user.name}</a>
                <button className="btn btn-danger" onClick={userlogout}>
                  Logout
                </button>
              </>
            )}
          </nav>
        </Container>
      </Navbar>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
