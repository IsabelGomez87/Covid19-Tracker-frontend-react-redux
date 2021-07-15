import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { addCountryToFav } from '../../redux/actions/actionCreators';
import './style.scss';

function FavoriteButton({ dispatch }) {
  const { country } = useParams();

  function handleAddCountry() {
    dispatch(addCountryToFav(country));
  }

  function popUpFunction() {
    const popup = document.querySelector('#popUp');
    popup.classList.add('show');
  }

  return (
    <>
      <button
        type="button"
        className="popUp"
        onClick={() => {
          handleAddCountry();
          popUpFunction();
        }}
      >
        <span className="popuptext" id="popUp">Country added to saved places</span>
        ✪
      </button>
    </>
  );
}

FavoriteButton.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps({ favoriteCountry }) {
  return {
    favoriteCountry
  };
}

export default connect(mapStateToProps)(FavoriteButton);
