var Bitcore = require('bitcore-lib')
var QRCode = require('react-qr')
var React = require('react')

var BitcoinQRCode = React.createClass({
    render: function () {
        if (!this.props.address) {
            return (<div className='react-bitcoin-qr react-bitcoin-qr-no-address'></div>)
        }
        
        var uri = new Bitcore.URI({
            address: this.props.address,
            amount: this.props.amount,
            message: this.props.message,
            label: this.props.label
        })
        
        return (<div className='react-bitcoin-qr'><a href={uri.toString()} target='_blank'><QRCode text={uri.toString()} /></a></div>)
    }
})

module.exports = BitcoinQRCode
