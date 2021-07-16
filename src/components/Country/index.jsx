import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import { loadCountryData, loadVaccinesByCountry } from '../../redux/actions/actionCreators';
import FavoriteButton from '../FavoriteButton';
import HistoryGraph from '../HistoryGraph';
import './style.scss';

const Country = ({ dispatch, countryData, vaccineByCountryData }) => {
  const { country } = useParams();
  useEffect(() => { dispatch(loadCountryData(country)); }, [country]);
  useEffect(() => { dispatch(loadVaccinesByCountry(country)); }, [country]);

  const myInterestValuesArray = ['confirmed', 'recovered', 'deaths', 'population', 'updated'];
  const myInterestVaccinesValuesArray = ['administered', 'people_vaccinated', 'people_partially_vaccinated'];
  const myCountryStats = [];
  const myCountryVaccineStats = [];

  const getStatsCountryValues = () => {
    Object.entries(countryData).forEach(([element, value]) => {
      if (myInterestValuesArray.find((keys) => keys === element)) {
        myCountryStats.push([element, value]);
      }
      return myCountryStats;
    });
  };
  const getVaccinesCountryValues = () => {
    Object.entries(vaccineByCountryData).forEach(([element, value]) => {
      if (myInterestVaccinesValuesArray.find((keys) => keys === element)) {
        myCountryVaccineStats.push([element, value]);
      }
      return myCountryVaccineStats;
    });
  };

  getStatsCountryValues();
  getVaccinesCountryValues();
  const printStats = (array) => array.map(([element, value]) => (
    <li key={`${value}`}>
      {element.includes('_') ? element.replace(/_/g, ' ').toUpperCase() : element.toUpperCase()}
      :
      {' '}
      {(typeof value === 'number')
        ? (Number(value).toLocaleString())
        : (value.slice(0, 10))}
    </li>
  ));

  return (
    <>
      <section className="country-section">
        <div className="country-section__data">
          <div className="country-container">
            <h1>{country}</h1>
            <FavoriteButton />
            <ul>
              {printStats(myCountryStats)}
            </ul>
          </div>
          <div className="vacciones-container">
            <h3>
              Vaccines
            </h3>
            {myCountryVaccineStats.length !== 0
              ? (
                <ul>
                  {printStats(myCountryVaccineStats)}
                </ul>
              )
              : <p>No data available</p>}
          </div>
        </div>
        <div className="graph-container">
          <h3>Historical evolution chart of the confirmed cases</h3>
          <HistoryGraph />
        </div>
      </section>
    </>
  );
};

Country.propTypes = {
  dispatch: PropTypes.func.isRequired,
  countryData: PropTypes.shape({}).isRequired,
  vaccineByCountryData: PropTypes.shape({}).isRequired
};

const mapStateToProps = ({ countryData, vaccineByCountryData }) => ({
  countryData,
  vaccineByCountryData
});

export default connect(mapStateToProps)(Country);
