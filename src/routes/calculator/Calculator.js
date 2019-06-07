/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Calculator.scss';

import fetch from '../../core/fetch';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: '' };
  }

  render() {
    return (
      <div onKeyDown={this.onKeyPressed} tabIndex="0">
        <div className={s.display}>
          <h2>{ this.state.display }</h2>
        </div>
        <table className={s.buttonsTable}>
          <tbody>
            <tr>
              <td>
              </td>
              <td>
              </td>
              <td>
                <button value="C" onClick={this.clearClick.bind(this)} className={s.button}>C</button>
              </td>
              <td>
                <button value="/" onClick={this.buttonClick.bind(this, '/')} className={s.button}>/</button>
              </td>
            </tr>
            <tr>
              <td>
                <button value="7" onClick={this.buttonClick.bind(this, '7')} className={s.button}>7</button>
              </td>
              <td>
                <button value="8" onClick={this.buttonClick.bind(this, '8')} className={s.button}>8</button>
              </td>
              <td>
                <button value="9" onClick={this.buttonClick.bind(this, '9')} className={s.button}>9</button>
              </td>
              <td>
                <button value="*" onClick={this.buttonClick.bind(this, '*')} className={s.button}>*</button>
              </td>
            </tr>
            <tr>
              <td>
                <button value="4" onClick={this.buttonClick.bind(this, '4')} className={s.button}>4</button>
              </td>
              <td>
                <button value="5" onClick={this.buttonClick.bind(this, '5')} className={s.button}>5</button>
              </td>
              <td>
                <button value="6" onClick={this.buttonClick.bind(this, '6')} className={s.button}>6</button>
              </td>
              <td>
                
              </td>
            </tr>
            <tr>
              <td>
                <button value="1" onClick={this.buttonClick.bind(this, '1')} className={s.button}>1</button>
              </td>
              <td>
                <button value="2" onClick={this.buttonClick.bind(this, '2')} className={s.button}>2</button>
              </td>
              <td>
                <button value="3" onClick={this.buttonClick.bind(this, '3')} className={s.button}>3</button>
              </td>
              <td>
                
              </td>
            </tr>
            <tr>
              <td>
                
              </td>
              <td>
                <button value="0" onClick={this.buttonClick.bind(this, '0')} className={s.button}>0</button>
              </td>
              <td>
                <button value="." onClick={this.buttonClick.bind(this, '.')} className={s.button}>.</button>
              </td>
              <td>
                <button value="=" onClick={this.equalClick.bind(this)} className={s.button}>=</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  clearClick() {
    this.setState({
      display: ''
    });
    this.state.showingResult = false;
  }

  buttonClick(char) {
    this.setState({
      display: (this.state.showingResult ? '' : this.state.display) + char
    });
    this.state.showingResult = false;
  }

  async equalClick() {
    this.state.showingResult = false;
    const response = await fetch(`/graphql?query={calculations(expression:"${this.state.display}"){result}}`);
    const { data } = await response.json();
    this.state.showingResult = true;
    this.setState({
      display: data && data.calculations && data.calculations.result
    });
  }

  onKeyPressed(event) {
    var relevantButton = [...event.currentTarget.getElementsByTagName('button')].find(button => button.value === event.key);
    relevantButton && relevantButton.click();
  }
}

Calculator.propTypes = {
  
};

export default withStyles(Calculator, s);
