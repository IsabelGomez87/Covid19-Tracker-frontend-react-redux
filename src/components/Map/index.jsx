import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Chart } from 'react-google-charts';
import { loadVaccinesDataToMap } from '../../redux/actions/actionCreators';
import './style.scss';

const Map = ({ vaccinesContinentToMap, dispatch }) => {
  useEffect(() => {
    if (vaccinesContinentToMap.length < 6) {
      dispatch(loadVaccinesDataToMap());
    }
  }, []);
  return (
    <>
      <div className="worldwide-map">
        <Chart
          chartType="GeoChart"
          data={vaccinesContinentToMap}
          options={{
            resolution: 'continents',
            colors: ['#CCDBDC', '#007EA7'],
            backgroundColor: 'transparent',
            legend: 'none'
          }}
          mapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    </>
  );
};

Map.propTypes = {
  vaccinesContinentToMap: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = ({ vaccinesContinentToMap }) => ({
  vaccinesContinentToMap
});

export default connect(mapStateToProps)(Map);
