import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

export default class App extends Component {

  state = {
    displayValue: '0'
  }
  
  addDigit = n => {
    this.setState({
      displayValue: n
    })
  }

  clearMemory = () => {
    this.setState({
      displayValue: '0'
    })
  }

  setOperation = operation => {

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
          <Button operation onClick={this.addDigit} label={"="} />
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
