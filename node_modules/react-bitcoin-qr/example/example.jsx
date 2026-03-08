var BitcoinQRCode = require('../index.js')
var ReactDOM = require('react-dom')
var React = require('react')

ReactDOM.render(

  <BitcoinQRCode address='1PEoUKNxTZsc5rFSQvQjeTVwDE9vEDCRWm' amount='100000' message='One hundred thousand satoshi (1 mBTC) donation to BitGive' />,

  document.getElementById("app")

)
