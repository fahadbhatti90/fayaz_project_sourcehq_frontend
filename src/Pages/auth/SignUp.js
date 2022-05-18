import React, { Component } from "react";
import axios from "../../Component/axios";
import { Link,Navigate  } from "react-router-dom";
import Messages from "../../Component/Messages";
import SideBanner from "../../Component/SideBanner";

export default class Signup extends Component {
  userData;
  constructor(props) {
    
    super(props);
    this.state = {
      signupData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
       redirect: false,
      success: "",
      errMsg: "",
      msg: {},
      isError: {
        email: "",
        password: "",
      },
    };
  }

  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
    let isError = { ...this.state.isError };
    switch (e.target.name) {
      case "email":
        isError.email = e.target.value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        )
          ? ""
          : "Email address is invalid";
        break;
      case "password":
        isError.password =
          e.target.value.length < 6 ? "Atleast 6 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ isError });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.isError.email === "" && this.state.isError.password === "") {
      axios
        .post("/client-signup", this.state.signupData)
        .then((response) => {
          if (response.data.status === 200) {
            localStorage.setItem("confirmation", JSON.stringify(response.data.data.id));
             this.setState({
            redirect: true,
          });  
          
          }

          if (response.data.status === "validation_failed") {
            let isMsg = { ...response.data.errors };
            this.setState({ msg: isMsg });
            setTimeout(() => {
              this.setState({ msg: {} });
            }, 6000);
          } else if (response.data.status === "failed") {
            this.setState({
              errMsg: response.data.message,
            });
            setTimeout(() => {
              this.setState({ errMsg: "" });
            }, 6000);
          }
        });
    } else {
      console.log("Form is invalid!");
    }
  };
  render() {
   
    if (this.state.redirect) {
      return <Navigate to="/confirmation" replace={true} />;
    }
   
    const { isError } = this.state;
    const { msg } = this.state;
    
    return (
      
      <>
        
        <section className="form__area d-flex pt-0 pb-0 min-vh-100">
          <div className="form__area__left">
            <div className="form__page__top">
              <div className="form__page__top d-flex align-items-center justify-content-between">
               <SideBanner />
                <p>
                  Already a Member -
                  <Link to="/" className="text-link">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
            <form>
              <h4>Sign Up</h4>
              <p>
                Our Global Work Platform allows you to engage talent, streamline
                onboarding, pay your people, and ensure compliance—all with the
                click of a button.
              </p>

              <Messages
                errMsg={this.state.errMsg}
                success={this.state.success}
                validation={msg}
              />

              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="single__input__item">
                    <label htmlFor="">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="first_name"
                      placeholder="Enter First name"
                      value={this.state.signupData.first_name}
                      onChange={this.onChangehandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single__input__item">
                    <label htmlFor="">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="last_name"
                      placeholder="Enter Last name"
                      value={this.state.signupData.last_name}
                      onChange={this.onChangehandler}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single__input__item">
                    <label htmlFor=""> Your email address </label>
                    <input
                      type="email"
                      className={
                        isError.email.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      name="email"
                      placeholder="Enter email"
                      value={this.state.signupData.email}
                      onChange={this.onChangehandler}
                    />
                    {isError.email.length > 0 && (
                      <span className="invalid-feedback">{isError.email}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single__input__item">
                    <label htmlFor="">Password </label>
                    <input
                      type="password"
                      className={
                        isError.password.length > 0
                          ? "is-invalid form-control"
                          : "form-control"
                      }
                      name="password"
                      placeholder="Enter password"
                      value={this.state.signupData.password}
                      onChange={this.onChangehandler}
                    />
                    {isError.password.length > 0 && (
                      <span className="invalid-feedback">
                        {isError.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form__submit__btn pt-2">
                    <button
                      onClick={this.onSubmitHandler}
                      className="common__btn"
                    >
                      Sign up New Account
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
