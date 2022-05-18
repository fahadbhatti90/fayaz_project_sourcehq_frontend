import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../Component/axios";
import Messages from "../../Component/Messages";
export default function MemberInvitation() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(null);
  const [templogo, setTempLogo] = useState(null);
  const [data, setData] = useState();
  const [validationError, setValidationError] = useState({});
  const [success, setSuccess] = useState("");
  const [errors, seterrors] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  let { token } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    await axios
      .post(`/showRegistrationForm`, {
        invitation_token: token,
      })
      .then(({ data }) => {
        if (data.status === 200) {
          setData(data.data);
          setEmail(data.data.email);
        } else if (data.status === "validation_failed") {
          setValidationError(data.errors);
          setTimeout(() => {
            setValidationError({});
            navigate("/");
          }, 3000);
        } else {
          seterrors(data.message);
          setTimeout(() => {
            seterrors("");
            navigate("/");
          }, 3000);
        }
      });
  };
  const onChangehandler = (e) => {
    setLogo(e.target.files[0]);
    setTempLogo(URL.createObjectURL(e.target.files[0]));
  };
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    if (logo !== null) {
      formData.append("profile_image", logo);
    }
    formData.append("email", email);
    formData.append("password", password);

    await axios.post(`/AddUsers`, formData).then(({ data }) => {
      if (data.status === 200) {
        setSuccess(data.message);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userData", JSON.stringify(data.data));
        localStorage.setItem("token", JSON.stringify(data.token));
        navigate("/dashboard");
      } else if (data.status === "validation_failed") {
        setValidationError(data.errors);
        setTimeout(() => {
          setValidationError({});
        }, 6000);
      } else {
        seterrors(data.message);
        setTimeout(() => {
          seterrors("");
        }, 6000);
      }
    });
  };
  return (
    <>
      <section className="form__area d-flex pt-0 pb-0 min-vh-100">
        <div className="form__area__left">
          <div className="form__page__top">
            <div className="form__page__logo">
              <Link to={""}>
                <img src="/assets/img/logo-main.svg" alt="" />
              </Link>
            </div>
          </div>
          <form onSubmit={submitForm}>
            <h4> Setup your account</h4>
            <p>
              Our Global Work Platform allows you to engage talent, streamline
              onboarding, pay your people, and ensure compliance—all with the
              click of a button.
            </p>
            <Messages
              errMsg={errors}
              success={success}
              validation={validationError}
            />
            <div className="row pt-3">
              <div className="col-md-6">
                <div className="single__input__item">
                  <label htmlFor="">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first Name"
                    name="first_name"
                    required
                    value={first_name == null ? "" : first_name}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="single__input__item">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="last_name"
                    required
                    value={last_name == null ? "" : last_name}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="single__input__item">
                  <label htmlFor=""> Your email address </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Name"
                    name="email"
                    readOnly
                    value={email == null ? "" : email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="single__input__item">
                  <label htmlFor="">Password </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password Name"
                    name="password"
                    pattern=".{6,}"
                    title="6 characters minimum"
                    required
                    value={password == null ? "" : password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="single__input__item pt-2">
                  <label htmlFor="">Upload profile </label>
                  <div className="upload__profile__wrapper pt-2 d-flex align-items-center">
                    <div className="upload__profile__thumb">
                      <img
                        src={`${
                          templogo
                            ? templogo
                            : "/assets/img/upload-profile-avatar.svg"
                        } `}
                        alt=""
                      />
                    </div>
                    <div className="upload__profile__btn">
                      <button className="common__btn btn-bordered upload-action position-relative">
                        <input
                          type="file"
                          name="logo"
                          onChange={onChangehandler}
                        />
                        Browser & Upload Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form__submit__btn pt-4">
                  <button className="common__btn" type="submit">
                    Continue your account
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
