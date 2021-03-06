import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { loadAllCasesCountriesData, loadAllVaccinesCountriesData } from '../../redux/actions/actionCreators';
import getDataForTable from '../../utils/common';
import './style.scss';

const TableData = ({ allCountriesCases, allCountriesVaccines, dispatch }) => {
  useEffect(() => {
    dispatch(loadAllCasesCountriesData());
    dispatch(loadAllVaccinesCountriesData());
  }, []);
  const countriesData = getDataForTable(allCountriesCases, allCountriesVaccines);

  const useStyles = makeStyles({
    root: {
      width: '100%',
      backgroundColor: '#FAFAFA',
      color: 'white',
      borderRadius: 10,
      position: 'relative',
      zIndex: 1
    },
    container: {
      maxHeight: 440
    },
    table: {
      minWidth: 1000
    },
    tableHead: {
      backgroundColor: '#3D5566',
      color: '#FAFAFA'
    },
    headerBorderLeft: {
      borderTopLeftRadius: 10,
      backgroundColor: '#3D5566',
      color: '#FAFAFA'
    },
    headerBorderRight: {
      borderTopRightRadius: 10,
      backgroundColor: '#3D5566',
      color: '#FAFAFA'
    }
  });

  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <h2>Detailed information by country</h2>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerBorderLeft}>Country</TableCell>
                <TableCell className={classes.tableHead} align="right">Continent</TableCell>
                <TableCell className={classes.tableHead} align="right">Capital City</TableCell>
                <TableCell className={classes.tableHead} align="right">Population</TableCell>
                <TableCell className={classes.tableHead} align="right">Confirmed Cases (% / population)</TableCell>
                <TableCell className={classes.tableHead} align="right">Recovered Cases (% / population)</TableCell>
                <TableCell className={classes.tableHead} align="right">Deaths (% / population)</TableCell>
                <TableCell className={classes.tableHead} align="right">Vaccines Administered (% / population)</TableCell>
                <TableCell className={classes.tableHead} align="right">People Vaccinated (% / population)</TableCell>
                <TableCell className={classes.headerBorderRight} align="right">People Partially Vaccinated (% / population)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {countriesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                (element) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={element.country}>
                    <TableCell component="th" scope="row" className="country-Column">
                      <Link to={element.country !== '' ? `/country/${element.country}` : undefined}>{element.country}</Link>
                    </TableCell>
                    <TableCell align="right">{element.continent}</TableCell>
                    <TableCell align="right">{element.capital_city}</TableCell>
                    <TableCell align="right">{Number(element.population).toLocaleString()}</TableCell>
                    <TableCell align="right">{`${((element.confirmed / element.population) * 100).toFixed(2)} %`}</TableCell>
                    <TableCell align="right">{`${((element.recovered / element.population) * 100).toFixed(2)} %`}</TableCell>
                    <TableCell align="right">{`${((element.deaths / element.population) * 100).toFixed(2)} %`}</TableCell>
                    <TableCell align="right">{`${((element.administered / element.population) * 100).toFixed(2)} %`}</TableCell>
                    <TableCell align="right">{`${((element.people_vaccinated / element.population) * 100).toFixed(2)} %`}</TableCell>
                    <TableCell align="right">{`${((element.people_partially_vaccinated / element.population) * 100).toFixed(2)} %`}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={countriesData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

TableData.propTypes = {
  allCountriesCases: PropTypes.shape([]).isRequired,
  allCountriesVaccines: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ allCountriesCases, allCountriesVaccines }) => (
  {
    allCountriesCases,
    allCountriesVaccines
  }
);

export default connect(mapStateToProps)(TableData);
