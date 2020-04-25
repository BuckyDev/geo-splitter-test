import React, { Component } from 'react';
import PropTypes from 'proptypes';
import Grid from './Grid';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { areEquals } from '../utils/areEquals';

class SingleTest extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    expectedOutput: PropTypes.object.isRequired,
    realOutput: PropTypes.object.isRequired,
    outputType: PropTypes.string,
  }

  renderIcon() {
    if (areEquals(this.props.expectedOutput, this.props.realOutput)) {
      return <CheckCircleOutlineOutlinedIcon fontSize='large' htmlColor='#1fb96c' />
    } else {
      return <CancelOutlinedIcon fontSize='large' htmlColor='#cd2424' />
    }
  }

  renderGridSample(data) {
    return (
      <Grid
        type='original'
        xMin={0}
        xMax={18}
        yMin={0}
        yMax={18}
        gridSize={6}
        data={data}
      />
    )
  }

  renderOutput(data) {
    if (this.props.outputType === 'map') {
      return this.renderGridSample(data);
    } else {
      return (
        <div style={{ width: '180px', height: '180px', position: 'relative'}}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}>
            {JSON.stringify(data)}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          width: '1000px',
          display: 'flex',
          justifyContent: 'flex-start',
          fontSize: '16px'
        }}
      >
        {this.renderIcon()}
        <span>
          {this.props.title}
        </span>
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          <div>
            {this.renderGridSample(this.props.input.data)}
            <div>
              Input
          </div>
          </div>
        </span>
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          <div>
            {this.renderOutput(this.props.realOutput)}
            <div>
              Output
          </div>
          </div>
        </span>
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          <div>
            {this.renderOutput(this.props.expectedOutput)}
            <div>
              Expected
          </div>
          </div>
        </span>
      </div>
    );
  }
}

export default SingleTest;
