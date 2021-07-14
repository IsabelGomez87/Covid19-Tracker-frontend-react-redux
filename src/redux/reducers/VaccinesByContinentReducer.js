import actionTypes from '../actions/actionTypes';

const vaccinesByContinentReducer = (initialVaccineByContinentData = [], action) => {
  if (action.type === actionTypes.LOAD_VACCINES_BY_CONTINENT) {
    const updatedVaccineByContinentData = [...initialVaccineByContinentData, ...action.data];
    return updatedVaccineByContinentData;
  }
  return initialVaccineByContinentData;
};

export default vaccinesByContinentReducer;
