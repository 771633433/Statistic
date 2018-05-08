import React, { Component } from 'react';
import './App.css';
import Bar from './components/Bar'
import Echart from './components/echarts'
import Cj from './components/Cj'
import Attribute from './components/attribute'
import Today from './components/today'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Bar></Bar>
          <Cj></Cj>
          <Attribute></Attribute>
          <Today></Today>
          <Echart></Echart>
      </div>
    )
  }
}

export default App;
