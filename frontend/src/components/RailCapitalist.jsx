import React, { Component } from 'react';
import {connect} from 'react-redux';
import Board from "./Board";
import {board} from '../actions';


class RailCapitalist extends Component {

  increment = () => {
    this.props.increment();
  }

  render() {
    return (
      <div>
        <h2>Welcome to Rail Capitalist!</h2>
        <hr />
        <button onClick={this.props.increment}>increment</button>
        <br/>
        Total: {this.props.total}
        <Board increment={this.props.increment}/>
        <Board increment={this.props.increment}/>
        <Board increment={this.props.increment}/>
        <Board increment={this.props.increment}/>
      </div>
    )
  }
}



const mapStateToProps = state => {
    return {
        total: state.board.total,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => {
            dispatch(board.increment());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RailCapitalist);