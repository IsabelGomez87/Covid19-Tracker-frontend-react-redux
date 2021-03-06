import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import magnifying from '../../assets/magnifying-pic.png';
import './style.scss';

const SearchInput = () => {
  const capitalizeFirstLetter = (item) => item.charAt(0).toUpperCase() + item.slice(1);
  const [newSearch, setNewSearch] = useState('');

  return (
    <>
      <form className="form-container">
        <label htmlFor="search-input">
          <input
            id="search-input"
            placeholder="Search country"
            onChange={(event) => setNewSearch((capitalizeFirstLetter(event.target.value)))}
          />
          <button type="button" className="search-button">
            <Link to={newSearch !== '' ? `/country/${newSearch}` : undefined}>
              <img src={magnifying} alt="icon" />
            </Link>
          </button>
        </label>
      </form>
    </>
  );
};

export default SearchInput;
