import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {

  state = { ...initialState }
  
  addDigit = n => {
    if (n === '.' && this.state.displayValue.includes('.')) {
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({displayValue, clearDisplay: false })

    if (n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (e) { 
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
      
        <Display value={this.state.displayValue} />
      
        <View style={styles.button} >
          <Button triple onClick={this.clearMemory} label={"AC"}  />
          <Button operation onClick={() => this.setOperation('/')} label={"/"} />
          <Button onClick={this.addDigit} label={"7"} />
          <Button onClick={this.addDigit} label={"8"} />
          <Button onClick={this.addDigit} label={"9"}  />
          <Button operation onClick={() => this.setOperation('-')} label={"-"} />
          <Button onClick={this.addDigit} label={"4"} />
          <Button onClick={this.addDigit} label={"5"} />
          <Button onClick={this.addDigit} label={"6"} />
          <Button operation onClick={() => this.setOperation('+')} label={"+"} />
          <Button onClick={this.addDigit} label={"1"} />
          <Button onClick={this.addDigit} label={"2"} />
          <Button onClick={this.addDigit} label={"3"} />
          <Button operation onClick={() => this.setOperation('*')} label={"*"} />
          <Button double onClick={this.addDigit} label={"0"} />
          <Button onClick={this.addDigit} label={"."} />
          <Button operation onClick={() => this.setOperation('=')} label={"="} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
