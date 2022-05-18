import React from "react";
const Messages = ({ errMsg, success, validation }) => {
  //   console.log(validation);
  return (
    <>
      {validation !== undefined &&
        Object.keys(validation).length !== 0 &&
        Object.entries(validation).map(([key, value]) => (
          <div className="alert alert-danger" key={key}>
            <span>
              <img src="assets/img/error-icon.svg" alt="" />
            </span>
            {value}
          </div>
        ))}
      {errMsg !== "" && (
        <div className="alert alert-danger">
          <span>
            <img src="assets/img/error-icon.svg" alt="" />
          </span>
          {errMsg}
        </div>
      )}
      {success !== "" && (
        <div className="alert alert-success">
          <span>
            <img src="assets/img/check-circle.svg" alt="" />
          </span>
          {success}
        </div>
      )}
    </>
  );
};
export default Messages;
