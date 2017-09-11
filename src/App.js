import React, {Component} from 'react';
import '../css/App.css';
import Dygraph from '../components/dygraphComponent/DygraphJs';
import GraphStore from '../store/graphStore';

class App extends Component {
  constructor() {
    super();
    let self = this;
    this.title = 'Dygraph Demo';
    this.sectionTitle = 'Pressure Transient Details';
    this.graphConfig = this.createGraphConfig();
    /*this.time = {};*/
    this.graphData = GraphStore.getAllData();
    this.graphData = this.graphData.map((i) => {
      /*this.time[Date.parse(i[0])] = i[0];*/
      return [Date.parse(i[0]), i[1]]
    });
  }

  createGraphConfig() {
    let self = this;
    return {
      title: "Pressure Transient(s)",
      xlabel: "Time",
      ylabel: "Pressure (meters)",
      labels: [
        "Date",
        "Tampines Ave10 (Stn 40)"
      ],
      axes: {
        x: {
          axisLabelFormatter: function (time) {
            let d = new Date(time);
            return d.toTimeString().split(' ')[0] + ':' + d.getMilliseconds();
          },
          valueFormatter: function (time) {
            let d = new Date(time),
              ms = '' + d.getMilliseconds(),
              zeroPad = 3 - ms.length;
            return d.toTimeString().split(' ')[0] + ':' + ((zeroPad > 0 ? new Array(++zeroPad).join('0') : '') + ms);
          }
        },
        y: {
          valueFormatter: function (pressure) {
            return parseFloat(pressure).toFixed(2);
          }
        }
      },
      underlayCallback: function (canvas, area, g) {
        /*http://dygraphs.com/gallery/#g/highlighted-region*/
        let limits = self.getHighlightLimts(7000,11000),
        bottom_left = g.toDomCoords(limits.start, -20),
        top_right = g.toDomCoords(limits.end, +20),
        left = bottom_left[0],
        right = top_right[0];

        canvas.fillStyle = "#FFA000";
        canvas.fillRect(left, area.y, right - left, area.h);
      }
    }
  }
  getHighlightLimts(start,end){
    let graphData = this.graphData;
    return {start:graphData[start][0],end:graphData[end][0]}
  }
  render() {
    return ( 
      <div className = "App">
        <div className = "App-header">
          <h1>{this.title}</h1>
        </div>
        <p className = "App-intro">{this.sectionTitle}</p>
        <div className = "grapMain">
          <Dygraph config = {this.graphConfig} data = {this.graphData}/>
        </div>
      </div>
    );
  }
}

export default App;
