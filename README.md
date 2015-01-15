# lookups

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A datastructure which allows you to use any Javascript value as a key. Keys can be Objects, Functions, Numbers, Strings.

## Usage

[![NPM](https://nodei.co/npm/lookups.png)](https://www.npmjs.com/package/lookups)

### Example:
```javascript
var lookups = require( 'lookups' );

var keyObject = { 'something': 'someValue' };
var keyFunction = function() {};
var keyString = 'something';
var keyNumber = 123;
var keyFunction2 = function() {};

var collection = new lookups( 
  
  keyObject, true,
  keyFunction, 123,
  keyString, {},
  keyNumber, 'hell world'
);

collection.set( keyFunction2, 'something new' ); // will return 'something new'
collection.get( keyObject ); // will return the object { 'something': 'someValue' }
collection.remove( keyString ); // will delete and return 'something'
```

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/lookups/blob/master/LICENSE.md) for details.
