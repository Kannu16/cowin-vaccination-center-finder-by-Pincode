import React, { Component } from "react";

let pinCode = '788710';

let date = "29-06-2021";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
 componentDidMount() {
  fetch(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${date}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading....👀👀👀👀👀</div>;
    } else {
      return (
        <div className="hero-container">
          <h1>Search Your Vaccination Center Here</h1>
          <div className="content">
            <input
              type="number"
              name=""
              id="pin"
              placeholder="Enter Your Pincode"
            />
            <input type="date" name="" id="" placeholder="dd-mm-yyyy" />
            <button>Check</button>
          </div>
          <table className="GeneratedTable">
            <thead>
              <tr>
                <th>Center Name</th>
                <th>Vaccination District</th>
                <th>Vaccination Address</th>
                <th>Vaccine Avaiable</th>
              </tr>
            </thead>
            <tbody>
              {items.sessions.map((item) => (
                <tr>
                  <td key={item.session_id}>{item.name}</td>
                  <td key={item.session_id}>{item.district_name}</td>
                  <td key={item.session_id}>{item.address}</td>
                  <td key={item.session_id}>{item.available_capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
export default App;
