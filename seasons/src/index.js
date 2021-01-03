import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    //This is the only time we do direct assignment to this.state
    this.state = { lat: null };

    //As soon as our page is called we immediately try and get the user's location
    window.navigator.geolocation.getCurrentPosition(
      //Success callback
      (position) => {
        //We called setState
        this.setState({
          lat: position.coords.latitude,
          errorMessage: "",
        });
      },

      //Failure callback; re-render component and inform user of error
      (err) => {
        this.setState({
          errorMessage: err.message,
        });
      }
    );
  }

  render() {
    return (
      <div>
        Latitude: {this.state.lat}
        <br />
        Error: {this.state.errorMessage}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
