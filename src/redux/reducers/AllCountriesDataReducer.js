import actionTypes from '../actions/actionTypes';

const allCountriesDataReducer = (initialAllCountriesData = {}, action) => {
  let allCountriesData = { ...initialAllCountriesData };
  if (action.type === actionTypes.LOAD_ALL_COUNTRIES) {
    const everyCountryData = Object.entries(action.data).map(
      (element) => ({ ...element[1].All })
    );
    allCountriesData = { ...everyCountryData };
    return allCountriesData;
  }
  return initialAllCountriesData;
};

export default allCountriesDataReducer;
