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

//////////////////////////////////////////////////
//
// canvasEvents.js
//
// Functions to maintain the canvas mouse events.
//
// Originally created: 11-4-2021
//

// This will contain the index of a key that has been clicked on.
var detectedClickIndex = -1;

// This is the saved canvas rectangle for the upper left corner sort
//		that it can be restored after the frequency text needs to be removed.
var savedRect;

//////////////////////////////////////////////////
//
// Source: canvasEvents.js
// Function: showFrequency
//
// Parameters:
//   freq
//
// Description: Show the frequency in the upper left of the canvas. (Possibly
//		clear the color.)
//
function showFrequency( freq )
{
	// Get a context for the canvas with which we will draw.
	var ctx = document.getElementById('demoCanvas').getContext('2d');

	// Put the saved rectangle to overwrite the previously drawn frequency.
	ctx.putImageData(savedRect, 0, 0);
	
	// We will draw in white. Sorry about hard coding.
	ctx.fillStyle = "white";
	// Sorry about the hard coded font.
	ctx.font = "25px Arial";
	// Draw the text. Sorry about the harded coordinate.
	ctx.fillText(freq, 40,20);
}

//////////////////////////////////////////////////
//
// Source: canvasEvents.js
// Function: handleMouseMove
//
// Parameters:
//   x
//   y
//
// Description: Responds to the mouse movement in the canvas.
//
function handleMouseMove( x, y )
{

	if( isMapping == 1 )
	{
		return;
	}
	
	let index = checkMouse( x, y, hoverState );
	
	if( index < 0 && stateKeys(hoverState) )
	{
		let ctx = document.getElementById('demoCanvas').getContext('2d');		
		killAllState(ctx,hoverState);
	}
}

//////////////////////////////////////////////////
//
// Source: canvasEvents.js
// Function: handleMouseDown
//
// Parameters:
//   x
//   y
//
// Description: Responds to a mouse down event in the canvas.
//
function handleMouseDown( x, y )
{
	
	if( isMapping == 1 )
	{
		return;
	}
	
	let index = checkMouse( x, y, mouseDownState );
	
	if( index >= 0 )
	{
		if( playNote( index, octave, soundType ) )
		{
			detectedClickIndex = index;
		}
	}
	
}

//////////////////////////////////////////////////
//
// Source: canvasEvents.js
// Function: handleMouseUp
//
// Parameters:
//   x
//   y
//
// Description: Responds to a mouse up event in the canvas.
//
function handleMouseUp( x, y )
{
	
	if( isMapping == 1 )
	{
		return;
	}
	
	if( detectedClickIndex >= 0 && isPlaying( detectedClickIndex ) )
	{
		if( stateKeys( mouseDownState ) )
		{
			let ctx = document.getElementById('demoCanvas').getContext('2d');		
			killAllState(ctx,mouseDownState);
			checkMouse( x, y, hoverState );
		}
		killNote( detectedClickIndex, octave );
		detectedClickIndex = -1;
	}
}

//////////////////////////////////////////////////
//
// Source: canvasEvents.js
// Function: setCanvasEvents
//
// Parameters:
//   None
//
// Description: Create handlers for all of the canvas events that
//		we want to service.
//
function setCanvasEvents()
{
	// Get the canvas object.
	var canvas = document.getElementById('demoCanvas');
	
	// Register the mousedown event.
	canvas.addEventListener("mousedown", function(event)
	{
		// See if we have any scale frequencies.
		if( scale.length > 0 )
		{
			// Call the handler function.
			handleMouseDown(event.offsetX, event.offsetY);
		}
	});
	
	// Register the mouseup event.
	canvas.addEventListener("mouseup", function(event)
	{
		// See if we have any scale frequencies.
		if( scale.length > 0 )
		{
			// Call the handler function.
			handleMouseUp(event.offsetX, event.offsetY);
		}
	});
	
	// Register the mousemove event.
	canvas.addEventListener("mousemove", function(event)
	{
		// See if we have any scale frequencies.
		if( scale.length > 0 )
		{
			// Call the handler function.
			handleMouseMove(event.offsetX, event.offsetY);
		}
	});
}
