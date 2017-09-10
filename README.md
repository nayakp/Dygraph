Add the folder 'Dygraph\src\dygraphComponent' in ur application.
In App.js import the 'DygraphJs.js'
To render the grap, call the DygraphJs component in ur jsx and pass configuartion and data as props to it. Eg:<Dygraph config={this.graphConfig} data={this.graphData}/>
