import React, { Component } from "react";
const ApiContext = React.createContext();
const token = JSON.parse(localStorage.getItem("token"));
const user_data = JSON.parse(localStorage.getItem("userData"));

// console.log(user_data.id);
class ApiProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: [],
      permissions: [],
      headers: token,
      user_data,
      user_permission: [],
      user_role: "",
    };
  }

  // componentDidMount() {
  //   if (token) {
  //     // const withoutFirstAndLast = token.slice(1, -1);
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     this.setState({
  //       headers,
  //     });
  //     axios
  //       .get(`http://localhost:8000/api/roles`, {
  //         headers: headers,
  //       })
  //       .then(({ data }) => {
  //         const { roles, permission } = data;
  //         this.setState({
  //           role: roles,
  //           permissions: permission,
  //         });
  //       });

  //     axios
  //       .get(`http://localhost:8000/api/user-permissions/${user_data.id}`, {
  //         headers: headers,
  //       })
  //       .then(({ data }) => {
  //         const { user_role, user_permission } = data;
  //         this.setState({
  //           user_role,
  //           user_permission,
  //         });
  //       });
  //   }
  // }

  render() {
    return (
      <ApiContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}

const ApiConsumer = ApiContext.Consumer;
export { ApiConsumer, ApiProvider, ApiContext };
