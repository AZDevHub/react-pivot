import React from 'react';
import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import utils from './utils.js';
const PlotlyRenderers = createPlotlyRenderers(Plot);

const SQLStatement = process.argv[2];
const result = utils.getConnection().then((connection) => {
  connection.query(SQLStatement, (err, result) => {
    if (err) throw err;
    return result;
  })
})
const data = result;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <PivotTableUI
                data={data}
                onChange={s => this.setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...this.state}
            />
        );
    }
}

ReactDOM.render(<App />, document.body);