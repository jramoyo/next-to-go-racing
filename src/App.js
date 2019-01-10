import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

class App extends Component {

  state = { races: [] }

  componentDidMount = () => {
    axios.get('/v1/tab-info-service/racing/next-to-go/races?jurisdiction=NSW&raceType=H')
      .then((res) => {
        console.log(res.data.races);
        this.setState({races: res.data.races})
      });
  }

  render() {
    const rows = this.state.races.map(race => {
        return (
          <tr key={race.raceName + '_' + race.raceStartTime}>
            <td>name</td>
            <td>{race.raceName}</td>
          </tr>
        )
    });

    return (
      <div className="App">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
