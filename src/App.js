import React, {Component} from 'react';
import './App.css';
import Dygraph from './dygraphComponent/DygraphJs';
import GraphData from '../sample-data';
import GraphData2 from '../sample-data2';

class App extends Component {
  constructor(){
    super();
    let self =this;
    this.graphConfig =  {
      title: "Pressure Transient(s)",
      xlabel: "Time",
      ylabel: "Pressure (meters)",
      gridLineWidth: 0.1,
      labels: [
        "Date",
        "Tampines Ave10 (Stn 40)"
      ],
      connectSeparatedPoints: true,
      axes: {
        x: {
          axisLabelFontSize: 9,
          axisLabelFormatter: function(time) {
            let d = new Date(time);
            return d.toTimeString().split(' ')[0]+ ':'+d.getMilliseconds();
          },
          valueFormatter: function(time) {
            let d = new Date(time),
                ms = ''+d.getMilliseconds(),
                zeroPad = 3-ms.length;

            return d.toTimeString().split(' ')[0]+ ':'+((zeroPad > 0 ? new Array(++zeroPad).join('0') : '') + ms);
          }
        },
        y:{
          valueFormatter: function(pressure) {
            return parseFloat(pressure).toFixed(2);
          }
        }
      },
      animatedZooms: true,
      underlayCallback: function(canvas, area, g) {
        /*http://dygraphs.com/gallery/#g/highlighted-region*/
        var highlight_start = new Date(new Date('2016-07-15T10:24:17.273Z'));
        var highlight_end = new Date(new Date('2016-07-15T10:24:31.762Z'));
        var bottom_left = g.toDomCoords(highlight_start, -20);
        var top_right = g.toDomCoords(highlight_end, +20);

        var left = bottom_left[0];
        var right = top_right[0];

        canvas.fillStyle = "#FFA000";
        canvas.fillRect(left, area.y, right - left, area.h);
      },
      height: 400
    }
    this.time = {};
    this.graphData = GraphData.map((i)=>{this.time[Date.parse(i[0])] =i[0];return [Date.parse(i[0]),i[1]]});
    this.graphData2 = GraphData2.map((i)=>{this.time[Date.parse(i[0])] =i[0];return [Date.parse(i[0]),i[1]]});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Dygraph Demo</h1> 
        </div>
        <p className="App-intro">Pressure Transient Details</p>
        <div className="grapMain">
          <Dygraph config={this.graphConfig} data={this.graphData}/>
        </div>
        <h1>The below is another dygrap with some other data</h1>
        <div className="grapMain">
          <Dygraph config={this.graphConfig} data={this.graphData2}/>
        </div>
      </div>
    );
  }
}

export default App;