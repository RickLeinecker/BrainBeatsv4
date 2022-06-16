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
// scales.js
//
// Function for generating a microtonal scale.
//
// Originally created: 11-4-2021
//

// This array contains the calculated scale. The values are for
//		frequencies.
var scale = [];

// Starting reference pitch. This can be changed by the user.
var referencePitch = 440;

// How many divisions (or steps) for the scale.
var divisions = 12;

//////////////////////////////////////////////////
//
// Source: scales.js
// Function: generateScale
//
// Parameters:
//   referencePitch
//   numSteps
//
// Description: This is where the magin happens.
//		This function generates a microtonal scale
//		starting a referencePitch. It then walks up
//		the new scale creating the approrpriate frequency
//		for each step.
//					 __ (n-a)
//		Pn = Pa( \st/2 )
//				  \/
//
function generateScale(referencePitch, numSteps)
{
	// Create a new and empty array that will contain the frequencies.
	var scale = [];
	
	// This is the nth root that we only need to calculate once.
	var NthRoot = Math.pow(2, (1.0/numSteps));
	
	// Walk through from start to end (this is inclusive of the octave equivalent).
	for (var i = 0; i <= numSteps; i++ )
	{
		// Calculate tne new pitch.
		
		var pitch = referencePitch * (Math.pow(NthRoot, i));
		
		// Round it so we only have two decimal places.
		pitch = Math.round(pitch * 100) / 100;
		
		// Store in the scale array.
		scale[i] = pitch;
	}

	// Return the array.
	return scale;
}
