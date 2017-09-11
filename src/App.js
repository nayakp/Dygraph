import React, {Component} from 'react';
import '../css/App.css';
import Dygraph from '../components/dygraphComponent/DygraphJs';
import GraphStore from '../store/graphStore';
import Constants from '../constants/constants';

class App extends Component {
  constructor() {
    super();
    let self = this;
    this.title = 'Dygraph Demo';
    this.sectionTitle = 'Pressure Transient Details';    this.graphConfig = this.createGraphConfig();
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
      title: Constants.title,
      xlabel: Constants.xlabel,
      ylabel: Constants.ylabel,
      labels: [
        Constants.labelsx,
        Constants.labelsy
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
        let limits = self.getHighlightLimts(GraphStore.start,GraphStore.end),
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
/*
folder structure
C:\Nayak\test\Dygraph-master\src
-graphApp
  --components
    --dygraphComponent
      --DygraphCss.css
      --DygraphJs.js
  --constants
      constants.json
  --css
    --App.css
  --js
    --App.js
  --store
    --graphStore.js
  --test
    --App.test.js
-index.css
-index.js
*/

/*
create a graphStore.js

import {EventEmitter} from "events";
import data from '../../../sample-data';

class GraphStore{
  constructor(){
    this.graphData = data;
    this.start = 7000;
    this.end = 11000;
  }

  getAllData(){
    return this.graphData;
  }
}

const graphStore = new GraphStore;
export default graphStore;
*/
/*
create a constants.json file

{
  "title":"Pressure Transient(s)",
  "xlabel":"Time",
  "ylabel":"Pressure (meters)",
  "labelsx":"Date",
  "labelsy":"Tampines Ave10 (Stn 40)"
}
*/
