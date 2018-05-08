import React, { Component } from 'react';
import Zone from "./Zone";
import {connect} from 'react-redux';

class Board extends Component{
    constructor(props) {
        super(props)
        this.handleClickChange = this.handleClickChange.bind(this)
        this.handleClickReset = this.handleClickReset.bind(this)
        this.state = { progress: 0, time: {}, seconds: 3, cpt: 0 }
        this.state.init = this.state.seconds
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.reset = this.reset.bind(this);
    }

    startTimer() {
        if (this.timer === 0) {
          this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          progress: 100-(100/this.state.init)*this.state.seconds+(100/this.state.init),
          seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
          clearInterval(this.timer);
          this.setState({cpt: this.state.cpt + 1})
          this.props.increment()
          this.reset()
        }
    }

    handleClickChange() {
        this.startTimer()
    }

    reset(){
        this.timer = 0;
        this.setState({seconds:this.state.init})
        this.startTimer()
    }

    handleClickReset() {
        this.reset()
    }

    render() {
        return (
          <div>
            <div id="App">
              time: {this.state.seconds}<br/>
              progress: {this.state.progress}<br/>
              cpt: {this.state.cpt}<br/>
              <button type="button" onClick={this.handleClickChange}>
                Change Progress
              </button>
              <button type="button" onClick={this.handleClickReset}>
                Reset Progress
              </button>
              <hr />
              <Zone progress={this.state.progress}/>
            </div>
          </div>
        )
    }
}

export default connect()(Board);