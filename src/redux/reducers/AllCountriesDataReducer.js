import actionTypes from '../actions/actionTypes';

const allCountriesDataReducer = (initialAllCountriesData = {}, action) => {
  if (action.type === actionTypes.LOAD_ALL_COUNTRIES) {
    const allCountriesData = { ...initialAllCountriesData, ...action.data };
    return allCountriesData;
  }
  return initialAllCountriesData;
};

export default allCountriesDataReducer;
