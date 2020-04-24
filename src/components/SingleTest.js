import React, { Component } from 'react';
import PropTypes from 'proptypes';
import Grid from './Grid';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

class SingleTest extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    expectedOutput: PropTypes.object.isRequired,
    realOutput: PropTypes.object.isRequired,
    outputType: PropTypes.string,
  }

  renderIcon() {
    if (this.props.expectedOutput === this.props.realOutput) {
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
            {this.renderGridSample(this.props.realOutput.data)}
            <div>
              Output
          </div>
          </div>
        </span>
        <span style={{ marginLeft: '10px', marginRight: '10px' }}>
          <div>
            {this.renderGridSample(this.props.expectedOutput.data)}
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
