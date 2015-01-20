function pad (str, chr, n) {
    str = str + "";
    while ( str.length < n ) {
        str = chr + str;
    }
    return str
}

function dd (msg) {
    console.log( msg )
}

function dpol (a) {
    var l1 = [];
    var l2 = [];
    for ( var i = 0; i < a.length; i++ ) {
        var x = a[i];
        if ( x == 1 && i > 0 ) {
            x = '';
        }

        if ( i == 0 ) {
            l1[ i ] = '';
            l2[ i ] = pad(x, ' ', 4);
            continue;
        }
        if ( i == 1 ) {
            l1[ i ] = pad( ' ', ' ', 6 )
        }
        else {
            l1[ i ] = pad(i, ' ', 6);
        }
        l2[ i ] = pad(x, ' ', 4) + 'x';
    }

    l1.reverse();
    l2.reverse();

    l1 = l1.join( '   ' );
    l2 = l2.join( ' + ' );
    dd( "\n" + l1 + "\n" + l2 );
}

function pol_clean (r) {
    while ( r[r.length-1] == 0 ) {
        r.pop(r.length-1);
    }
}

function pol_add (a, b) {
    var r = [];
    var mx = Math.max( a.length, b.length );

    for ( var i = 0; i < mx; i++ ) {
        r[ i ] = (a[i] || 0) + (b[i] || 0)
    }
    pol_clean(r);
    return r;
}

function pol_mul (a, b) {

    var r = [];

    for ( var i = 0; i < a.length + b.length; i++ ) {
        r[i] = 0;
    }

    for ( var i = 0; i < a.length; i++ ) {
        for ( var j = 0; j < b.length; j++ ) {
            r[i+j] += a[i] * b[j];
        }
    }

    pol_clean(r);
    return r;
}

function pol_mul_n (a, n) {
    var r = [];
    for ( var i = 0; i < a.length; i++ ) {
        r[ i ] = a[ i ] * n;
    }
    pol_clean(r);
    return r;
}

function pol_eval (a, x) {
    var r = 0;
    for ( var i = 0; i < a.length; i++ ) {
        r += a[i] * Math.pow( x, i );
    }
    return r;
}

function lagrange_elt (points, n) {
    // n-th lagrange polynomial element

    var r = [1];
    for ( var i = 0; i < points.length; i++ ) {
        if ( i == n ) {
            continue;
        }
        var p = points[i]
        var x = p[0];
        r = pol_mul( r, [ -x, 1 ] );
    }

    var divider = 1;
    for ( var i = 0; i < points.length; i++ ) {
        if ( i == n ) {
            continue;
        }
        var p = points[i]
        var x = p[0];
        divider *= ( points[n][0] - x );
    }

    r = pol_mul_n( r, 1.0/divider );
    pol_clean( r );
    return r;
}

function lagrange_pol (points) {
    // find the polynomial of x that its value at x[i] is y[i]
    var r = [0];
    for ( var i = 0; i < points.length; i++ ) {
        var elt = lagrange_elt( points, i );

        elt = pol_mul_n( elt, points[i][1] );
        r = pol_add( r, elt );
    }
    pol_clean( r );
    return r;
}

function lagrange_pol_seq (numbers) {
    var points = [];
    for ( var i = 0; i < numbers.length; i++ ) {
        points[ i ] = [ i, numbers[ i ] ];
    }
    return lagrange_pol( points );
}

// var points = [ [0, 1], [1, 2], [2, 3], [3, 4] ];
// var points = [ [0, 2], [1, 9], [2, 16], [3, 23] ];
// var points = [ [0, 2], [1, 4], [2, 12], [3, 48] ];
// var points = [ [1, 1], [2, 3], [4, 9], [8, 27] ];
// r = lagrange_pol( points );
// dpol( r );
// var v = pol_eval( r, 4 );
// v = Math.round( v )
// dd( v );

// var numbers = [1, 3, 9, 27, 81, 243];
var numbers = [1, 2, 4, 7];

r = lagrange_pol_seq( numbers );
dpol( r );
var v = pol_eval( r, numbers.length );
v = Math.round( v )
dd( v );
