import React, { Component } from 'react';
import ProgressBar from "../components/ProgressBar";
import {connect} from 'react-redux';

class Board extends Component{
    constructor(props) {
        super(props)
        this.handleClickChange = this.handleClickChange.bind(this)
        this.handleClickAuto = this.handleClickAuto.bind(this)
        this.handleClickReset = this.handleClickReset.bind(this)
        this.state = { progress: 0, time: {}, seconds: 100, cpt: 0, auto: false }
        this.state.init = this.state.seconds
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.reset = this.reset.bind(this);
        this.time = this.props.time
    }

    startTimer() {
        if (this.timer === 0) {
          let delay = this.time*10
          console.log("delay: " + delay)
          this.timer = setInterval(this.countDown, delay);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
          progress: 100-this.state.seconds,
          seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.value = this.props.value
            this.setState({cpt: this.state.cpt + this.value})
            this.props.increment(this.value)
            if (this.state.auto === true) this.reset()
            else this.setState({seconds: this.state.init, progress: 0})
        }
    }

    handleClickChange() {
        this.reset()
        this.setState({auto: false})
        this.startTimer()
    }

    handleClickAuto() {
        this.reset()
        this.setState({auto: true})
        this.startTimer()
    }

    reset(){
        this.timer = 0;
        this.setState({seconds:this.state.init, progress: 0})
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
              Nom: {this.props.nom}<br/>
              cpt: {this.state.cpt}<br/>
              value: {this.props.value}<br/>
              <button type="button" onClick={this.handleClickChange}>
                Change Progress
              </button>
              <button type="button" onClick={this.handleClickReset}>
                Reset Progress
              </button>
              <button type="button" onClick={this.handleClickAuto}>
                Auto Progress
              </button>
              <hr />
              <ProgressBar progress={this.state.progress}/>
            </div>
          </div>
        )
    }
}

export default connect()(Board);