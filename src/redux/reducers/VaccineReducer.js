import actionTypes from '../actions/actionTypes';

const vaccineReducer = (initialVaccinesContinentData = [['Region Code', 'Continent', 'People vaccinated', 'People partially vaccinated']], action) => {
  if (action.type === actionTypes.LOAD_VACCINES_MAP) {
    const vaccinesContinent = [
      ...initialVaccinesContinentData, ...action.data];
    if (vaccinesContinent.length === 7) {
      const indexNorthAmerica = vaccinesContinent.findIndex((element) => element[1] === 'North America');
      const indexSouthAmerica = vaccinesContinent.findIndex((element) => element[1] === 'South America');
      const updatedVaccinesContinent = [
        ...vaccinesContinent,
        ['019', 'Americas', vaccinesContinent[indexNorthAmerica][2] + vaccinesContinent[indexSouthAmerica][2], vaccinesContinent[indexNorthAmerica][3] + vaccinesContinent[indexSouthAmerica][3]]
      ];
      updatedVaccinesContinent.splice(indexNorthAmerica, 1);
      updatedVaccinesContinent.splice(indexSouthAmerica, 1);
      return updatedVaccinesContinent;
    }
    return vaccinesContinent;
  }
  return initialVaccinesContinentData;
};

export default vaccineReducer;
