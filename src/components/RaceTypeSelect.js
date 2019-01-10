import React from 'react';

const raceTypeSelect = (props) => {
  return (
    <div>
      <div className="form-check form-check-inline">
        <input id="race-type-r"
               className="form-check-input"
               type="radio" name="race-type"
               value='R'
               checked={props.selected === 'R'}
               onChange={props.onRaceTypeChanged} />
        <label className="form-check-label" htmlFor="race-type-r">Thoroughbred</label>
      </div>
      <div className="form-check form-check-inline">
        <input id="race-type-g"
               className="form-check-input"
               type="radio" name="race-type"
               value='G'
               checked={props.selected === 'G'}
               onChange={props.onRaceTypeChanged} />
        <label className="form-check-label" htmlFor="race-type-g">Greyhounds</label>
      </div>
      <div className="form-check form-check-inline">
        <input id="race-type-h"
               className="form-check-input"
               type="radio" name="race-type"
               value='H'
               checked={props.selected === 'H'}
               onChange={props.onRaceTypeChanged} />
        <label className="form-check-label" htmlFor="race-type-h">Harness</label>
      </div>
    </div>
  );
};

export default raceTypeSelect;
