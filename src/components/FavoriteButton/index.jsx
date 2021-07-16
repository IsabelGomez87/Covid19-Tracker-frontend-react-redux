/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { addCountryToFav, deleteCountryToFav } from '../../redux/actions/actionCreators';
import './style.scss';

const FavoriteButton = ({ favoriteCountry, dispatch }) => {
  const { country } = useParams();
  const [toFavorite, setToFavorite] = useState(false);

  const checkInFavorite = () => {
    const countryIncludedInFavorites = favoriteCountry.find(
      (item) => item.includes(country)
    );
    if (countryIncludedInFavorites) setToFavorite(true);
  };

  useEffect(() => {
    checkInFavorite();
  }, []);

  const saveInFavorite = () => {
    dispatch(addCountryToFav(country));
    setToFavorite(true);
  };

  const deleteToFavorite = () => {
    dispatch(deleteCountryToFav(country));
    setToFavorite(false);
  };

  return (
    <>
      <button
        className="favButton"
        type="button"
        onClick={toFavorite ? deleteToFavorite : saveInFavorite}
      >
        {toFavorite ? (
          <img
            className="heart--included"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAFOklEQVRoge1aXWwUVRT+zt1phZadGVaElGyNRiMm/iQqRmRnW02qCaThAWMTYnjQB+pPCCHEYGKiCW+YmPDQFypqgm/yosGfGhY3lLYUAzFGMWkMGAQE1O3uzAItdOYeHwqkbNvdmbsz02j2e5w5P98359577twZoIEG/leguBM6R5MPMYldYDAkv2d0Or/FmT9WweMnlhrahPyFCWkAIMZ5d7F4NLW6aMfFQcSVCAC06/KDW2IBgAlpbVLujpNDbBUuD5qdUnB+jpzMjBfNrJ2Lg0csFeaR9GIpeB/mfsBEhP5L361ojYNLLIJtWd4F4MEqJvcvap18Pw4ukQ9pe1h/GkzHACRqmEoiaemZ8rEo+URaYc5DA9Ne1BYLAEKy2Mun0Bwlp0gFO836uwCe8GtPwGNOUX8nQkrRDWlnJPkwS/EjgEUBXW8IJJ5MWuOnouAVSYWZIVgm9iG4WABolvA+5s99TYPAiESwM2xuAzhTR4hnnJXm1tAIzUDoQ7p4zLxPePwzgCV1hrrGhMfNjH06DF63EGqFnXxymXB5H+oXCwAtJLHXySeXhRDrNuqqMI+kF9teOSMEupjRhekVOYppcoYIOSmRm6KmgXusf8qqgQILLg+lHvHY6yZCFwALagtTPXAB/ESEHFh8lcwUR4gg/TrXFHx1sKVtipqs6SpyN0Ar66IbPgpE+F5K5CBxyOy0f69mPEswM8gZ0deDqRvACwAeCJcffd0kEr0TgklzvX4A68KNj9MADgF8UM843xKB78heaW0PmX0AvxUyidtwtUT73WvGzwNA4UiqXUt4f0SVC6A+wyrd0d7mEGyUABhRUTAs+46c9pDB89mGgKJh2amZF2avqIzRCAnEC8YPlZdmCZaCegH8HQuhaFFg4M3Ki7MEL82UzhLERgA3YqEVDVwJetnM2mcqb8y5SdCt4hDAO6LnFRV4+1KrlJ/rzry7IsNy+ojxUXSkogLvNyynb767VTce/A3ucnQjD+BZ/wmn+2zL2sIF/z6zURhNpRX69Kju2M/Relyfl12tCFcHW9pcoZ3wu8Oa2WfrRbA+zX9q0l3d2nHtYjWrmhv91o5rF8HYCGDSX+IFwSQYG2uJBXy+2RhZ5ziBXvdjq7lef2E0la5tWR03q9vvx5aI3jCyznFftkFI2MP6HjBtC+JTifB3WrzHsJztfq0DvbvqF5wdAAYCc4oKjMP6lPN2EJdAgqkHHgS/guk3koXGWcHeJnoebhCnwKcTxlpnnCV6gvqFDWa8lOy4EngLrHQck4B3TsUvTCRY7bVSSbBHiaSKX5hQ5aAkmEHKgme2rMKRVLtqHBakq/hpKk4JIp2h1k1u9uktuA7y22fnjAPEJ5jJ08HKJ7zrNNc7V++HFMlS6exb9Qx5wecwSK3CanNYqs2fMKG6jigJFnUsWmFBKD50xVV64Ye0Kge1OUxywYc0IP8bfTgskCIHpbZE9Q3pMWZ8CgBEeBXAKpUgrLhKKwlG8KY/SYSDUqLfsOzDM7737C4dNZ4SAluYsQnBHmSMcxjsN9lJZvTeQNNyPWP3mFk7V/lxy8zaJ/WM3auL5Apm9ADIAX62cRxnhanab4KXmLFfkPxEt8pjviOuPT8B4ACAA85QcpVk8RoRbQa4TYHDvFCsMP1acWEK4C+JxQZ9ym43s/bOIGIroVvlMTNr79SnSvcSiw1M+GI6R1UOvqC0IS4PL1kuWfsQzG1EGBCa+9mSNVcvq8TyiyujrSukq22WhG5iXBbkbU1mrvwVZc4GGmiggQYaiBj/As7Dw0AMEJecAAAAAElFTkSuQmCC"
            alt="heart--included"
          />
        ) : (
          <img
            className="heart"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAAFGElEQVRoge2aXWgcVRiG3++kbhJ/agIF2SUBRbGCVag/iLTghVGI5iqyQqm5sOyeTVZK3RZRKOjQu3qTXoQke3Y2gXrhRS5jbaCpvRFbxSKiFYq0Uls3FmlAbGLSnZnPC7dp3OzfnJ0zUdnnapk55zvve74zc35mgRYt/ldQ2A0mk8lHiegIACai97PZ7I9hth+qYSnl/QC+B9BTunQNwA6l1O9haRBhNVTiQ9wxi9Lvo2EKCC3DyWTyBSI6U6FNZuaXc7ncfBg6QslwJpPpJCIblTuYiEgNDQ3dE4aWUAwvLy8fAfBIjSIPdXZ2fhCGFuNDOplMPktEZwG01SnqEdHubDZ71qQeoxm2LGsLEWVR3ywACGbOxuPxiElNRg0XCoXDAHb6qPJEV1fXe6b0AAaHtJTyMQDfAOjwWfUWMz+Vy+UuGJBlJsOWZQlmtuHfLABEiCgfj8cbeQx8Y8RwoVA4QES7mgjxXHd39/7ABK0j8CE9PDz8oOd53wG4t8lQywCeVEpdCkDWGoFmWEq5zfM8G82bBYC7AWSllNsCiLVGUxnOZDKdN2/e3AWgTwjRx8w7YeYxuQxgHsC84zhzU1NTf+gG8m04mUw+LoQYYOY+ALuh92JqBoeIvvU8b56IPonFYl9YluU1WrmuYSllFH8b6wMwACCmr9UINwB8RkTzruuesm37p1qFKy7mpZSvMPMAEb0E4OGABZ4QQqQcxyEhhALQH3D8S8x8Sggxm81mTwLg9Tc3GJZSjgF4K2ARa3ie12vb9jUASKfTvY7j/GyqLQBjSql/TG+VXjBvGBSA22YBYHx8/KrJtgDsLb+wwTARnTMsIjSI6KvyaxsMO46TAvBbKIrMckMIkS6/uMFwPp+/AmAQwK0wVBnCARCfmJi4XH6j4iJBKfU5gEOmVRkko5Q6U+lG1VWRUmqMiHLmNJmBmY8rpcaq3d9Sq3IkEtm/urq6A8DzPto8IYRITU5O/tJIYaVUxcVPIpHo8TtPE9G59vZ2WbNMvSClldbXaHCFtX6ebRaf83QBwDNKqYVaheou9EsBBgGsNNjwZrACYLCeWaDBnY1S6ksAw42UFUKoRCLRU79kbUrZVY2UZeaRksa6+NotpVKpY8x8wE+dcsqfWSklVyvbIMeUUplGC/vauy4uLh4CMOdbkjlOx2Kxd/xU8GV4ZmbGdV13L4BAj100uVIsFvdYluX4qeT7dCKfzy8CeN1vvaDxPO+16elp30tgreOYYrFoepdTF9d1tbaVWoY7Ojru06kXJLoatAx7nqdteP2UlU6ne3XjOI6zVadezaVlNVzX3SqE3uFkaZ6WkUiEGp1nq8QJz7BuYyX6hRBXHcfXy7USWmffWmli5k1/hj3P0+p0LcNNZjgowntp/RsyTEThZRiavRsw4WUYwKYPad1R9p/NsBBCS4PWtITmDF8komkAYOY3AWzXCcLM4c3D8D+kVwDMMrPK5XKnced7z9FEIvG0EEIC2AMfHak7pI1mmIjOA1DFYvHjat90bds+DyCVyWTeXlpaGgAgAbyIOocTum9pXcO1/ib4K4DjbW1tUxMTExcbDTg6OvongBkAMyMjI9td190HYAhAVENDVbQME9EPpa/9tyky86dCiHw0Gj3pd1NeTqmj3rUs6/DCwkI/M+8D8CqAu9Zr0Imta/ggMzOAKDPPMfNHtm1f14lVi1LHzQKYTSQSDxDREBENENF1IjoYdHstWrRo0aJFyPwFGpqzCd9c3XcAAAAASUVORK5CYII="
            alt="heart"
          />
        )}

      </button>
    </>
  );
};

FavoriteButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favoriteCountry: PropTypes.shape([]).isRequired
};

const mapStateToProps = ({ favoriteCountry }) => ({
  favoriteCountry
});

export default connect(mapStateToProps)(FavoriteButton);
