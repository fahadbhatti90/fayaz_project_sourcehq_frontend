import React, { Component } from "react";
import axios from "../../Component/axios";
import { Link, Navigate } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import SideBanner from "../../Component/SideBanner";
import Messages from "../../Component/Messages";

export default class Confirmation extends Component {
  constructor(props) {
    super(props);
    const conf = localStorage.getItem("confirmation");

    this.state = {
      confirmation: "",
      id: conf,
      msg: "",
      redirect: false,
      success: "",
      errors: {},
      errMsg: "",
      token: "",
    };
  }

  onChangehandler = (e) => {
    // let data = {};
    // data[name] = value;
    this.setState({ confirmation: e });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.confirmation !== "" && this.state.confirmation.length > 3) {
      axios
        .post("/verifyConfirmationCode", {
          confirmation_code: this.state.confirmation,
          client_id: this.state.id,
        })
        .then((response) => {
          // this.setState({ isLoading: false });
          if (response.data.status === 200) {
            localStorage.clear();
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.data)
            );
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.setState({
              success: response.data.message,
              redirect: true,
            });
          }
          if (response.data.status === "validation_failed") {
            let isMsg = { ...response.data.validation_error };
            this.setState({ errors: isMsg });
            setTimeout(() => {
              this.setState({ errors: {} });
            }, 6000);
          } else if (response.data.status === "failed") {
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

  onReSendHandler = (e) => {
    e.preventDefault();

    axios
      .post("/resendConfirmationCode", {
        client_id: this.state.id,
      })
      .then((response) => {
        // this.setState({ isLoading: false });
        if (response.data.status === 200) {
          this.setState({
            success: response.data.message,
          });
        }
        if (response.data.status === "failed") {
          this.setState({
            errMsg: response.data.message,
          });
          setTimeout(() => {
            this.setState({ errMsg: "", confirmation: "" });
          }, 6000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/start-up" />;
    }

    if (!this.state.id) {
      return <Navigate to="/" />;
    }

    const login = localStorage.getItem("isLoggedIn");
    if (login) {
      return <Navigate to="/dashboard" />;
    }
    // const isLoading = this.state.isLoading;
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
              <Messages
                success={this.state.success}
                errMsg={this.state.errMsg}
                validation={this.state.errors}
              />
              <h4 className="mb-1"> Congratulation</h4>
              <p className="font-500 text-dark">
                One Step away to setup your account.
              </p>
              <div className="row pt-3">
                <div className="col-md-12">
                  <div className="email__validation__wrapper">
                    <p>
                      We just send you a temporary code to validate your email
                      address, check your inbox
                    </p>
                    <ReactInputVerificationCode
                      length={5}
                      onChange={this.onChangehandler}
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form__page__top d-flex align-items-center justify-content-between">
                    <button
                      className="common__btn"
                      type="submit"
                      onClick={this.onSubmitHandler}
                    >
                      Continue
                    </button>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={this.onReSendHandler}
                    >
                      Resend code
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
