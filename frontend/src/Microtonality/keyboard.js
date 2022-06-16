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

"use strict";

//////////////////////////////////////////////////
//
// keyboard.js
//
// Keyboard drawing and interaction functions.
//
// Originally created: 12-4-2021
//

let keyboardKeyData = [];

// Default to 12 keys.
let _numKeysToDraw = 12;

// Keys to map to notes.
let letters = ["A","W","S","E","D","F","T","G","Y","H","U","J","K","O","L","P",";","'",
		"Z", "3", "X", "4", "C", "V", "5", "B", "6", "N", "7", "M", ",", "8", "." ];

// Key wize values.
const whiteKeyWidth = 60;
const whiteKeyHeight = 200;

// 2-4-2022
const canvasHeight = 300;

const blackKeyWidth = 36;
const blackKeyHeight = 110;

// Width of the entire keyboard.
let keyBoardWidth = 0;

let keyboardYOffset = 90;

// Helper function to get the function for appropriate key type.
function getColor( state, type )
{
	if( type == blackKey )
	{
		return getBlackKeyColor( state );
	}
	return getWhiteKeyColor( state );
}

// This returns the key color for the key type and its state.
function getWhiteKeyColor( state )
{
	if( state == upState )
	{
		return upWhiteKeyColor;
	}
	else if( state == downState || state == mouseDownState )
	{
		return downWhiteKeyColor;
	}
	return hoverWhiteKeyColor;
}

// This returns the key color for the key type and its state.
function getBlackKeyColor( state )
{
	if( state == upState )
	{
		return upBlackKeyColor;
	}
	else if( state == downState || state == mouseDownState )
	{
		return downBlackKeyColor;
	}
	return hoverBlackKeyColor;
}

// Get the maximum height for all keys.
function getMaxY( keyVertexData )
{
	// Start with 0, everything else will be greater.
	let maxy = 0;

	// Loop through each key.
	for( var i=0; i<keyVertexData.length-3; i+=2 )
	{
		// Check to see if we have a larger value.
		if( keyVertexData[i+1] > maxy )
		{
			maxy = keyVertexData[i+1];
		}
	}
	
	// Return the value.
	return maxy;
}

// Get minimum width for all keys.
function getMinX( keyVertexData )
{
	// Start with 10000, everything else will be less.
	let minx = 10000;
	
	// Loop through each key.
	for( var i=0; i<keyVertexData.length-3; i+=2 )
	{
		// Check to see if we have a smaller value.
		if( keyVertexData[i] < minx )
		{
			minx = keyVertexData[i];
		}
	}
	
	// Return the value.
	return minx;
}

// Get maximum width for all keys.
function getMaxX( keyVertexData )
{
	// Start with 0, everything else will be greater.
	let maxx = 0;
	
	// Loop through each key.
	for( var i=0; i<keyVertexData.length-3; i+=2 )
	{
		// Check to see if we have a larger value.
		if( keyVertexData[i] > maxx )
		{
			maxx = keyVertexData[i];
		}
	}
	
	// Return the value.
	return maxx;
}

// This function draws a key.
function drawKey( keyVertexData, type, state, key, ctx, index, drawLine )
{
	// This function begins the draw.
	ctx.beginPath();
	// The starting point.
	ctx.moveTo( keyVertexData[0], keyVertexData[1] );
	
	// Loop through the vertices for this key.
	for( var i=2; i<keyVertexData.length-1; i+=2 )
	{
		ctx.lineTo( keyVertexData[i], keyVertexData[i+1] );
	}

	// In order to draw the text we need minx, maxx, and miny.
	let maxy = getMaxY( keyVertexData );
	let minx = getMinX( keyVertexData );
	let maxx = getMaxX( keyVertexData );
	
	// This is the border color.
	ctx.strokeStyle = "#000000";
	// Width of 1
	ctx.lineWidth = 1;
	// Go ahead and draw the line.
	ctx.stroke();	
	
	// Set the fill color according to the state.
	ctx.fillStyle = getColor( state,type );
	// Go ahead and fill the shape.
	ctx.fill();
	
	// Set the texst size.
	ctx.font = "23px Arial";
	// Center on a point.
	ctx.textAlign = "center";

	// This is x and y for the text.
	let x = minx + ( maxx - minx ) / 2;
	let y = maxy - 15;

	// Text should be opposite, in this case white.
	if( type == blackKey )
	{
		// The text will be white.
		ctx.fillStyle = "white";
	}
	// Text should be opposite, in this case black.
	else
	{
		// The text will be black.
		ctx.fillStyle = "black";
	}
	// Draw the text.
	ctx.fillText( key, x, y );

	if( drawLine && isMapping == 0 )
	{
		drawMappingLine( ctx, index );
	}
}

