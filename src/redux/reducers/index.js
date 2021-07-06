import { combineReducers } from 'redux';
import countryReducer from './CountryReducer';
import favoriteReducer from './FavoriteReducer';
import globalDataReducer from './GlobalDataReducer';
import vaccineByCountryReducer from './VaccineByCountryReducer';
import vaccinesByContinentReducer from './VaccinesByContinentReducer';
import CountryHistoryReducer from './CountryHistoryReducer';
import vaccineReducer from './VaccineReducer';

const rootReducers = combineReducers({
  globalData: globalDataReducer,
  vaccinesContinentData: vaccineReducer,
  countryData: countryReducer,
  countryHistoryData: CountryHistoryReducer,
  vaccineByCountryData: vaccineByCountryReducer,
  vaccinesByContinent: vaccinesByContinentReducer,
  favoriteCountry: favoriteReducer
});

export default rootReducers;
