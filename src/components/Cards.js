import React from 'react'
import Card from './Card'

const compareDate = (_a, _b) => {
  const a = new Date(_a);
  const b = new Date(_b);
  if (a < b) return -1
  if (a > b) return 1
  if (a === b) return 0
}

const cards = (props) => {
  return props.races
    .filter(race => race.meeting.raceType === props.raceType)
    .sort(compareDate)
    .map(race => <Card key={race.raceName + '_' + race.raceStartTime} race={race} />);
};

export default cards;
