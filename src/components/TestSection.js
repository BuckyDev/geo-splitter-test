import React, { Component } from 'react';
import PropTypes from 'proptypes';

import SingleTest from './SingleTest';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

class TestSection extends Component {
  static propTypes = {
    isInitiallyOpened: PropTypes.bool.isRequired,
    sectionTitle: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    testFunction: PropTypes.func.isRequired,
    testData: PropTypes.arrayOf(PropTypes.objectOf({
      input: PropTypes.object,
      expectedOutput: PropTypes.object
    }))
  }
  constructor(props){
    super(props);
    this.state = {
      open: props.isInitiallyOpened || false,
      passing: 0,
      failing: 0,
    }
  }

  componentDidMount() {
    const passing = this.props.testData.filter(el => el.expectedOutput === this.props.testFunction(el.input)).length
    const failing = this.props.testData.length - passing;
    this.setState({ passing, failing });
  }

  renderSingleTest(input, expectedOutput, key, title) {
    return (
      <SingleTest
        title={title}
        key={key}
        input={input}
        expectedOutput={expectedOutput}
        outputType={{}}
        realOutput={this.props.testFunction(input)}
      />
    )
  }

  renderIcon() {
    if (this.state.open) {
      return <ExpandLessIcon fontSize='large' />
    } else {
      return <ExpandMoreIcon fontSize='large' />
    }
  }

  renderResults() {
    const nbTests = this.props.testData.length
    return (
      <span style={{ fontSize: '25px', right: '0px', top: '5px', position: 'absolute' }}>
        <span>{this.state.passing}</span>
        <span style={{ marginLeft: '2px', verticalAlign: 'middle' }}>
          <CheckCircleOutlineOutlinedIcon htmlColor='#1fb96c' />
        </span>
        <span style={{ marginLeft: '10px' }}>{this.state.failing}</span>
        <span style={{ marginLeft: '2px', verticalAlign: 'middle' }}>
          <CancelOutlinedIcon htmlColor='#cd2424' />
        </span>
        <span style={{ marginLeft: '10px' }}>{`/  ${nbTests}`}</span>
      </span>
    )
  }

  render() {
    return (
      <div style={{ width: '1000px', position: 'relative', marginTop: '5px' }}>
        <span
          onClick={() => this.setState({ open: !this.state.open })}
        >
          <span style={{ left: '0px', position: 'absolute' }}>
            {this.renderIcon()}
          </span>
          <span style={{ left: '40px', position: 'absolute' }}>
            {this.props.sectionTitle}
          </span>
          <span style={{ verticalAlign: 'middle', fontSize: '16px', color: '#aaaaaa' }}>
            {this.props.subTitle}
          </span>
          {this.renderResults()}
        </span>
        <div style={{
          width: '1000px',
          height: '1px',
          backgroundColor: '#cccccc',
          marginTop: '5px'
        }}
        />
        <div
          style={{
            height: this.state.open ? `${this.props.testData.length * 211 + 10}px` : '0px',
            transition: '0.2s ease-in-out',
            overflow: 'hidden'
          }}
        >
          {this.props.testData.map((el, idx) => this.renderSingleTest(el.input, el.expectedOutput, idx, el.title))}
        </div>
      </div>
    );
  }
}

export default TestSection;
