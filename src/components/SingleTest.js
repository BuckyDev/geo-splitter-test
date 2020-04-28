import React, { Component } from 'react';
import PropTypes from 'proptypes';
import Grid from './Grid';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

import { areEquals } from '../utils/areEquals';

function flattenDoubleArray(arr) {
  const result = [];
  arr.map(innerArr => innerArr.map(el => result.push(el)))
  return result;
}

class SingleTest extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    key: PropTypes.number,
    input: PropTypes.object.isRequired,
    expectedOutput: PropTypes.object.isRequired,
    inputType: PropTypes.string,
    outputType: PropTypes.string,
    testFunction: PropTypes.func.isRequired,
    sendResult: PropTypes.func.isRequired,
  }

  state={
    realOutput: null,
  }

  componentDidMount(){
    const realOutput = this.props.testFunction(this.props.input);
    if(this.props.title === "Bouncing corner path point"){
      console.log(realOutput)
    }
    this.setState({realOutput})
    this.props.sendResult(this.props.title,areEquals(this.props.expectedOutput, realOutput))
  }

  renderIcon() {
    if (areEquals(this.props.expectedOutput, this.state.realOutput)) {
      return <CheckCircleOutlineOutlinedIcon fontSize='large' htmlColor='#1fb96c' />
    } else {
      return <CancelOutlinedIcon fontSize='large' htmlColor='#cd2424' />
    }
  }

  renderPolygons(data) {
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

  renderPoints(data) {
    return (
      <Grid
        type='original'
        xMin={0}
        xMax={18}
        yMin={0}
        yMax={18}
        gridSize={6}
        extraPoints={flattenDoubleArray(data)}
      />
    )
  }

  renderLines(data) {
    return (
      <Grid
        type='original'
        xMin={0}
        xMax={18}
        yMin={0}
        yMax={18}
        gridSize={6}
        extraLines={data}
      />
    )
  }

  renderMergerInput(data){
    return (
      <Grid
        type='original'
        xMin={0}
        xMax={18}
        yMin={0}
        yMax={18}
        gridSize={6}
        data={data.data}
        extraPoints={data.points}
        extraLines={data.lines}
      />
    )
  }

  renderInput(data){
    if (this.props.inputType === 'merger'){
      return this.renderMergerInput(data);
    } else {
      return this.renderPolygons(data);
    }
  }

  renderOutput(data) {
    if(!data){
      return null;
    }
    if (this.props.outputType === 'map') {
      return this.renderPolygons(data);
    } else if (this.props.outputType === 'pointArray') {
      return this.renderPoints(data);
    } else if (this.props.outputType === 'lineArray') {
      return this.renderLines(data);
    } else {
      return (
        <div style={{ width: '180px', height: '180px', position: 'relative', border: '1px solid white' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
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
          marginBottom: '50px',
          width: '1000px',
        }}
      >
        <div
          style={{
            width: '1000px',
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '24px'
          }}
        >
          {this.renderIcon()}
          <span style={{margin: 'auto', marginLeft: '10px', textAlign:'center'}}>
            {this.props.title}
          </span>
        </div>
        <div
          style={{
            width: '1000px',
            display: 'flex',
            justifyContent: 'flex-start',
            fontSize: '16px'
          }}
        >
          <span style={{ marginLeft: '50px', marginRight: '50px' }}>
            <div>
              {this.renderInput(this.props.input.data)}
              <div>
                Input
              </div>
            </div>
          </span>
          <span style={{ marginLeft: '50px', marginRight: '50px' }}>
            <div>
              {this.renderOutput(this.state.realOutput)}
              <div>
                Output
              </div>
            </div>
          </span>
          <span style={{ marginLeft: '50px', marginRight: '50px' }}>
            <div>
              {this.renderOutput(this.props.expectedOutput)}
              <div>
                Expected
              </div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

export default SingleTest;