// This does no drawing. It calls each generate function depending on
//	the key type and saves it.
function setKeyboardData( startX, startY )
{
	// We can start at any x.
	let x = startX;
	
	// We will remenber the width and return the value.
	let w = 0;
	
	// Empty the array in which the keys will be store.
	keyboardKeyData = [];

	// Loop through for each key we want to draw.
	for( let i=0; i<_numKeysToDraw; i++ )
	{
		// Create an array for this key.
		let keyVertexData;
		let type = 0;
		
		// This will let us know what key we are generating.
		let mod = i % 12;

		if( i == _numKeysToDraw - 1 && mod != 4 && mod != 1 && mod != 3 && mod != 6 && mod != 8 && mod != 10  && mod != 2  && mod != 7  && mod != 9 )
		{
			type = whiteKeyNoNotches;
			keyVertexData = generateWhiteKeyNoNotches(x,startY,upState);
			x += whiteKeyWidth;
			w += whiteKeyWidth;
		}
		else if( mod == 0 || mod == 5 )
		{
			type = whiteKeyRightNotch;
			keyVertexData = generateWhiteKeyRightNotch(x,startY,upState);
			x += whiteKeyWidth;
			w += whiteKeyWidth;
		}
		else if( mod == 4 || mod == 11 )
		{
			type = whiteKeyLeftNotch;
			keyVertexData = generateWhiteKeyLeftNotch(x,startY,upState);
			x += whiteKeyWidth;
			w += whiteKeyWidth;
		}
		else if( mod == 2 || mod == 7 || mod == 9 )
		{
			if( i == _numKeysToDraw - 1 )
			{
				type = whiteKeyLeftNotch;
				keyVertexData = generateWhiteKeyLeftNotch(x,startY,upState);
			}
			else
			{
				type = whiteKeyBothNotch;
				keyVertexData = generateWhiteKeyBothNotches(x,startY,upState);
			}
			x += whiteKeyWidth;
			w += whiteKeyWidth;
		}
		else
		{
			type = blackKey;
			keyVertexData = generateBlackKey(x,startY,upState);
		}
		
		// Save the letter and the keyboard vertex array.
		let obj = {type:type,keyVertexData:keyVertexData,key:letters[i],state:upState};
		keyboardKeyData.push( obj );
	}
	
	if( startX == 0 )
	{
		// Save the keyboard width.
		keyBoardWidth = w;
	}
	
	return x;
}

// Wrapper keyboard draw function that creates a context for drawing.
function drawKeyboard( numKeysToDraw )
{
	// Get a context to the canvas.
	let canvas = document.getElementById('demoCanvas');
	let ctx = canvas.getContext('2d');
	_drawKeyboard( canvas, ctx, numKeysToDraw, true );
}

// Draw the entire keyboard.
function _drawKeyboard( canvas, ctx, numKeysToDraw, drawLine )
{

	// Make sure we have some data.
	if( keyboardKeyData === undefined )
	{
		return;
	}

	// Save the number of keys to draw in the global variable.
	_numKeysToDraw = numKeysToDraw;

	// Walk through the members of the array.
	for( let i=0; i<_numKeysToDraw; i++ )
	{
		// Get the data for this key. It only has the vertext data, the type, and the state.
		let _keyboardKeyData = keyboardKeyData[i];
		if( typeof _keyboardKeyData === "undefined" )
		{
			continue;
		}
		if( _keyboardKeyData.keyVertexData.length != 0 )
		{
		//				Vertex data							Type						State
			drawKey( _keyboardKeyData.keyVertexData, _keyboardKeyData.type, _keyboardKeyData.state, _keyboardKeyData.key, ctx, i, drawLine );
		}
	}
	
	drawDivisions(canvas,ctx);
	drawCurrentMapping( canvas, ctx );
}

