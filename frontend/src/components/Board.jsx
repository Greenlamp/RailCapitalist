import React, { Component } from 'react';
import ProgressBar from "../components/ProgressBar";
import {connect} from 'react-redux';
import { Button } from 'reactstrap';
import { Alert, Table } from 'reactstrap';

class Board extends Component{
    constructor(props) {
        super(props)
        this.handleClickChange = this.handleClickChange.bind(this)
        this.handleClickAuto = this.handleClickAuto.bind(this)
        this.showAlert = this.showAlert.bind(this)

        this.level_up = this.level_up.bind(this)
        this.state = { progress: 0, time: {}, seconds: 100, cpt: 0, auto: false, error:false, levelling:false, running:false }
        this.init = this.state.seconds
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.reset = this.reset.bind(this);

        this.actions = this.props.actions
        this.shop = this.props.shop
        this.state.niveau = this.shop.niveau
        this.state.gain_reel = this.shop.gain * this.state.niveau
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
        if (!this.state.levelling) {
            this.setState({levelling: true})
            let cout = ((this.state.niveau * this.shop.cout) * this.shop.mult).toFixed(2) * this.props.multiplicateur
            if (this.props.total >= cout) {
                this.actions.level_up(this.shop.id)
                this.setState({
                    niveau: this.state.niveau + this.props.multiplicateur,
                    gain_reel: this.shop.gain * (this.state.niveau + this.props.multiplicateur)
                })
            } else {
                this.setState({error: true})
            }
            this.setState({levelling: false})
        }
    }

    showAlert(){
        if(this.state.error) {
            setTimeout(function() { this.setState({error: false}); }.bind(this), 3000);
            return (
                <Alert color="danger">
                    Pas assez d'argent.
                </Alert>
            )
        }
    }



    render() {
        return (
          <div>
            <div id="App">
                <Table>
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
                </Table>
                <Table>
                    <tbody>
                    <tr>
                        <td>
                          <Button type="button" onClick={this.handleClickChange}>V</Button>
                        </td>
                        <td>
                          <Button type="button" onClick={this.handleClickAuto}>Auto</Button>
                        </td>
                        <td>
                          <Button type="button" onClick={this.level_up}>Acheter niveau</Button>
                        </td>
                    </tr>
                    </tbody>
                </Table>

                <ProgressBar progress={this.state.progress} gain={this.state.gain_reel}/>
                {this.showAlert()}
            </div>
          </div>
        )
    }
}

export default connect()(Board);