import './soundFiles'
import './canvasEvents'
import './code'
import './instrumentData'
import './keyboard'
import './mapping'
import './midi'
import './scales'
import './soundFiles'
import './ui'

let octavekeyboard = new Image();
let _indices = [];

////////////////////////////////////////////////
//
// Following for interactive
//
let selectedIndex = -1;
let fromDest = false;
let fromSource = false;
let moveMouseX = 0;
let moveMouseY = 0;
let oppositeX = 0;
let oppositeY = 0;
let selectedColor = "#ff3333";
let sourceIndex = 0;

function pushMappingIndices()
{
	
	_y = keyboardYOffset;
	
	_indices = [];
	for( let i=0; i<indices.length; i++ )
	{
		_indices.push( indices[i] );
	}
}

function drawMapper()
{
	pushMappingIndices();
	
	let canvas = document.getElementById("mappingCanvas");
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawDivisions( canvas, ctx );
	octavekeyboard.src = "images/octavekeyboard.png";
	octavekeyboard.onload = function()
	{
		drawDestination( canvas, ctx );
		drawCurrentMapping( canvas, ctx );
	}
	
}

function drawMappingLine( ctx, i )
{
	let index = _indices[i];
	
	if( index == -1 )
	{
		return;
	}
	
	let _dx = getKeyXForMapping( i );// getDestinationX( i );
	let _sx = sx + index * w + w / 2;
	let _dy = keyboardYOffset/*_y*/ + 15;
	let _sy = y + h - 5;

	let color = "#11ff11";
	if( i == selectedIndex )
	{
		color = selectedColor;
	}

	drawLine( ctx, _dx, _dy, _sx, _sy, color );
}

function drawLine( ctx, _dx, _dy, _sx, _sy, color )
{
	ctx.beginPath();
	ctx.moveTo( _dx, _dy );
	ctx.lineTo( _sx, _sy );
		
	ctx.strokeStyle = color;
	ctx.lineWidth = 1;
	ctx.stroke();
		
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.ellipse(_dx, _dy, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
	ctx.fill();
		
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.ellipse(_sx, _sy, 5, 5, Math.PI / 4, 0, 2 * Math.PI);
	ctx.fill();		
}

function drawCurrentMapping( canvas, ctx )
{
	for( let i=0; i<13; i++ )
	{
		drawMappingLine( ctx, i );
	}
}

function getIntegerFrequency( freq )
{
	let _freq = freq.toString();
	let index = _freq.indexOf( "." );
	if( index >= 0 )
	{
		_freq = _freq.substring( 0, index );
	}
	return _freq.replace(",","");
}

let w = 28;
let h = 30;
let x;
let y = 30;
let sx;

function drawDivisions( canvas, ctx )
{
	
	sx = x = ( canvas.width - w * divisions ) / 2;
	if( x < 0 )
	{
		x = 0;
	}
	
	for( let i=0; i<divisions+1; i++ )
	{
		ctx.beginPath();
		ctx.moveTo( x, y );
		ctx.lineTo( x + w, y );
		ctx.lineTo( x + w, y + h );
		ctx.lineTo( x, y + h );
		ctx.lineTo( x, y );
		
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;
		ctx.stroke();

		ctx.fillStyle = "#000000";
		ctx.font = "10px Arial";
		ctx.textAlign = "center";
		ctx.fillText(getIntegerFrequency( scale[i] ), x + w / 2, y + h / 2 + 3);

		x += w;		
	}
	
	ctx.fillStyle = "#000000";
	ctx.font = "25px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Generated Scale", canvas.width / 2, 22);
	
}

let _w = 195;
let _h = 138;
let _x = 0;
let _y = 120;

function drawDestination( canvas, ctx )
{
	_x = ( canvas.width - _w ) / 2;
	ctx.drawImage( octavekeyboard, _x, _y, _w, _h );
	ctx.fillStyle = "#000000";
	ctx.font = "25px Arial";
	ctx.textAlign = "center";
	ctx.fillText("Destination", canvas.width / 2, _y + _h + 23);
}

const blacks = [18,1,42,3,90,6,114,8,138,10];
const whites = [0,-1,1,-1,2,3,-1,4,-1,5,-1,6,7,8];
const whiteIndexAdjustment = [0,2,4,5,7,9,11,12];

function getDestinationX( index )
{
	for( let i=0; i<blacks.length; i+=2 )
	{
		if( index == blacks[i+1] )
		{
			return _x + blacks[i] + 8;
		}
	}
	let __w = ( _w / 8 );
	return whites[index] * __w + __w / 2 + _x;
}

function getSourceIndex(mx,my)
{
	if( mx < sx )
	{
		return -1;
	}
	if( mx > x )
	{
		return -1;
	}
	if( my < y )
	{
		return -1;
	}
	if( my > y + h )
	{
		return -1;
	}

	return Math.floor( ( mx - sx ) / w );
}

function getDestinationIndex(mx,my)
{
	if( mx < _x )
	{
		return -1;
	}
	if( mx > _x + _w )
	{
		return -1;
	}
	if( my < _y )
	{
		return -1;
	}
	if( my > _y + _h )
	{
		return -1;
	}
	
	const xo = mx - _x;
	const yo = my - _y;
	
	if( yo <= 98 )
	{
		for( let i=0; i<blacks.length; i+=2 )
		{
			if( xo >= blacks[i] && xo <= blacks[i] + 17 )
			{
				return blacks[i+1];
			}
		}
	}
	
	return whiteIndexAdjustment[Math.floor( xo / ( _w / 8 ) )];
}

