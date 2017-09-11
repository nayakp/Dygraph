import React, {Component} from 'react';
import '../css/App.css';
import Dygraph from '../components/dygraph/Graph'
import Constants from '../constants/constants';
import graphConfig1 from '../store/graphConfig1';
import graphConfig2 from '../store/graphConfig2';
import GraphStore1 from '../store/graphStore';
import GraphStore2 from '../store/graphStore2';

class App extends Component {
  constructor() {
    super();
    let self = this;
    this.title = Constants.pageTitle;
    this.sectionTitle = Constants.sectionTitle;
    this.config1 = graphConfig1.getConfig();
    this.config2 = graphConfig2.getConfig();
    this.data1 = GraphStore1.getAllData();
    this.data2 = GraphStore2.getAllData();
  }

  render() {
    return ( 
      <div className = "App">
        <div className = "App-header">
          <h1>{this.title}</h1>
        </div>
        <p className = "App-intro">{this.sectionTitle}</p>
        <div className = "grapMain">
          <Dygraph config={this.config1} data={this.data1}/>
        </div>
        <div className = "grapMain">
          <Dygraph config={this.config2} data={this.data2}/>
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
    --dygraph
      --DygraphCss.css
      --Graph.js
  --constants
      constants.json
  --css
    --App.css
  --js
    --App.js
  --store
    --graphStore.js
    --graphStore2.js
    --graphConfig1.js
    --graphConfig2.js
  --test
    --App.test.js
-index.css
-index.js
*/

/*
css
.grapMain{
  margin:50px auto 50px 50px;
}
.dyGraphLegend{
  margin:30px;
}
.dygraph-xlabel{
  text-align: center;
}
.dygraph-ylabel{
  transform: rotate(-90deg);
    text-align: center;
}
*/

/*
Create Graph.js
import React, {Component} from 'react';
import Dygraph from 'dygraphs';
import './DygraphCss.css';

class Graph extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      config: props.config
    }
    this.state.config.legend = this.state.config.legend !== undefined ? this.state.config.legend : "always";
    this.state.config.gridLineWidth = this.state.config.gridLineWidth !== undefined ? this.state.config.gridLineWidth : 0.1;
    this.state.config.connectSeparatedPoints = this.state.config.connectSeparatedPoints !== undefined ? this.state.config.connectSeparatedPoints : true;
    this.state.config.axes.x.axisLabelFontSize = this.state.config.axes.x.axisLabelFontSize !== undefined ? this.state.config.axes.x.axisLabelFontSize : 12;
    this.state.config.animatedZooms = this.state.config.animatedZooms !== undefined ? this.state.config.animatedZooms : true;
    this.state.config.height = this.state.config.height !== undefined ? this.state.config.height : 400;

    this.state.data = this.state.data.map((i) => {
      return [Date.parse(i[0]), i[1]]
    });
  }
  componentDidMount() {
    this.state.config.labelsDiv = this.state.config.labelsDiv !== undefined ? this.state.config.labelsDiv : this.refs.dyGraphLegend;
    new Dygraph(
      this.refs.dygraph,
      this.state.data,
      this.state.config
    );
  }
  render() {
    return ( <
      div className = "dygraphContainer" >
      <
      div className = "dygraph"
      ref = "dygraph" > < /div> <
      div className = "dyGraphLegend"
      ref = "dyGraphLegend" > < /div></div >
    );
  }
}
export default Graph;
*/

/*
create graphConfig2.js
import Constants from '../constants/constants';
import GraphStore from '../store/graphStore2';
class Config1 {
  constructor(){
    let self = this;
    this.graphData = GraphStore.getAllData();
      this.graphData = this.graphData.map((i) => {
        return [Date.parse(i[0]), i[1]]
      });
    this.config = {
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
        underlayCallback: (canvas, area, g) => {
          let limits = self.getHighlightLimts(GraphStore.start,GraphStore.end),
          bottom_left = g.toDomCoords(limits.start, -20),
          top_right = g.toDomCoords(limits.end, +20),
          left = bottom_left[0],
          right = top_right[0];
          console.log(limits)

          canvas.fillStyle = "#000";
          canvas.fillRect(left, area.y, right - left, area.h);
        }
      }
  }
  getConfig(){
    return this.config;
  }
  getHighlightLimts(start,end){
    let graphData = this.graphData;
    return {start:graphData[start][0],end:graphData[end][0]}
  }
}
const config = new Config1;
export default config;
*/

/*
create graphConfig1.js
import Constants from '../constants/constants';
import GraphStore from '../store/graphStore';
class Config1 {
  constructor(){
    let self = this;
    this.graphData = GraphStore.getAllData();
      this.graphData = this.graphData.map((i) => {
        return [Date.parse(i[0]), i[1]]
      });
    this.config = {
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
        underlayCallback: (canvas, area, g) => {
          let limits = self.getHighlightLimts(GraphStore.start,GraphStore.end),
          bottom_left = g.toDomCoords(limits.start, -20),
          top_right = g.toDomCoords(limits.end, +20),
          left = bottom_left[0],
          right = top_right[0];
          console.log(limits)

          canvas.fillStyle = "#FFA000";
          canvas.fillRect(left, area.y, right - left, area.h);
        }
      }
  }
  getConfig(){
    return this.config;
  }
  getHighlightLimts(start,end){
    let graphData = this.graphData;
    return {start:graphData[start][0],end:graphData[end][0]}
  }
}
const config = new Config1;
export default config;
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
create a graphStore2.js
import {EventEmitter} from "events";
import data from '../../../sample-data2';
class GraphStore{
  constructor(){
    this.graphData = data;
    this.start = 3000;
    this.end = 9000;
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
  "sectionTitle" :"Pressure Transient Details",
  "pageTitle" : "Dygraph Demo",
  "title":"Pressure Transient(s)",
  "xlabel":"Time",
  "ylabel":"Pressure (meters)",
  "labelsx":"Date",
  "labelsy":"Tampines Ave10 (Stn 40)"
}
*/
