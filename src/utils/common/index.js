/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
const getDataForTable = (dataCases, dataVaccines) => {
  const cleanObject = (object) => {
    for (const property in object) {
      if (object[property].country === null || object[property].country === undefined || object[property].country === '') {
        delete object[property];
      }
    }
    return object;
  };
  cleanObject(dataCases);
  const totalCountriesInfoForTable = Object.keys(dataCases).reduce((result, item) => {
    result[item] = { ...dataCases[item], ...dataVaccines[item] };
    return result;
  }, {});
  return Object.values(totalCountriesInfoForTable);
};

export default getDataForTable;
