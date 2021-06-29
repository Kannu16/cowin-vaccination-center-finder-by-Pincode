import React, { Component } from "react";
let pinCode = prompt("Enter your pincode to know your today's vaccination centre");
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
var currDay = dd + "-" + mm + "-" + yyyy;
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
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${currDay}`
    )
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
      return <div className="loading">Loading.....👀👀👀</div>;
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
                <th>Vaccine Available</th>
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
