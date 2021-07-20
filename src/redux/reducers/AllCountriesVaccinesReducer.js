import actionTypes from '../actions/actionTypes';

const allCountriesVaccinesReducer = (initialAllCountriesVaccines = {}, action) => {
  let allCountriesVaccines = { ...initialAllCountriesVaccines };
  if (action.type === actionTypes.LOAD_VACCINES_ALL_COUNTRIES) {
    const everyCountryVaccinesData = Object.entries(action.data).map(
      (element) => ({ ...element[1].All })
    );
    allCountriesVaccines = { ...everyCountryVaccinesData };
    return allCountriesVaccines;
  }
  return allCountriesVaccines;
};

export default allCountriesVaccinesReducer;
