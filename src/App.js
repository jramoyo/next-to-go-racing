import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = { races: [], filter: 'R', jurisdiction: 'NSW' }

  componentDidMount = () => {
    this.nsw()
      .then(res => {
        this.setState({ races: res.data.races })
      });
  }

  nsw = () => axios.get('/v1/tab-info-service/racing/next-to-go/races?jurisdiction=NSW');

  vic = () => axios.get('/v1/tab-info-service/racing/next-to-go/races?jurisdiction=VIC');

  compareDate = (_a, _b) => {
    const a = new Date(_a);
    const b = new Date(_b);
    if (a < b) return -1
    if (a > b) return 1
    if (a === b) return 0
  }

  onJurisdictionChanged = (e) => {
    const jurisdiction = e.currentTarget.value
    const get = () => {
      switch (jurisdiction) {
        case 'NSW':
          return this.nsw();
        case 'VIC':
        default:
          return this.vic();
      }
    }

    get()
      .then(res => {
        this.setState({
          jurisdiction: jurisdiction,
          races       : res.data.races
        });
      });
  }

  onRaceTypeChanged = (e) => {
    this.setState({ filter: e.currentTarget.value })
  }

  render() {
    const cards = this.state.races.filter(race => race.meeting.raceType === this.state.filter).sort(this.compareDate).map(race => {
        return (
          <div key={race.raceName + '_' + race.raceStartTime} className="col-sm-6">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">{race.raceName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{new Date(race.raceStartTime).toDateString()}</h6>
                <p className="card-text">Race Number: {race.raceNumber}</p>
                <p className="card-text">Meeting Name: {race.meeting.meetingName}</p>
                <p className="card-text">Meeting Location: {race.meeting.location}</p>
                <p className="card-text">Meeting Date: {race.meeting.meetingDate}</p>
              </div>
            </div>
          </div>
        )
    });

    return (
      <div className="App container">

        <div className="row">

          <div className="col-4">
            <div className="form-check form-check-inline">
              <input id="jurisdiction-nsw"
                     className="form-check-input"
                     type="radio" name="jurisdiction"
                     value='NSW'
                     checked={this.state.jurisdiction === 'NSW'}
                     onChange={this.onJurisdictionChanged} />
              <label className="form-check-label" htmlFor="jurisdiction-nsw">NSW</label>
            </div>
            <div className="form-check form-check-inline">
              <input id="jurisdiction-vic"
                     className="form-check-input"
                     type="radio" name="jurisdiction"
                     value='VIC'
                     checked={this.state.jurisdiction === 'VIC'}
                     onChange={this.onJurisdictionChanged} />
              <label className="form-check-label" htmlFor="jurisdiction-vic">VIC</label>
            </div>
          </div>

          <div className="col-8">
            <div className="form-check form-check-inline">
              <input id="race-type-r"
                     className="form-check-input"
                     type="radio" name="filter"
                     value='R'
                     checked={this.state.filter === 'R'}
                     onChange={this.onRaceTypeChanged} />
              <label className="form-check-label" htmlFor="race-type-r">Thoroughbred</label>
            </div>
            <div className="form-check form-check-inline">
              <input id="race-type-g"
                     className="form-check-input"
                     type="radio" name="filter"
                     value='G'
                     checked={this.state.filter === 'G'}
                     onChange={this.onRaceTypeChanged} />
              <label className="form-check-label" htmlFor="race-type-g">Greyhounds</label>
            </div>
            <div className="form-check form-check-inline">
              <input id="race-type-h"
                     className="form-check-input"
                     type="radio" name="filter"
                     value='H'
                     checked={this.state.filter === 'H'}
                     onChange={this.onRaceTypeChanged} />
              <label className="form-check-label" htmlFor="race-type-h">Harness</label>
            </div>
          </div>

        </div>

        <div className="row">
          {cards}
        </div>

      </div>
    );
  }
}

export default App;
