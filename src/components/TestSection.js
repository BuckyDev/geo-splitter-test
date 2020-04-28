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
    outputType: PropTypes.string.isRequired,
    inputType: PropTypes.string,
    sectionTitle: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    testFunction: PropTypes.func.isRequired,
    testData: PropTypes.arrayOf(PropTypes.objectOf({
      input: PropTypes.object,
      expectedOutput: PropTypes.object
    }))
  }
  constructor(props) {
    super(props);
    this.state = {
      open: props.isInitiallyOpened || false,
      testResults: {}
    }
  }

  renderSingleTest(input, expectedOutput, key, title) {
    return (
      <SingleTest
        title={title}
        key={key}
        input={input}
        expectedOutput={expectedOutput}
        outputType={this.props.outputType}
        inputType={this.props.inputType}
        testFunction={this.props.testFunction}
        sendResult={(id, val) => { this.state.testResults[id] = val; this.forceUpdate() }}
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
        <span>{Object.values(this.state.testResults).filter(value => value).length}</span>
        <span style={{ marginLeft: '2px', verticalAlign: 'middle' }}>
          <CheckCircleOutlineOutlinedIcon htmlColor='#1fb96c' />
        </span>
        <span style={{ marginLeft: '10px' }}>{Object.values(this.state.testResults).filter(value => !value).length}</span>
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
          <div style={{ left: '0px', display: 'flex' }}>
            <div style={{width:'46px', display: 'inline-block' }}>
              {this.renderIcon()}
            </div>
            <div style={{ display: 'inline-block' }}>
              <span style={{ left: '40px', display: 'flex', fontSize: '24px' }}>
                {this.props.sectionTitle}
              </span>
              <span style={{ display: 'flex', fontSize: '16px', color: '#aaaaaa' }}>
                {this.props.subTitle}
              </span>
            </div>
          </div>
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
            height: this.state.open ? `${this.props.testData.length * 300 + 10}px` : '0px',
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
