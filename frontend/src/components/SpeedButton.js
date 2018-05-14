import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

class SpeedButton extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            vitesse: 1
        };
        this.multip = this.multip.bind(this)
    }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  multip(value){
    this.props.multiplicateur(value)
    this.setState({vitesse: value})
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Vitesse: {this.state.vitesse}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.multip(1)}>X1</DropdownItem>
          <DropdownItem onClick={() => this.multip(10)}>X10</DropdownItem>
          <DropdownItem onClick={() => this.multip(100)}>X100</DropdownItem>
          <DropdownItem onClick={() => this.multip(1000)}>X1000</DropdownItem>
          <DropdownItem onClick={() => this.multip(10000)}>X10000</DropdownItem>
          <DropdownItem onClick={() => this.multip(100000)}>X100000</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}


export default SpeedButton;