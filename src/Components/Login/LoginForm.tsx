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
  const [message, setMessage] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    data.email = data.email.toLowerCase();
    e.target.reset();
    e.preventDefault();
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email) &&
      data.password.length > 8
    ) {
      await authStore.SignIn(data);

      if (authStore.user) {
        navigate(`/Users`);
      } else {
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 3000);
      }
    } else {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 3000);
    }
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
                  keyfilter="email"
                  onChange={handleChange}
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
                feedback={false}
                onChange={handleChange}
                className="w-full password-input "
                toggleMask
              />
            </div>
            {message ? (
              <p style={{ color: "red" }}>Invalid Email or Password</p>
            ) : (
              <></>
            )}
            <div className="password"></div>
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
