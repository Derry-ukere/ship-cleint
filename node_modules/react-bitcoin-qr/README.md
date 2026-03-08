# react-bitcoin-qr

React.js Bitcoin QR code component.

( Really just a bitcoin convenience wrapper for JP Richardson's wonderful [react-qr](https://github.com/jprichardson/react-qr) package )

## Installation

    npm i --save react-bitcoin-qr


## Usage (in React app)

```js
var BitcoinQRCode = require('react-bitcoin-qr')

var component = React.createClass({
  render: function() {
    return <BitcoinQRCode address='1PEoUKNxTZsc5rFSQvQjeTVwDE9vEDCRWm' amount='100000' message='One hundred thousand satoshi (1 mBTC) donation to BitGive' />
  }
})
```

## Standalone example

See [example/example.jsx](example/example.jsx) for a working example. 

To test this standalone example (local server), run `example/server.js` :

```
$ npm install
$ node example/server.js
Browserifying the example code... (confirm ./bundle.js is produced)
Bundling...
Bundling finished
Simple-Server listening to http://:::3000/ with directory /home/user/projs/git/react-bitcoin-qr/example
React Bitcoin QR demo page is hosted at http://localhost:3000/index.html
```

## License

MIT
