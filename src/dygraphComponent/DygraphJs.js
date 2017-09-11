import React, {
  Component
} from 'react';
import Dygraph from 'dygraphs';
import './DygraphCss.css';

class DygraphJs extends Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      config: props.config
    }
  }
  componentDidMount() {
    //renders the graph once the html markup is available in DOM 
    this.state.config.labelsDiv = this.state.config.labelsDiv !== undefined ? this.state.config.labelsDiv : this.refs.dyGraphLegend;
    this.state.config.legend = this.state.config.legend !== undefined ? this.state.config.legend : "always";
    this.state.config.gridLineWidth = this.state.config.gridLineWidth !== undefined ? this.state.config.gridLineWidth : 0.1;
    this.state.config.connectSeparatedPoints = this.state.config.connectSeparatedPoints !== undefined ? this.state.config.connectSeparatedPoints : true;
    this.state.config.axes.x.axisLabelFontSize = this.state.config.axes.x.axisLabelFontSize !== undefined ? this.state.config.axes.x.axisLabelFontSize : 12;
    this.state.config.animatedZooms = this.state.config.animatedZooms !== undefined ? this.state.config.animatedZooms : true;
    this.state.config.height = this.state.config.height !== undefined ? this.state.config.height : 400;
    
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

export default DygraphJs;
