import actionTypes from '../actions/actionTypes';

const allCountriesCasesReducer = (initialAllCountriesCases = {}, action) => {
  let allCountriesCases = { ...initialAllCountriesCases };
  if (action.type === actionTypes.LOAD_CASES_ALL_COUNTRIES) {
    const everyCountryCasesData = Object.entries(action.data).map(
      (element) => ({ ...element[1].All })
    );
    allCountriesCases = { ...everyCountryCasesData };
    return allCountriesCases;
  }
  return allCountriesCases;
};

export default allCountriesCasesReducer;
