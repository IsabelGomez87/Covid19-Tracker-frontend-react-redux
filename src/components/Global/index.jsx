import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loadGlobalData, loadVaccinesByContinent, loadAllCountriesData } from '../../redux/actions/actionCreators';
import './style.scss';

const Global = ({
  globalData, vaccinesByContinent, allCountriesData, dispatch
}) => {
  useEffect(() => {
    dispatch(loadGlobalData());
    dispatch(loadAllCountriesData());
  }, []);

  useEffect(() => {
    if (!vaccinesByContinent.length) {
      dispatch(loadVaccinesByContinent());
    }
  }, []);

  return (
    <>
      <section className="global">
        <div className="container">
          <div className="title">
            <h1>Global</h1>
            <h3>Affected countries: 220</h3>
          </div>
          <section className="mainData">
            <ul className="globalCards">
              { globalData
        && globalData.map(([element, value]) => (
          <li key={element} className="total">
            <p className="identifier">{element.toUpperCase()}</p>
            <p className="number">{Number(value).toLocaleString()}</p>
          </li>
        ))}
            </ul>
          </section>
          <section className="vaccinatedByContinent">
            <h2>Vaccinated by continents</h2>
            <ul className="continent-cards">
              { vaccinesByContinent
        && vaccinesByContinent.map((country) => (
          <li key={country} className="continent-card">
            <p className="continent-card__name">{country[0].toUpperCase()}</p>
            <p className="continent-card__entry">
              <div className="continent-card__container">
                Vaccinated:
                {' '}
                {`${((country[1] / country[4]) * 100).toFixed(2)} %`}
              </div>
              <label htmlFor="file" className="continent-card__data">
                <progress className="progress" id="file" max="100" value={(country[1] / country[4]) * 100} />
              </label>
            </p>
            <p className="continent-card__entry">
              <div className="continent-card__container">
                Partially Vaccinated:
                {' '}
                {`${((country[2] / country[4]) * 100).toFixed(2)} %`}
              </div>
              <progress className="progress" id="file" max="100" value={(country[2] / country[4]) * 100} />
            </p>
          </li>
        ))}
            </ul>
          </section>
          <section className="countryData">
            <ul className="countryInfo">
              { allCountriesData
        && allCountriesData.map(([element, value]) => (
          <li key={element} className="total">
            <p className="identifier">{element.toUpperCase()}</p>
            <p className="number">{Number(value).toLocaleString()}</p>
          </li>
        ))}
            </ul>
          </section>
        </div>
      </section>
    </>
  );
};

Global.propTypes = {
  globalData: PropTypes.shape([]).isRequired,
  vaccinesByContinent: PropTypes.shape([]).isRequired,
  allCountriesData: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ globalData, vaccinesByContinent, allCountriesData }) => (
  {
    globalData: Object.entries(globalData),
    vaccinesByContinent,
    allCountriesData: Object.entries(allCountriesData)
  }
);

export default connect(mapStateToProps)(Global);
