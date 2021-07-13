/* eslint-disable no-console */
import axios from 'axios';
import actionTypes from './actionTypes';

const URL = 'https://covid-api.mmediagroup.fr/v1/';
const casesUrl = 'cases';
const vaccinesUrl = 'vaccines';
const historyUrl = 'history';
const allContinents = ['Africa', 'Asia', 'Oceania', 'Europe', 'North America'];

export const loadGlobalData = (url = `${URL}${casesUrl}`) => async (dispatch) => {
  try {
    const { data } = await axios.get(url);
    dispatch({
      type: actionTypes.LOAD_GLOBAL,
      data: data.Global.All
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_GLOBAL_ERROR
    });
  }
};

export const loadCountry = (country) => async (dispatch) => {
  const url = `${URL}${casesUrl}?country=${country}`;
  const { data } = await axios.get(url);

  dispatch({
    type: actionTypes.LOAD_COUNTRY,
    data: data.All
  });
};
export const loadCountryHistory = (country) => async (dispatch) => {
  const url = `${URL}${historyUrl}?country=${country}&status=confirmed`;
  const { data } = await axios.get(url);
  dispatch({
    type: actionTypes.LOAD_COUNTRY_HISTORY,
    data: data.All.dates
  });
};

export const loadVaccinesByCountry = (country) => async (dispatch) => {
  const url = `${URL}${vaccinesUrl}?country=${country}`;
  const { data } = await axios.get(url);
  dispatch({
    type: actionTypes.LOAD_VACCINES_BY_COUNTRY,
    data: data.All
  });
};

const getAmericaData = (array) => {
  console.log('array en getAmericaData', array);
  const peopleVaccinatedAmericas = array[1][1] + array[5][1];
  const peoplePartiallyVaccinatedAmericas = array[1][2] + array[5][2];
  const americasData = ['Americas', peopleVaccinatedAmericas, peoplePartiallyVaccinatedAmericas];
  const segmentArray = array.splice(0, 4);
  const transformedData = [...segmentArray, americasData];
  console.log('array al final de getAmericaData', transformedData);
  return transformedData;
};

const getContinentData = (continents, data) => continents.map((continent) => ([
  continent,
  data[continent].All.people_vaccinated,
  data[continent].All.people_partially_vaccinated,
  data[continent].All.updated
]));

export const loadVaccinesByContinent = (url = `${URL}${vaccinesUrl}`) => async (dispatch) => {
  const { data } = await axios.get(url);
  let continents = getContinentData(allContinents, data);
  continents = getAmericaData(continents);
  dispatch({
    type: actionTypes.LOAD_VACCINES_BY_CONTINENT,
    data: continents
  });
};

export const loadVaccinesContinentData = () => async (dispatch) => {
  // const newData = [];
  allContinents.forEach(async (element) => {
    const specificUrl = `${URL}${vaccinesUrl}/?continent=${element}`;
    const { data } = await axios.get(specificUrl);
    const totalPeopleVaccinated = Object.values(data).map(
      (country) => country.All.people_vaccinated
    ).reduce((a, b) => a + b, 0);
    const totalPeoplepartiallyVaccinated = Object.values(data).map(
      (country) => country.All.people_partially_vaccinated
    ).reduce((a, b) => a + b, 0);
    const continentData = [[element, totalPeopleVaccinated, totalPeoplepartiallyVaccinated]];
    // newData.push(continentData);

    console.log('switch', continentData[0][0]);
    switch (continentData[0][0]) {
      case 'Africa':
        continentData[0].unshift('002');
        break;
      case 'Asia':
        continentData[0].unshift('142');
        break;
      case 'Oceania':
        continentData[0].unshift('009');
        break;
      case 'Europe':
        continentData[0].unshift('150');
        break;
      case 'North America':
        continentData[0].unshift('019');
        break;
      case 'South America':
        continentData[0].unshift('019');
        break;
      default:
        break;
    }

    console.log('newData antes de juntar Americas', continentData);
    // const peopleVaccinatedAmericas = newData[1][1] + newData[5][1];
    // const peoplePartiallyVaccinatedAmericas = newData[1][2] + newData[5][2];
    // const americasData = ['Americas', peopleVaccinatedAmericas,
    // peoplePartiallyVaccinatedAmericas];
    // const segmentArray = newData.splice(0, 4);
    // const transformedData = [...segmentArray, americasData];
    // console.log('array al final de getAmericaData', transformedData);
    dispatch({
      type: actionTypes.LOAD_VACCINES_MAP,
      data: continentData
    });
  });
};

export function addCountryToFav(country) {
  return {
    type: actionTypes.ADD_FAV,
    data: country
  };
}

export function deleteFavCountry(country) {
  return {
    type: actionTypes.DELETE_FAV,
    country
  };
}
