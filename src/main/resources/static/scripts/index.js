require('expose?$!expose?jQuery!jquery');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('fixed-data-table/dist/fixed-data-table.min.css');

import HeaderBar from './HeaderBar';
import EnhancedTable from './EntryTable';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { Col } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import { Container } from 'react-bootstrap';
import { Input } from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';

"use strict";

var Entry = React.createClass({
    getInitialState: function () {
        return {status: []};
    },
    componentWillMount: function () {
        var path;
        if (this.props.proxyHost && this.props.proxyPort) {
            path = '/willitconnectproxy?host=' + this.props.host + '&port=' + this.props.port + '&proxyHost=' + this.props.proxyHost + '&proxyPort=' + this.props.proxyPort;
        }
        else {
            path = '/willitconnect?host=' + this.props.host + '&port=' + this.props.port;
        }
        $.get(path, function (status) {
            this.setState({status: status});
        }.bind(this));
    },
    render: function () {

        var connectionStyle = this.state.status.indexOf("cannot") > -1 ? {color: 'red'} : {color: 'green'};

        return (
            <div style={ connectionStyle }>
                <h3 className="entry">
                    {this.props.host} : {this.props.port}
                </h3>
            </div>
        );
    }
});

var EntryBox = React.createClass({
    handleEntrySubmit: function (entry) {
        var entries = this.state.data;
        var newEntries = entries.concat([entry]);
        this.setState({data: newEntries});
    },
    getInitialState: function () {
        return {data: []};
    },
    render: function () {

        var bodyStyle = { 'padding' : 75};

        return (
            <Grid>
                <HeaderBar />
                <Row style={ bodyStyle }>
                        <EntryList data={this.state.data}/>
                        <EntryForm onEntrySubmit={this.handleEntrySubmit}/>
                        <h5> Bound Services </h5>
                        <EnhancedTable />
                </Row>
            </Grid>
        );
    }
});

var EntryList = React.createClass({
    render: function () {
        var entryNodes = this.props.data.map(function (entry, index) {
            return (
                <Entry host={entry.host} port={entry.port} status={entry.status} proxyHost={entry.proxyHost}
                       proxyPort={entry.proxyPort} key={index}/>
            );
        });
        return (
            <div className="entryList">
                {entryNodes}
            </div>
        );
    }
});

var EntryForm = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var host = this.refs.host.getValue();
        var port = this.refs.port.getValue();


        if (!port || !host) {
            return;
        }

        var proxyHost = this.refs.proxyHost.getValue();
        var proxyPort = this.refs.proxyPort.getValue();

        this.props.onEntrySubmit({host: host, port: port, proxyHost: proxyHost, proxyPort: proxyPort});
    },
    render: function () {
        return (
            <form className="entryForm" onSubmit={this.handleSubmit}>
                <Row>
                    <Col xs={4} xsOffset={1} bsSize="large">
                        <Input type="text" placeholder="Host" ref="host"/>
                    </Col>
                    <Col xs={4}>
                        <Input type="number" placeholder="Port" ref="port"/>
                    </Col>
                    <Col xs={3}>
                        <ButtonInput type="submit" value="Check"/>
                    </Col>
                </Row>

                <Row>
                    <Col  xs={4} xsOffset={1} bsSize="large">
                        <Input type="text" placeholder="Proxy Host (optional)" ref="proxyHost"/>
                    </Col>
                    <Col xs={4}>
                        <Input type="number" placeholder="Proxy Port (optional)" ref="proxyPort"/>
                    </Col>
                    <Col xs={3}>
                        <Input type="checkbox" label="Use Proxy" ref="proxyBox" />
                    </Col>
                </Row>
            </form>
        );
    }
});

ReactDOM.render(
    <EntryBox />,
    document.getElementById('content')
);