// This handles a key pressed event.
function keyPressed( key )
{
	// Upper case helps us match.
	key = key.toUpperCase();
	
	// Loop through the keyboard data.
	for( let i=0; i<keyboardKeyData.length; i++ )
	{
		// Get the keyboard data.
		let keyboardData = keyboardKeyData[i];
		
		// Check the key against the ASCII key for this key.
		if( key == keyboardData.key )
		{
			// Set to down.
			keyboardData.state = downState;

			// Need a device context.
			let ctx = document.getElementById('demoCanvas').getContext('2d');
			// Call the draw key function.
			drawKey( keyboardData.keyVertexData, keyboardData.type, keyboardData.state, keyboardData.key, ctx, i, true );
			// We are done. Return the index.
			return i;
		}			
	}
	
	// No keypress found, return -1.
	return -1;
}

// Look for a key that was pressed and unpress it.
function keyUnpressed( key )
{
	// Upper case helps us match.
	key = key.toUpperCase();
	
	// Loop through the keyboard data.
	for( var i=0; i<keyboardKeyData.length; i++ )
	{
		// Get the keyboard data.
		let keyboardData = keyboardKeyData[i];
		
		// Check the key against the ASCII key for this key.
		if( key == keyboardData.key )
		{
			// Set to down.
			keyboardData.state = upState;
			
			// Need a device context.
			let ctx = document.getElementById('demoCanvas').getContext('2d');
			// Call the draw key function.
			drawKey( keyboardData.keyVertexData, keyboardData.type, keyboardData.state, keyboardData.key, ctx,  i, true );
			// We are done. Return the index.
			return i;
		}			
	}
	
	// No keypress found, return -1.
	return -1;
}

// 2-5-2022
function getKeyXForMapping( index )
{

	if( index < 0 || index >= _numKeysToDraw )
	{
		return -1;
	}

	let keyVertexData = keyboardKeyData[index].keyVertexData;
	let x1 = keyVertexData[0];
	let x2 = keyVertexData[2];
	let x = x1 + ( ( x2 - x1 ) / 2 );
	
	return x;
}

// Check to see if the mouse is over a key.
function checkMouse( x, y, state )
{
	
	// Loop through the keyboard data.
	for( var i=0; i<_numKeysToDraw; i++ )
	{
		
		// Get the keyboard data.
		let keyboardData = keyboardKeyData[i];

		if( typeof keyboardData === "undefined" )
		{
			continue;
		}

		// Call a function that tests the coordinates.
		if( checkInKey( x, y, keyboardData.keyVertexData, keyboardData.type ) )
		{
			// Need a device context.
			let ctx = document.getElementById('demoCanvas').getContext('2d');
			// Call the function that kills all mouse state other than up.
			killAllState(ctx,hoverState);

			// See if this key is not in the mouse down state.
			if( keyboardData.state != mouseDownState )
			{
				// Set to the new state.
				keyboardData.state = state;
				// Draw the key.
				drawKey( keyboardData.keyVertexData, keyboardData.type, keyboardData.state, keyboardData.key, ctx, i, true );
			}

			// Return the index.
			return i;
		}
	}	
	
	// No key found in the keyboard data, return -1;
	return -1;
}

// This function resets the state for keys that are in whatever state
//	is represented by the state variable.
function killAllState(ctx,state)
{
	
	// Loop through the keyboard data.
	for( var i=0; i<keyboardKeyData.length; i++ )
	{
		// Get the keyboard data.
		let keyboardData = keyboardKeyData[i];
		
		// See if the state of this key matches the state variable.
		if( keyboardData.state == state )
		{
			// Set to the new up.
			keyboardData.state = upState;
			// Draw the key.
			drawKey( keyboardData.keyVertexData, keyboardData.type, keyboardData.state, keyboardData.key, ctx, i, true );
		}
	}
}

