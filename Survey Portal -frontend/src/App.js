import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./Pages/Home.page";
import SignUp from "./Pages/SignUp.page";
import LoginPage from "./Pages/Login.page";
import CreateSurvey from "./Pages/CreateSurvey.page";
import Details from "./components/Details";
import Errror from "./components/Errror";
import { Routes, Route } from "react-router-dom";
import EditSurvey from "./Pages/EditSurvey.page";
import SubmitSurvey from "./Pages/submitSurvey.page";
import ViewSurveyResponse from "./Pages/ViewSurveyResponse.page";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<Details />} />
        <Route path="/createsurvey/*" element={<CreateSurvey />} />
        <Route path="/editsurvey/*" element={<EditSurvey />} />
        <Route path="/submitsurvey/*" element={<SubmitSurvey />} />
        <Route path="/viewsurvey/*" element={<ViewSurveyResponse />} />
        <Route path="*" element={<Errror />} />
      </Routes>
    </>
  );
}

export default App;
