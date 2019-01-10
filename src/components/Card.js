import React from 'react';

const card = (props) => {
  const race = props.race;
  return (
    <div className="col-sm-6">
      <div className="card w-100 shadow p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h5 className="card-title">{race.raceName}</h5>
          <h6 className="card-subtitle mb-3 text-muted">{new Date(race.raceStartTime).toLocaleString('en-au')}</h6>
          <p className="card-text text-info font-weight-bold">Race Number: {race.raceNumber}</p>
          <p className="card-text">Meeting Name: {race.meeting.meetingName}</p>
          <p className="card-text">Meeting Location: {race.meeting.location}</p>
          <p className="card-text">Meeting Date: {race.meeting.meetingDate}</p>
        </div>
      </div>
    </div>
  );
}

export default card;
