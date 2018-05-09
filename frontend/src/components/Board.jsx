import React, { Component } from 'react';
import ProgressBar from "../components/ProgressBar";
import {connect} from 'react-redux';

class Board extends Component{
    constructor(props) {
        super(props)
        this.handleClickChange = this.handleClickChange.bind(this)
        this.handleClickAuto = this.handleClickAuto.bind(this)

        this.level_up = this.level_up.bind(this)
        this.state = { progress: 0, time: {}, seconds: 100, cpt: 0, auto: false }
        this.init = this.state.seconds
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.reset = this.reset.bind(this);

        this.actions = this.props.actions
        this.shop = this.props.shop
        this.state.niveau = this.shop.niveau
        this.state.gain_reel = this.shop.gain * this.state.niveau


        this.state.running = false
    }

    startTimer() {
        if (this.timer === 0) {
          let delay = this.shop.temp*10
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
            this.setState({cpt: this.state.cpt + this.state.gain_reel})
            this.actions.increment(this.state.gain_reel)
            if (this.state.auto === true) this.reset()
            else{
                this.setState({seconds: this.init, progress: 0})
                this.setState({running: false})
            }
        }
    }

    handleClickChange() {
        if(!this.state.running){
            this.reset()
            this.setState({auto: false})
            this.startTimer()
            this.setState({running: true})
        }
    }

    handleClickAuto() {
        if(!this.running){
            this.reset()
            this.setState({auto: true})
            this.startTimer()
            this.setState({running: true})
        }
    }

    reset(){
        this.timer = 0;
        this.setState({seconds:this.init, progress: 0})
        this.startTimer()
    }

    level_up(){
        let cout = ((this.state.niveau * this.shop.cout) *this.shop.mult).toFixed(2) * this.props.multiplicateur
        if(this.props.total >= cout) {
            this.actions.level_up(this.shop.id)
            this.setState({niveau: this.state.niveau + this.props.multiplicateur, gain_reel: this.shop.gain * this.state.niveau + this.props.multiplicateur})
        }else{
            alert("pas assez d'argent")
        }
    }

    render() {
        return (
          <div>
            <div id="App">
                <table border="1">
                    <tbody>
                    <tr>
                        <td colSpan="2" align="center">{this.shop.nom}</td>
                    </tr>
                    <tr>
                        <td width="10">Niveau:</td><td align="left">{this.state.niveau}</td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">Cout pour monter au niveau supérieur:</td>
                    </tr>
                    <tr>
                        <td colSpan="2" align="center">($)(x{this.props.multiplicateur}) {((this.state.niveau * this.shop.cout) *this.shop.mult).toFixed(2) * this.props.multiplicateur}</td>
                    </tr>
                </tbody>
                </table><br/>
                <table>
                    <tbody>
                    <tr>
                        <td>
                          <button type="button" onClick={this.handleClickChange}>V</button>
                        </td>
                        <td>
                          <button type="button" onClick={this.handleClickAuto}>Auto</button>
                        </td>
                        <td>
                          <button type="button" onClick={this.level_up}>Acheter niveau</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <ProgressBar progress={this.state.progress} gain={this.state.gain_reel}/>
            </div>
          </div>
        )
    }
}

export default connect()(Board);