import { connect } from "react-redux";
import Admin from "../components/Admin";
import Participant from "../components/Participant";

  

const Home = ({ userData }) => {
  const { user, loggedIn } = userData;

  return (
    <>
      {!loggedIn && <h1>  Welcome to Survey Web Portal </h1>}
      {loggedIn && (user.role === "participant" ? <Participant /> : <Admin />)}
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
    // login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
