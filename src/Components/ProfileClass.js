import React from "react";
import UserContext from "../utils/userContext";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      count1: 0,
    };
    console.log("this will execute first");
  }

  componentDidMount() {
    console.log("this will execute after rendering");
  }
  render() {
    console.log("this will excecute second");
    const { count, count1 } = this.state;
    return (
      <div>
        <UserContext.Consumer>
          {({ user }) => (
            <h4 className="text-black font-bold p-2 m-3">Hello, {user.name}</h4>
          )}
        </UserContext.Consumer>
        <h2>This is a class based Component</h2>
        <h3>Name is :{this.props.name}</h3>
        <h3>{count}</h3>
        <h3>{count1}</h3>
        <button
          onClick={() => {
            this.setState({
              count: 1,
              count1: 2,
            });
          }}
        >
          setCount
        </button>
      </div>
    );
  }
}

export default Profile;
