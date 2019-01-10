import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import JurisdictionSelect from './components/JurisdictionSelect';
import RaceTypeSelect from './components/RaceTypeSelect';
import Cards from './components/Cards';

const API_PATH = '/v1/tab-info-service/racing/next-to-go/races';

class App extends Component {

  state = {
    races        : [],
    jurisdiction : 'NSW',
    raceType     : 'R',
    error        : false,
    loading      : false
  }

  componentDidMount = () => {
    this.getRaces(this.state.jurisdiction)
      .then(res => {
        this.setState({ races: res.data.races })
      });
  }

  getRaces = (jurisdiction) => {
    this.setState({ loading: true })
    return axios.get(API_PATH + '?jurisdiction=' + jurisdiction)
      .then(res => {
        this.setState({ loading: false })
        return res;
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  onJurisdictionChanged = (e) => {
    const jurisdiction = e.currentTarget.value;
    this.getRaces(jurisdiction)
      .then(res => {
        this.setState({
          jurisdiction : jurisdiction,
          races        : res.data.races
        });
      });
  }

  onRaceTypeChanged = (e) => {
    this.setState({ raceType: e.currentTarget.value });
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

          <div className="row cards">
            <Cards races={this.state.races} raceType={this.state.raceType}/>
          </div>
        </div>
      )
    }

    return (
      <div className="App container">
        <div className="row">
          <div className="col-9">
            <h1 className="display-4 text-primary">next-to-go</h1>
          </div>
          <div className="col-3">
            { this.state.loading ? <span className="text-muted text-right">loading...</span> : null }
          </div>
        </div>

        { errorMessage }
        { body }

      </div>
    );
  }
}

export default App;
