/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
import actionTypes from '../actions/actionTypes';

const allCountriesDataReducer = (initialAllCountriesData = {}, action) => {
  let allCountriesData = { ...initialAllCountriesData };
  if (action.type === actionTypes.LOAD_ALL_COUNTRIES) {
    const everyCountryData = Object.entries(action.data).map(
      (element) => ({ ...element[1].All })
    );
    allCountriesData = { ...everyCountryData };
    const cleanObject = (object) => {
      for (const property in object) {
        if (object[property].country === null || object[property].country === undefined || object[property].country === '') {
          delete object[property];
        }
      }
      return object;
    };
    cleanObject(allCountriesData);
    return allCountriesData;
  }
  return initialAllCountriesData;
};

export default allCountriesDataReducer;
