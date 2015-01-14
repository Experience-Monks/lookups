module.exports = lookup;

function lookup() {

  if( arguments.length % 2 != 0 ) {

    throw new Error( 'Incorrect key value amount. You should pass in arguments as key, value, key, value, ...' );
  }

  this._dataStr   = {}; // structure for strings
  this._dataNum   = {}; // structure for numbers
  this._dataOther = []; // structure for everything else

  for( var i = 0, len = arguments.length; i < len; i += 2 ) {

    this.set( arguments[ i ], arguments[ i + 1 ] );
  }
}
 
lookup.prototype = {
  set: function( key, value ) {

    var keyType = typeof key;

    if( keyType === "string" ) {

      this._dataStr[ key ] = value;
    }
    else if( keyType === "number" ) {

      this._dataNum[ key ] = value;
    }
    else {

      var i = getIdx( this, key );

      i = i == -1 ? this._dataOther.length : i;

      this._dataOther[ i ]     = key;
      this._dataOther[ i + 1 ] = value;

      return value;
    }
  },

  remove: function( key ) {

    var keyType = typeof key;

    if( keyType === "string" ) {

      delete this._dataStr[ key ];
    }
    else if( keyType === "number" ) {

      delete this._dataNum[ key ];
    }
    else {

      var i = getIdx( this, key );

      if( i != -1 ) {

        this._dataOther.splice( i, 2 );
      }
    }
  },

  get: function( key ) {

    var keyType = typeof key;

    if( keyType === "string" ) {

      return this._dataStr[ key ];
    }
    else if( keyType === "number" ) {

      return this._dataNum[ key ];
    }
    else {

      var i = getIdx( this, key )

      if( i != -1 ) {

        return this._dataOther[ i + 1 ];
      }
      else {

        return undefined;
      }
    }
  }
};


function getIdx( lookup, key ) {

  var rVal = -1;

  for( var i = 0, len = lookup._dataOther.length; i < len; i += 2 ) {

    if( lookup._dataOther[ i ] === key ) {

      rVal = i;
      break;
    }
  }

  return rVal;
}