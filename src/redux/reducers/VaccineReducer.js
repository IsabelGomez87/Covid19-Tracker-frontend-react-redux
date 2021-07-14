/* eslint-disable no-console */
import actionTypes from '../actions/actionTypes';

const vaccineReducer = (initialVaccinesContinentData = [['Region Code', 'Continent', 'People vaccinated', 'People partially vaccinated']], action) => {
  if (action.type === actionTypes.LOAD_VACCINES_MAP) {
    console.log('action.data', action.data);
    const updatedVaccinesContinent = [
      ...initialVaccinesContinentData, ...action.data];
    console.log('updatedVaccinesContinent', updatedVaccinesContinent);
    return updatedVaccinesContinent;
  }
  return initialVaccinesContinentData;
};

export default vaccineReducer;
