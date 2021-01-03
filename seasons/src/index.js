import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  //Lifecycle methods
  componentDidMount() {
    //As soon as our page is called we immediately try and get the user's location
    window.navigator.geolocation.getCurrentPosition(
      //Success callback or error message
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() {
    console.log("My component just updated and re-rendered");
  }

  //Conditional rendering
  render() {
    //If we have error message but no latitude return error msg
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    //If I have latitude but no error message return latitude
    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>;
    }

    //If there is no lat and no error show loading
    return <div>Loading...</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
