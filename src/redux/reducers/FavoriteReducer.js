import actionTypes from '../actions/actionTypes';

const favoriteReducer = (initialFavData = [], action) => {
  let updatedFavData = [...initialFavData];
  const countryIncludedInFavorites = updatedFavData.find(
    (item) => item.includes(action.data)
  );
  switch (action.type) {
    case actionTypes.ADD_FAV:
      if (!countryIncludedInFavorites) { (updatedFavData = [...updatedFavData, action.data]); }
      break;
    case actionTypes.DELETE_FAV:
      updatedFavData = updatedFavData.filter((country) => country !== action.country);
      break;
    default:
      break;
  }
  return updatedFavData;
};

export default favoriteReducer;