function handleMappingMouseMove(mx,my)
{
	
	if( selectedIndex >= 0 && fromDest )
	{
//		console.log( "1" );
		doDraw();
		
		moveMouseX = mx;
		moveMouseY = my;
		
		let canvas = document.getElementById("demoCanvas");
		let ctx = canvas.getContext('2d');

//		console.log( "mx:" + oppositeX + " my:" + oppositeY );
		
		drawLine( ctx,  moveMouseX, moveMouseY, oppositeX, oppositeY, selectedColor );
	}
	else if( selectedIndex >= 0 && fromSource )
	{
//		console.log( "2" );
		doDraw();
		
		oppositeX = mx;
		oppositeY = my;
		
		let canvas = document.getElementById("demoCanvas");
		let ctx = canvas.getContext('2d');
		
//		console.log( "mx:" + moveMouseX + " my:" + moveMouseY );
//		console.log( "mx:" + oppositeX + " my:" + oppositeY );
		
		drawLine( ctx,  moveMouseX, moveMouseY, oppositeX, oppositeY, selectedColor );
	}
	
}

let isMapping = 0;

function handleMappingMouseDown(mx,my)
{
//	let index = getDestinationIndex(mx,my);
//	if( index >= 0 )
//	{
//		isMapping = 1;
//		
//		fromSource = false;
//		fromDest = true;
//		
//		selectedIndex = index;
//
//		let canvas = document.getElementById("mappingCanvas");
//		let ctx = canvas.getContext('2d');
//
//		sourceIndex = _indices[index];
//		oldIndex = index;
//		oldIndexValue = _indices[index];
//
//		doDraw();
//		
//		moveMouseX = mx;
//		moveMouseY = my;
//		oppositeX = getKeyXForMapping( index );//mx;
//		oppositeY = my;
//		
//		drawLine( ctx,  moveMouseX, moveMouseY, oppositeX, oppositeY, selectedColor );
//		_indices[index] = -1;
//		
//		return;
//	}
	
	index = getSourceIndex( mx, my );
	if( index >= 0 && indexIsActive( index ) != -1 )
	{
		isMapping = 1;
		
		fromSource = true;
		fromDest = false;
		
		selectedIndex = indexIsActive( index );
		oldIndex = index;
		oldIndexValue = _indices[index];
		
		doDraw();
		
		moveMouseX = getKeyXForMapping( selectedIndex );//_indices[index] );//index );//getDestinationX( selectedIndex );
		moveMouseY = _y + 15;
		oppositeX = mx;
		oppositeY = my;

//		console.log( "mx:" + moveMouseX + " my:" + moveMouseY );
//		console.log( "mx:" + oppositeX + " my:" + oppositeY );

		let canvas = document.getElementById("mappingCanvas");
		let ctx = canvas.getContext('2d');
		
		drawLine( ctx,  moveMouseX, moveMouseY, oppositeX, oppositeY, selectedColor );
		_indices[selectedIndex] = -1;
	}
}

function indexIsActive( index )
{
	for( let i=0; i<_indices.length; i++ )
	{
		if( _indices[i] == index )
		{
			return i;
		}
	}
	return -1;
}

function handleMappingMouseUp(mx,my)
{
	
	isMapping = 0;
	
	if( selectedIndex != -1 && fromDest )
	{
		if( sourceIndex == -1 )
		{
			let index = getSourceIndex( mx, my );
			_indices[selectedIndex] = index;
			selectedIndex = -1;
		}
		else
		{
			let index = getDestinationIndex( mx, my );
			if( index >= 0 && _indices[index] == -1 )
			{
				_indices[index] = sourceIndex;
			}
			index = selectedIndex;
			selectedIndex = -1;
		}
		
		doDraw();
	}
	else if( selectedIndex != -1 && fromSource )
	{
		let index = getSourceIndex( mx, my );
		if( index >= 0 && indexIsActive( index ) == -1 )
		{
			_indices[selectedIndex] = index;
			doMappingApply();			
		}
		else
		{
			_indices[oldIndex] = oldIndexValue;
//			indices[oldIndex] = oldIndexValue;
		}
		selectedIndex = -1;
		
		doDraw();
	}
	
}

function doMappingReset()
{
	sslectedIndex = -1;
	_indices = [];
	for( let i=0; i<indices.length; i++ )
	{
		_indices.push( indices[i] );
	}

	doDraw();
}

function doDraw()
{
	let canvas = document.getElementById("demoCanvas");
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawDivisions( canvas, ctx );
	_drawKeyboard( canvas, ctx, _numKeysToDraw, false );
}

function handleKey( key )
{
	key = key.toUpperCase( key );
	
	if( key == 'D' && selectedIndex >= 0 )
	{
		if( fromDest )
		{
			_indices[selectedIndex] = -1;
			selectedIndex = -1;
			doDraw();
		}
		return;
	}
	
	if( key == 'R' )
	{
		doMappingReset();
		return;
	}

}
