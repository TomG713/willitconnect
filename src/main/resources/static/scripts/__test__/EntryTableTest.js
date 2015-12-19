jest.dontMock('../EntryTable');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const EntryTable = require('../EntryTable');

//http://jasmine.github.io/2.0/introduction.html
//

describe('EntryTable', () => {

    it('has an empty table', () => {

        var enhancedDataTable = TestUtils.renderIntoDocument(<EntryTable />);
        var table = TestUtils.scryRenderedDOMComponentsWithClass(enhancedDataTable, 'fixedDataTableLayout_main');

        expect(table).toBeDefined();
    });

    it('displays entry url and connection status', () => {
        var enhancedDataTable = TestUtils.renderIntoDocument(<EntryTable />);
        var table = TestUtils.scryRenderedDOMComponentsWithClass(enhancedDataTable, 'fixedDataTableLayout_main');


    });
});

//var fakeData = [
//    {
//        "lastChecked": "1444491695787",
//        "entry": "172.20.247.12:34424",
//        "canConnect": true,
//        "validHostname": true
//    },
//    {
//        "lastChecked": 0,
//        "entry": "null:-1",
//        "canConnect": false,
//        "validHostname": false
//    },
//    {
//        "lastChecked": 0,
//        "entry": "willitconnect-com.apps-np.homedepot.com:80",
//        "canConnect": false,
//        "validHostname": false
//    },
//    {
//        "lastChecked": 0,
//        "entry": "null:-1",
//        "canConnect": false,
//        "validHostname": false
//    }
//];