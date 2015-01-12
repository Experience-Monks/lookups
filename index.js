module.exports = function() {

  var data = Array.prototype.slice.call( arguments ),
      getIdx = function( key ) {

        var rVal = -1;

        for( var i = 0, len = data.length; i < len; i += 2 ) {

          if( data[ i ] === key ) {

            rVal = i;
            break;
          }
        }

        return rVal;
      };

  if( arguments.length % 2 != 0 ) {

    throw new Error( 'Incorrect key value amount. You should pass in arguments as key, value, key, value, ...' );
  }

  return {

    set: function( key, value ) {

      var i = getIdx( key );

      i = i == -1 ? data.length : i;

      data[ i ] = key;
      data[ i + 1 ] = value;

      return value;
    },

    remove: function( key ) {

      var i = getIdx( key ),
          rVal = undefined;

      if( i != -1 ) {

        data.splice( i, 2 );
      }

      return rVal;
    },

    get: function( key ) {

      var i = getIdx( key ),
          rVal = undefined;

      if( i != -1 ) {

        rVal = data[ i + 1 ];
      }

      return rVal;
    } 
  };
};