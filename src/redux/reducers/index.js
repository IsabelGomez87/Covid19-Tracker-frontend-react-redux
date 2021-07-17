import { combineReducers } from 'redux';
import countryReducer from './CountryReducer';
import favoriteReducer from './FavoriteReducer';
import globalDataReducer from './GlobalDataReducer';
import allCountriesDataReducer from './AllCountriesDataReducer';
import vaccineByCountryReducer from './VaccineByCountryReducer';
import vaccinesByContinentReducer from './VaccinesByContinentReducer';
import countryHistoryReducer from './CountryHistoryReducer';
import VaccinesByContinentToMapReducer from './VaccinesByContinentToMapReducer';

const rootReducers = combineReducers({
  globalData: globalDataReducer,
  vaccinesContinentToMap: VaccinesByContinentToMapReducer,
  countryData: countryReducer,
  countryHistoryData: countryHistoryReducer,
  allCountriesData: allCountriesDataReducer,
  vaccineByCountryData: vaccineByCountryReducer,
  vaccinesByContinent: vaccinesByContinentReducer,
  favoriteCountry: favoriteReducer
});

export default rootReducers;
