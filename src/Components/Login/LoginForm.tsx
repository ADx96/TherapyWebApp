import React, { useState } from "react";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authStore from "../../Mobx/AuthStore";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const LoginForm: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    data.username = data.username.toLowerCase();
    e.target.reset();
    navigate(`/MainPage#Users`);
    e.preventDefault();
    // await authStore.SignIn(data);
    // if (authStore.user) {
    //   navigate("/MainPage");
    // } else {
    //   alert("Login Failed");
    // }
  };

  return (
    <div className="wrapper">
      <div className={`login_form ${open ? "" : "is_closed"}`}>
        <div className="left_side">
          <div className="content">
            {open ? (
              <></>
            ) : (
              <div className="login">
                <Button className="login-btn" onClick={() => setOpen(true)}>
                  Click Here to login
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="right_side">
          <i className="pi pi-times close" onClick={() => setOpen(false)}></i>
          <div className="heading">
            <h2>Arabic Read-Right Dashboard</h2>
            <h3>Login</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "block" }}>
              <label htmlFor="email">Email*</label>
              <span className=" p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  className="text-base w-full"
                  id="email"
                  required
                  name="email"
                />
              </span>
            </div>
            <div style={{ display: "block", marginTop: "10px" }}>
              <label htmlFor="password">Password*</label>
              <Password
                id="password"
                required
                name="password"
                className="w-full password-input "
                toggleMask
              />
            </div>
            <div className="password">
              <div className="cbox"></div>
            </div>
            <Button
              className="login-btn"
              style={{ textAlign: "center", display: "block" }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
