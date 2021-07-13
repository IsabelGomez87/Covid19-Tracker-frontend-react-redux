/* eslint-disable no-console */
import actionTypes from '../actions/actionTypes';

const vaccineReducer = (initialVaccinesContinentData = [], action) => {
  const chartHeader = ['Region Code', 'Continent', 'People vaccinated', 'People partially vaccinated'];
  let updatedVaccinesContinent = [...initialVaccinesContinentData];
  console.log('action', action);
  if (action.type === actionTypes.LOAD_VACCINES_MAP) {
    console.log('action.data', action.data);
    updatedVaccinesContinent = [chartHeader, ...action.data];
    console.log('updatedVaccinesContinent', updatedVaccinesContinent);
  }
  return updatedVaccinesContinent;
};

export default vaccineReducer;
