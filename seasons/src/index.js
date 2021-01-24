import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   //This is the only time we do direct assignment to this.state
  //   this.state = { lat: null };
  // }
  state = { lat: null, errorMessage: "" };
  componentDidMount() {
    //As soon as our page is called we immediately try and get the user's location
    window.navigator.geolocation.getCurrentPosition(
      //Success callback
      //Get latitude out of our position object and update the latitude by calling setState; pass it an object containing the update I want to make to setState
      (position) =>
        this.setState({
          lat: position.coords.latitude,
        }),
      //Failure callback; re-render component and inform user of error
      (err) => {
        this.setState({
          errorMessage: err.message,
        });
      }
    );
  }

  //Conditional logic for rendering content
  renderContent() {
    if (
      this.state.errorMessage &&
      !this.state.lat
    ) {
      return (
        <div>
          Error: {this.state.errorMessage}
        </div>
      );
    }
    if (
      !this.state.errorMessage &&
      this.state.lat
    ) {
      return (
        <SeasonDisplay lat={this.state.lat} />
      );
    }
    return (
      <Spinner message="Please accept location request" />
    );
  }

  renderContentHack() {
    if (
      !this.state.errorMessage &&
      !this.state.lat
    ) {
      return (
        <Spinner message="Please accept location request" />
      );
    } else {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
          {/* Latitude: {this.state.lat} */}
          <br />
          {this.state.errorMessage}
        </div>
      );
    }
  }

  //Render content here
  render() {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    );
  }
}

Spinner.defaultProps = {
  message: "Loading...",
};

ReactDOM.render(
  <App />,
  document.querySelector("#root")
);
