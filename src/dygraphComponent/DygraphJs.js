import React, {Component} from 'react';
import Dygraph from 'dygraphs';
import './DygraphCss.css';

class DygraphJs extends Component {
  constructor(props){
    super();
    this.state = {
      data:props.data,
      config:props.config
    }
  }
  componentDidMount() {
    //renders the graph once the html markup is available in DOM 
    this.props.config.labelsDiv = this.props.config.labelsDiv!==undefined?this.props.config.labelsDiv:this.refs.dyGraphLegend;
    this.props.config.legend = this.props.config.legend!==undefined?this.props.config.legend:"always";
    
    new Dygraph(
      this.refs.dygraph,
      this.state.data,
      this.state.config
    );
  }

  render () {
    return (
      <div className="dygraphContainer">
        <div className="dygraph" ref="dygraph"></div>
        <div className="dyGraphLegend" ref="dyGraphLegend"></div>
      </div>
      );
  }
}

export default DygraphJs;