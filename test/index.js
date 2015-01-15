var test = require( 'tape' );
var lookups = require( './..' );

var hash;
var keyNumber = 10;
var keyString = 'a key';
var keyObject = { something: true };
var keyFunction = function() {};


test( 'creating', function( t ) {

  t.plan( 3 );

  var errMsg;

  hash = lookups( keyNumber, keyNumber,
                  keyString, keyString,
                  keyObject, keyObject, 
                  keyFunction, keyFunction );

  t.ok( hash, 'created using function call' );
  t.ok( new lookups( keyNumber, keyNumber,
                     keyString, keyString,
                     keyObject, keyObject, 
                     keyObject, keyFunction ), 'created using new' );
  try {

    lookups( 'test' );
  } catch( e ) {

    errMsg = e.message;
  }
  
  t.equal( errMsg, 'Incorrect key value amount. You should pass in arguments as key, value, key, value, ...', 'Through an error' );
});

test( 'get', function( t ) {

  t.plan( 4 );

  t.equal( hash.get( keyObject ), keyObject, 'received value through key object' );
  t.equal( hash.get( keyString ), keyString, 'received value through key string' );
  t.equal( hash.get( keyNumber ), keyNumber, 'received value through key number' );
  t.equal( hash.get( keyFunction ), keyFunction, 'received value through key number' );
});

test( 'set', function( t ) {

  t.plan( 10 );

  t.equal( hash.set( keyObject, 1 ), 1, 'set value through key object' );
  t.equal( hash.set( keyString, 12 ), 12, 'set value through key string' );
  t.equal( hash.set( keyNumber, 123 ), 123, 'set value through key number' );
  t.equal( hash.set( keyFunction, 1234 ), 1234, 'set value through key number' );
  t.equal( hash.set( 'newVal', 'ok' ), 'ok', 'set value through key number' );

  t.equal( hash.get( keyObject ), 1, 'after set key object returns value' );
  t.equal( hash.get( keyString ), 12, 'after set key string returns value' );
  t.equal( hash.get( keyNumber ), 123, 'after set key number returns value' );
  t.equal( hash.get( keyFunction ), 1234, 'after set key function returns value' );
  t.equal( hash.get( 'newVal' ), 'ok', 'after set key "newVal" returns value' );
});

test( 'remove', function( t ) {

  t.plan( 11 );

  t.equal( hash.remove( keyObject ), 1, 'on remove key object returns value' );
  t.equal( hash.remove( keyObject ), undefined, 'removed value through key object' );
  t.equal( hash.get( keyString ), 12, 'still had key string' );
  t.equal( hash.get( keyNumber ), 123, 'still had key number' );
  t.equal( hash.get( keyFunction ), 1234, 'still had key number' );
  t.equal( hash.remove( keyString ), 12, 'on remove key string returns value' );
  t.equal( hash.remove( keyString ), undefined, 'removed value through key string' );
  t.equal( hash.remove( keyNumber ), 123, 'on remove key number returns value' );
  t.equal( hash.remove( keyNumber ), undefined, 'removed value through key number' );
  t.equal( hash.remove( keyFunction ), 1234, 'on remove key function returns value' );
  t.equal( hash.remove( keyFunction ), undefined, 'removed value through key function' );
});