// CHeck to see if x/y cooreindates are in a key. Note that for two we check
//	a single rectangle, all others we check two rectangels.
function checkInKey( x, y, keyVertexData, type )
{

	switch( type )
	{
		// Single rectangle.
		case whiteKeyNoNotches:
			if( x >= keyVertexData[0] && 
				x <= keyVertexData[2] && 
				y >= keyVertexData[1] && 
				y <= keyVertexData[5] )
			{
				return true;
			}
			break;
		// One notch, two rectangles.
		case whiteKeyRightNotch:
			if( x >= keyVertexData[r_upperLeftX] && 
				x <= keyVertexData[r_upperRightX] && 
				y >= keyVertexData[r_upperLeftY] && 
				y <= keyVertexData[r_lowerLeftY] )
			{
				return true;
			}
			if( x >= keyVertexData[r_upperRightX] && 
				x <= keyVertexData[r_outerMiddleX] && 
				y >= keyVertexData[r_innerMiddleY] && 
				y <= keyVertexData[r_lowerLeftY] )
			{
				return true;
			}
			break;
		// One notch, two rectangles.
		case whiteKeyLeftNotch:
			if( x >= keyVertexData[l_upperLeftX] && 
				x <= keyVertexData[l_upperRightX] && 
				y >= keyVertexData[l_upperLeftY] && 
				y <= keyVertexData[l_lowerLeftY] )
			{
				return true;
			}
			if( x >= keyVertexData[l_middleLeftX] && 
				x <= keyVertexData[l_middleRightX] && 
				y >= keyVertexData[l_middleLeftY] && 
				y <= keyVertexData[l_lowerLeftY] )
			{
				return true;
			}
			break;
		// Two notches, two rectangles.
		case whiteKeyBothNotch:
			if( x >= keyVertexData[b_upperLeftX] && 
				x <= keyVertexData[b_upperRightX] && 
				y >= keyVertexData[b_upperLeftY] && 
				y <= keyVertexData[b_middleRightLeftY] )
			{
				return true;
			}
			if( x >= keyVertexData[b_lowerLeftX] && 
				x <= keyVertexData[b_lowerRightX] && 
				y >= keyVertexData[b_middleRightLeftY] && 
				y <= keyVertexData[b_lowerRightY] )
			{
				return true;
			}
			break;
		// Single rectangle.
		case blackKey:
			if( x >= keyVertexData[0] && 
				x <= keyVertexData[2] && 
				y >= keyVertexData[1] && 
				y <= keyVertexData[5] )
			{
				return true;
			}
			break;
	}

	// Not in this key.
	return false;
}

// Is the state in any of the keys.
function stateKeys(state)
{
	// Loop through the keyboard data.
	for( var i=0; i<keyboardKeyData.length; i++ )
	{
		// Get the keyboard data.
		let keyboardData = keyboardKeyData[i];
		// Get the vertex and state data.
		if( keyboardData.state == state )
		{
			return true;
		}
	}
	return false;
}

//////////////////////////////////////////////////////////
//
// Key generation methods.
//

// Generate the vertex data for this key.
function generateWhiteKeyRightNotch(x,y,state,key)
{

	// Initialize holder array.
	let keyVertexData = [];
	
	// *-----
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |      --|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x, y );
	
	// ------*
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |      --|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + whiteKeyWidth - blackKeyWidth / 2, y );
	
	// -------
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |     *--|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( keyVertexData[r_upperRightX], y + blackKeyHeight );
	
	// -------
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |      --*
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + whiteKeyWidth, keyVertexData[r_innerMiddleY] );
	
	// -------
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |      --|
	// |        |
	// |        |
	// ---------*
	keyVertexData.push( keyVertexData[r_outerMiddleX], y + whiteKeyHeight );
	
	// -------
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |      --|
	// |        |
	// |        |
	// *---------
	keyVertexData.push( x, keyVertexData[r_lowerRightY] );
	
	// *------
	// |     |
	// |     |
	// |     |
	// |     |
	// |     |
	// |      --|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x, y );

	return keyVertexData;
}

// Generate the vertex data for this key.
function generateWhiteKeyLeftNotch(x,y,state,key)
{
	
	// Initialize holder array.
	let keyVertexData = [];
	
	//    *------
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// |--      |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + blackKeyWidth / 2, y );
	
	//    ------*
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// |--      |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + whiteKeyWidth, y );
	
	//    -------
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// |--      |
	// |        |
	// |        |
	// ---------*
	keyVertexData.push( keyVertexData[l_upperRightX], y + whiteKeyHeight );
	
	//    -------
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// |--      |
	// |        |
	// |        |
	// *---------
	keyVertexData.push( x, keyVertexData[l_lowerRightY] );
	
	//    -------
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// *--      |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x, y + blackKeyHeight );
	
	//    -------
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// |--*     |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( keyVertexData[l_upperLeftX], keyVertexData[l_middleLeftY] );
	
	//    *------
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	//    |     |
	// |--      |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( keyVertexData[l_upperLeftX], y );
	
	return keyVertexData;
}

// Generate the vertex data for this key.
function generateWhiteKeyNoNotches(x,y,state,key)
{
	
	// Initialize holder array.
	let keyVertexData = [];
	
	// *---------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x, y );
	
	// ---------*
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + whiteKeyWidth, y );
	
	// ----------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ---------*
	keyVertexData.push( x + whiteKeyWidth, y + whiteKeyHeight );
	
	// ----------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// *---------
	keyVertexData.push( x, y + whiteKeyHeight );
	
	// *---------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x, y );
	
	return keyVertexData;
}

