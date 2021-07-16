import actionTypes from '../actions/actionTypes';

const VaccinesByContinentToMapReducer = (initialVaccinesContinentToMap = [['Region Code', 'Continent', 'People vaccinated', 'People partially vaccinated']], action) => {
  if (action.type === actionTypes.LOAD_VACCINES_MAP) {
    let vaccinesContinent = [
      ...initialVaccinesContinentToMap, ...action.data];
    if (vaccinesContinent.length === 7) {
      const indexNorthAmerica = vaccinesContinent.findIndex((element) => element[1] === 'North America');
      const indexSouthAmerica = vaccinesContinent.findIndex((element) => element[1] === 'South America');
      vaccinesContinent = [
        ...vaccinesContinent,
        ['019', 'Americas', vaccinesContinent[indexNorthAmerica][2] + vaccinesContinent[indexSouthAmerica][2], vaccinesContinent[indexNorthAmerica][3] + vaccinesContinent[indexSouthAmerica][3]]
      ];
      const continentsToDelete = ['North America', 'South America'];
      const updatedVaccinesContinent = vaccinesContinent.filter(
        (item) => (!item.includes(continentsToDelete[0]) && !item.includes(continentsToDelete[1]))
      );
      return updatedVaccinesContinent;
    }
    return vaccinesContinent;
  }
  return initialVaccinesContinentToMap;
};

export default VaccinesByContinentToMapReducer;
