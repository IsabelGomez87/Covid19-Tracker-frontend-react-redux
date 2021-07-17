import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { loadAllCountriesData } from '../../redux/actions/actionCreators';
import './style.scss';

const TableData = ({ allCountriesData, dispatch }) => {
  useEffect(() => {
    dispatch(loadAllCountriesData());
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650
    }
  });

  //   const createData = (array) => {
  //     array.map((element) => [
  //       element.country,
  //       element.population,
  //       element.confirmedCases,
  //       element.recoveredCases,
  //       element.deaths,
  //       element.vaccinesAdministered,
  //       element.peopleVaccinated,
  //       element.peoplePartiallyVaccinated
  //     ]);
  //   };

  //   const rows = [
  //     createData(allCountriesData)
  //   ];

  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Country</TableCell>
            <TableCell align="right">Continent</TableCell>
            <TableCell align="right">Capital City</TableCell>
            <TableCell align="right">Population</TableCell>
            <TableCell align="right">Confirmed Cases</TableCell>
            <TableCell align="right">Recovered Cases</TableCell>
            <TableCell align="right">Deaths</TableCell>
            <TableCell align="right">Vaccines Administered</TableCell>
            <TableCell align="right">People Vaccinated</TableCell>
            <TableCell align="right">People Partially Vaccinated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCountriesData.map((element) => (
            <TableRow key={element.country}>
              <TableCell component="th" scope="row">{element.country}</TableCell>
              <TableCell align="right">{element.continent}</TableCell>
              <TableCell align="right">{element.capital_city}</TableCell>
              <TableCell align="right">{element.population}</TableCell>
              {/* ponerlos en porcentajes */}
              <TableCell align="right">{element.confirmed}</TableCell>
              <TableCell align="right">{element.recovered}</TableCell>
              <TableCell align="right">{element.deaths}</TableCell>
              <TableCell align="right">{element.administered}</TableCell>
              <TableCell align="right">{element.people_vaccinated}</TableCell>
              <TableCell align="right">{element.people_partially_vaccinated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TableData.propTypes = {
  allCountriesData: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ allCountriesData }) => (
  {
    allCountriesData: Object.values(allCountriesData)
  }
);

export default connect(mapStateToProps)(TableData);
