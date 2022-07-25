import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SIgn_img from "../components/SIgn_img";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { login } from "../redux/action/login.action";
import "../Styles/homes.css";
const Login = ({ userData, login }) => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    name: "",
    password: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = async (e) => {
    e.preventDefault();
    const { name, password } = inpval;
    // const getuserArr = localStorage.getItem("useryoutube");
    // console.log(getuserArr);

    if (name === "") {
      toast.error("name field is requred", {
        position: "top-center",
      });
    // } else if (!email.includes("@")) {
    //   toast.error("plz enter valid email addres", {
    //     position: "top-center",
    //   });
    } else if (password === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else {
      const user = await getUserDetail();
      if (user !== null) {
        // const userdata = JSON.parse(getuserArr);
        // const userlogin = userdata.filter((el, k) => {
        //   return el.email === email && el.password === password;
        // });
        toast.success("user login succesfully", {
          position: "top-center",
        });
        setTimeout(() => {
          login({ ...user });
          history("/");
        }, 5000);
      } else {
        toast.error("User credential not match", {
          position: "top-center",
        });
      }
    }
  };

  const getUserDetail = async () => {
    const { name, password } = inpval;
    let user = null;
    user = await fetch(`http://localhost:3001/survoyer?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.name===name && data.password === password) {
          return data;
        } else {
          return null;
        }
      });
    if (user === null) {
      user = await fetch(`http://localhost:3001/participants?name=${name}`)
        .then((res) => res.json())
        .then((data) => {
          if (
            data.length > 0 &&
            data[0].name === name &&
            data[0].password === password
          )
            return data[0];
          else return null;
        });
    }

    return user;
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign IN</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  onChange={getdata}
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 col-lg-6"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Don't Have an Account{" "}
              <Link
                to="/signup"
                style={{
                  color: "#1b4a33",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                SignUp
              </Link>
            </p>
          </div>
          <SIgn_img />
        </section>
        <ToastContainer />
      </div>
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
    login: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
