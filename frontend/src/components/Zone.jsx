import React, { Component } from 'react';
import {connect} from 'react-redux';

class Zone extends Component{
    render() {
        return (
            <ProgressBar progress={this.props.progress} />
        );
    }
}

const ProgressBar = ({ progress }) => (
  <div className="progressbar">
    <div className="progress" style={{ width: `${progress}%`}}>
    </div>
  </div>
)


export default connect()(Zone);