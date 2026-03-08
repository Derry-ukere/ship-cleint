'use strict';
var Bitcore = require('bitcore-lib');
var QRCode = require('react-qr');
var React = require('react');

var BitcoinQRCode = React.createClass({
    render: function render() {
        if(!this.props.address) {
            return React.createElement('div');
        }
        
        var uri = new Bitcore.URI({
            address: this.props.address,
            amount: this.props.amount,
            message: this.props.message,
            label: this.props.label
        });
        
        return React.createElement(
            'a',
            {
                href: uri.toString(),
                target: '_blank'
            },
            React.createElement(
                QRCode, {
                    text: uri.toString()
                }
            )
        );
    }
});

module.exports = BitcoinQRCode;
