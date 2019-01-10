import React from 'react';

const jurisdictionSelect = (props) => {
  return (
    <div>
      <div className="form-check form-check-inline">
        <input id="jurisdiction-nsw"
               className="form-check-input"
               type="radio" name="jurisdiction"
               value='NSW'
               checked={props.selected === 'NSW'}
               onChange={props.onJurisdictionChanged} />
        <label className="form-check-label" htmlFor="jurisdiction-nsw">NSW</label>
      </div>
      <div className="form-check form-check-inline">
        <input id="jurisdiction-vic"
               className="form-check-input"
               type="radio" name="jurisdiction"
               value='VIC'
               checked={props.selected === 'VIC'}
               onChange={props.onJurisdictionChanged} />
        <label className="form-check-label" htmlFor="jurisdiction-vic">VIC</label>
      </div>
    </div>
  );
};

export default jurisdictionSelect;
