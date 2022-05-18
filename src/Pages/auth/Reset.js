import React, { Component } from "react";
import axios from "../../Component/axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SideBanner from "../../Component/SideBanner";
import Messages from "../../Component/Messages";

export default class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      msg: "",
      errMsg: "",
      isError: {
        email: "",
      },
    };
  }

  onChangehandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let data = {};
    data[name] = value;
    this.setState(data);
    let isError = { ...this.state.isError };
    switch (e.target.name) {
      case "email":
        isError.email = e.target.value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
          ? ""
          : "Email address is invalid";
        break;

      default:
        break;
    }
    this.setState({ isError });
  };

  onResetHandler = (e) => {
    e.preventDefault();
    if (this.state.isError.email === "") {
      axios
        .post("/reset_password_without_token", {
          email: this.state.email,
        })
        .then((response) => {
          if (response.data.status === 200) {
            this.setState({
              msg: response.data.message,
              email: "",
            });
            setTimeout(() => {
              this.setState({ msg: "" });
            }, 6000);
          }
          if (response.data.status === "failed") {
            this.setState({
              errMsg: response.data.message,
            });
            setTimeout(() => {
              this.setState({ errMsg: "" });
            }, 6000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { isError } = this.state;
    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="/dashboard" />;
    }
    return (
      <>
        <section className="form__area d-flex pt-0 pb-0 min-vh-100">
          <div className="form__area__left">
            <div className="form__page__top d-flex align-items-center justify-content-between">
              <SideBanner />
              <p>
                Already a Member -
                <Link to="/" className="text-link">
                  Sign In
                </Link>
              </p>
            </div>
            <form>
              <h4> Request Password reset</h4>
              <Messages errMsg={this.state.errMsg} success={this.state.msg} />

              <div className="row pt-3">
                <div className="col-md-12">
                  <div className="single__input__item">
                    <label htmlFor=""> Your email address </label>
                    <input
                      type="email"
                      name="email"
                      className={
                        isError.email.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChangehandler}
                    />
                    {isError.email.length > 0 && (
                      <span className="invalid-feedback">{isError.email}</span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form__submit__btn pt-2">
                    <button
                      onClick={this.onResetHandler}
                      className="common__btn"
                    >
                      Request Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="form__area__right">
            <div className="form__area__content">
              <p>
                Connect Employers & <br /> Talent on One Platform
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
}
