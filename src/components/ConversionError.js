import React, { Component } from 'react';
import Grid from './Grid';

import {
  cornerPointMerger,
} from 'geo-splitter';

function filterAndNormalizedData(geoJson, minX, maxX, minY, maxY, featureId) {
  const filteredFeatures = geoJson.features
    .filter(feature => feature.properties.id === featureId)
    .map(feature => {
      const filteredCoordinates = feature.geometry.coordinates.map(coords => {
        return coords.filter(point =>
          point[0] >= minX &&
          point[0] <= maxX &&
          point[1] >= minY &&
          point[1] <= maxY
        ).map(point => [point[0] - minX, point[1] - minY])
      })
      return {
        ...feature,
        geometry: {
          ...feature.geometry,
          coordinates: filteredCoordinates,
        }
      }
    })
  return {
    ...geoJson,
    features: filteredFeatures,
  }
};

class ConversionError extends Component {
  state = {
    errorCode: null,
    dataset: 'GSHHS_c_L1.json',
  };

  getOutput(func, funcParams, featurePoints, id) {
    switch (func) {
      case 'merger':
        const result = {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "id": "0"
              },
              "geometry": {
                "type": "Polygon",
                "coordinates": cornerPointMerger(funcParams.minX, funcParams.maxX, funcParams.minY, funcParams.maxY, funcParams.errorPointSubset, funcParams.errorCornerPointSubset, featurePoints, id)
              }
            }
          ]
        };
        return result;
      default:
        return null;
    }
  }

  renderSample() {
    const { errorCode, dataset } = this.state;
    if (!errorCode || !dataset) {
      return null;
    }
    const errorParams = JSON.parse(errorCode.replace(/\s/g, ''));

    const {
      minX,
      minY,
      gridSize,
      featureId,
    } = errorParams.data;
    const {
      errorPointSubset,
      errorCornerPointSubset
    } = errorParams.params;
    const rawSample = require(`../data/${dataset}`);
    const processedSample = filterAndNormalizedData(rawSample, minX - gridSize, minX + 2 * gridSize, minY - gridSize, minY + 2 * gridSize, `${featureId}`);
    const processedExtraLines = errorPointSubset.map(line => line.map(point => [point[0] - (minX - gridSize), point[1] - (minY - gridSize)]))
    const processedExtraPoints = errorCornerPointSubset.map(point => [point[0] - (minX - gridSize), point[1] - (minY - gridSize)])

    const result = this.getOutput(errorParams.function, errorParams.params, rawSample.features.find(ft => ft.properties.id === `${featureId}`).geometry.coordinates, `${featureId}`);
    console.log(result)
    const processedResult = filterAndNormalizedData(result, minX - gridSize, minX + 2 * gridSize, minY - gridSize, minY + 2 * gridSize, `0`);
    console.log(processedResult)
    return (
      <div>
        <div style={{marginBottom: '40px'}}>
          <Grid
            type='original'
            data={processedSample}
            extraPoints={processedExtraPoints}
            extraLines={processedExtraLines}
            xMin={0}
            xMax={3 * gridSize}
            yMin={0}
            yMax={3 * gridSize}
            gridSize={gridSize}
            gridLines={false}
            renderPoints={false}
            renderExtraLinePoints={false}
            zoom={25 / gridSize}
          />
        </div>
        <div>
          <Grid
            type='original'
            data={processedResult}
            xMin={0}
            xMax={3 * gridSize}
            yMin={0}
            yMax={3 * gridSize}
            gridSize={gridSize}
            gridLines={false}
            renderPoints={false}
            zoom={25 / gridSize}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>Conversion error</div>
        <div style={{
          marginBottom: '20px',
          fontSize: '16px',
          color: '#aaaaaa',
          width: '800px'
        }}
        >
          If you got any conversion error during any splitting process,
          copy/paste the error code here and import your data sample into src/data to get more details about it.
        </div>
        <div style={{
          marginBottom: '20px',
          fontSize: '16px',
          color: '#aaaaaa',
          width: '800px'
        }}
        >
          <input
            style={{
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '16px',
              color: '#282c34',
              width: '400px',
              height: '20px',
            }}
            placeholder='Error code'
            onChange={({ target: { value } }) => this.setState({ errorCode: value })}
          />
          <input
            style={{
              borderRadius: '4px',
              marginBottom: '20px',
              fontSize: '16px',
              color: '#282c34',
              width: '400px',
              height: '20px',
            }}
            placeholder='Dataset name'
            onChange={({ target: { value } }) => this.setState({ dataset: value })}
          />
        </div>
        {this.renderSample()}
      </div>
    );
  }
}

export default ConversionError;

