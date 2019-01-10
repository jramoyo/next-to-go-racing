import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import JurisdictionSelect from './components/JurisdictionSelect';
import RaceTypeSelect from './components/RaceTypeSelect';
import Cards from './components/Cards';

const API_PATH = '/v1/tab-info-service/racing/next-to-go/races';

class App extends Component {

  state = { races: [], jurisdiction: 'NSW',  raceType: 'R', error: false }

  componentDidMount = () => {
    this.getNSW()
      .then(res => {
        this.setState({ races: res.data.races })
      })
      .catch(this.onError);
  }

  getNSW = () => axios.get(API_PATH + '?jurisdiction=NSW')

  getVIC = () => axios.get(API_PATH + '?jurisdiction=VIC')

  onError = () => {
     this.setState({ error: true });
  }

  onJurisdictionChanged = (e) => {
    const jurisdiction = e.currentTarget.value
    const get = () => {
      switch (jurisdiction) {
        case 'NSW':
          return this.getNSW();
        case 'VIC':
        default:
          return this.getVIC();
      }
    }

    get()
      .then(res => {
        this.setState({
          jurisdiction: jurisdiction,
          races       : res.data.races
        });
      })
      .catch(this.onError);
  }

  onRaceTypeChanged = (e) => {
    this.setState({ raceType: e.currentTarget.value })
  }

  render() {

    let errorMessage;
    let body;
    if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger" role="alert">
          Unable to load data.
        </div>
      )
    } else {
      body = (
        <div>
          <div className="row">

            <div className="col-4">
              <JurisdictionSelect selected={this.state.jurisdiction} onJurisdictionChanged={this.onJurisdictionChanged} />
            </div>

            <div className="col-8">
              <RaceTypeSelect selected={this.state.raceType} onRaceTypeChanged={this.onRaceTypeChanged} />
            </div>

          </div>

          <div className="row">
            <Cards races={this.state.races} raceType={this.state.raceType}/>
          </div>
        </div>
      )
    }

    return (
      <div className="App container">
        <h1 className="display-4 text-primary">next-to-go</h1>

        { errorMessage }
        { body }

      </div>
    );
  }
}

export default App;
