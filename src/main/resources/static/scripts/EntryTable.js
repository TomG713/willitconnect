import React from 'react';
import ReactDOM from 'react-dom'
import FixedDataTable from 'fixed-data-table'
import { Col } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Dimensions from 'react-dimensions';
import $ from 'jquery';


"use strict";

const {Table, Column, Cell} = FixedDataTable;

var TableCell = React.createClass ({
    render: function() {
        const {rowIndex, field, data, ...props} = this.props;

        var connectionStyle = {color: 'gray'};

        if (data[rowIndex]["validHostname"]) {
            connectionStyle = data[rowIndex]["canConnect"] ? {color: 'green'} : {color: 'red'};
        }

        return (
            <Cell style={ connectionStyle } {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
});

var StatusCell = React.createClass ({
    render: function() {
        const {rowIndex, field, data, ...props} = this.props;
        const value = data[rowIndex][field];
        return (
            <Cell {...props}>
                { value ? <span className="mega-octicon octicon-thumbsup"></span> :
                    <span className="mega-octicon octicon-thumbsdown"></span> }
            </Cell>
        );
    }
});

var EntryTable = React.createClass({

    loadServiceDataFromServer: function() {
        $.ajax({
            url: '/serviceresults',
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function (services) {
                this.setState({services: services});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {services: []};
    },

    componentDidMount: function() {
        this.loadServiceDataFromServer();
    },

    render: function() {
        return (
            <Table
                rowsCount={this.state.services.length}
                //rowsCount={fakeData.length}
                rowHeight={50}
                headerHeight={50}
                width={this.props.containerWidth}
                maxHeight={500}>
                <Column
                    header={<Cell>Entry</Cell>}
                    cell={
                     <TableCell
                        data={this.state.services}
                        //data={fakeData}
                        field='entry'
                     />
                    }
                    flexGrow={2}
                    width={10}
                />
                <Column
                    header={<Cell>Can Connect</Cell>}
                    cell={
                        <StatusCell
                            data={this.state.services}
                            //data={fakeData}
                            field='canConnect'
                         />
                    }
                    flexGrow={1}
                    width={2}
                />
            </Table>
        );
    }
});

const EnhancedTable = Dimensions()(EntryTable);

module.exports = EnhancedTable;