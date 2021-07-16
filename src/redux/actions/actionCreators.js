import axios from 'axios';
import actionTypes from './actionTypes';

const URL = 'https://covid-api.mmediagroup.fr/v1/';
const casesUrl = 'cases';
const vaccinesUrl = 'vaccines';
const historyUrl = 'history';
const allContinents = ['Africa', 'Asia', 'Oceania', 'Europe', 'North America', 'South America'];

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

export const loadCountryData = (country) => async (dispatch) => {
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

export const loadVaccinesByContinent = () => async (dispatch) => {
  allContinents.forEach(async (element) => {
    const specificUrl = `${URL}${vaccinesUrl}/?continent=${element}`;
    const { data } = await axios.get(specificUrl);
    const totalPeopleVaccinated = Object.values(data).map(
      (country) => country.All.people_vaccinated
    ).reduce((a, b) => a + b, 0);
    const totalPeoplepartiallyVaccinated = Object.values(data).map(
      (country) => country.All.people_partially_vaccinated
    ).reduce((a, b) => a + b, 0);
    const updatedDate = Object.values(data)[0].All.updated;
    const continentData = [
      [element, totalPeopleVaccinated, totalPeoplepartiallyVaccinated, updatedDate]
    ];
    dispatch({
      type: actionTypes.LOAD_VACCINES_BY_CONTINENT,
      data: continentData
    });
  });
};

export const loadVaccinesDataToMap = () => async (dispatch) => {
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
    dispatch({
      type: actionTypes.LOAD_VACCINES_MAP,
      data: continentData
    });
  });
};

export const addCountryToFav = (country) => ({
  type: actionTypes.ADD_FAV,
  data: country
});

export const deleteCountryToFav = (country) => ({
  type: actionTypes.DELETE_FAV,
  country
});