// Generate the vertex data for this key.
function generateWhiteKeyBothNotches(x,y,state,key)
{

	// Initialize holder array.
	let keyVertexData = [];
	
	//    *---
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// |--   ---|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + blackKeyWidth / 2, y );
	
	//    ---*
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// |--   ---|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + whiteKeyWidth - blackKeyWidth / 2, y );
	
	//    ----
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// |--   *--|
	// |        |
	// |        |
	// ----------
	keyVertexData.push( keyVertexData[b_upperRightX], y + blackKeyHeight );

	//    ----
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// |--   ---*
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + whiteKeyWidth, keyVertexData[b_middleRightLeftY] );
	
	//    ----
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// |--   ----
	// |        |
	// |        |
	// ---------*
	keyVertexData.push( keyVertexData[b_middleRightRightX], y + whiteKeyHeight );
	
	//    ----
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// |--   ----
	// |        |
	// |        |
	// *---------
	keyVertexData.push( x, keyVertexData[b_lowerRightY] );

	//    ----
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// *--   ----
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x, keyVertexData[b_middleRightRightY] );

	//    ----
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// ---*  ----
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + blackKeyWidth / 2, keyVertexData[b_middleRightRightY] );
	
	//    *---
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	//    |  |
	// ----  ----
	// |        |
	// |        |
	// ----------
	keyVertexData.push( keyVertexData[b_upperLeftX], keyVertexData[b_upperLeftY] );
	
	return keyVertexData;
}

// Generate the vertex data for this key.
function generateBlackKey(x,y,state,key)
{
	
	// Initialize holder array.
	let keyVertexData = [];
	
	// *---------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x - blackKeyWidth / 2, y );
	
	// ---------*
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x + blackKeyWidth / 2, y );
	
	// ----------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ---------*
	keyVertexData.push( x + blackKeyWidth / 2, y + blackKeyHeight );
	
	// ----------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// *---------
	keyVertexData.push( x - blackKeyWidth / 2, y + blackKeyHeight );
	
	// *---------
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// |        |
	// ----------
	keyVertexData.push( x - blackKeyWidth / 2, y );
	
	return keyVertexData;
}

////////////////////////////////////////////////////////////////////
//
// Enums
//

const whiteKeyRightNotch = 0;
const whiteKeyLeftNotch = 1;
const whiteKeyNoNotches = 2;
const whiteKeyBothNotch = 3;
const blackKey = 4;

const upState = 0;
const downState = 1;
const mouseDownState = 2;
const hoverState = 3;
const noState = 4;

const keyboardDataType = 0;
const keyboardDrawData = 1;
const keyboardKey = 2;

const r_upperLeftX = 0;
const r_upperLeftY = 1;
const r_upperRightX = 2;
const r_upperRightY = 3;
const r_innerMiddleX = 4;
const r_innerMiddleY = 5;
const r_outerMiddleX = 6;
const r_outerMiddleY = 7;
const r_lowerRightX = 8;
const r_lowerRightY = 9;
const r_lowerLeftX = 10;
const r_lowerLeftY = 11;

const l_upperLeftX = 0;
const l_upperLeftY = 1;
const l_upperRightX = 2;
const l_upperRightY = 3;
const l_lowerRightX = 4;
const l_lowerRightY = 5;
const l_lowerLeftX = 6;
const l_lowerLeftY = 7;
const l_middleLeftX = 8;
const l_middleLeftY = 9;
const l_middleRightX = 10;
const l_middleRightY = 11;

const b_upperLeftX = 0;
const b_upperLeftY = 1;
const b_upperRightX = 2;
const b_upperRightY = 3;
const b_middleRightLeftX = 4;
const b_middleRightLeftY = 5;
const b_middleRightRightX = 6;
const b_middleRightRightY = 7;
const b_lowerRightX = 8;
const b_lowerRightY = 9;
const b_lowerLeftX = 10;
const b_lowerLeftY = 11;

const upperRightX = 4;
const lowerRightY = 7;

const upBlackKeyColor = "#000000";
const downBlackKeyColor = "#aaaaaa";
const hoverBlackKeyColor = "#555555";

const upWhiteKeyColor = "#ffffff";
const downWhiteKeyColor = "#aaaaaa";
const hoverWhiteKeyColor = "#cccccc";

