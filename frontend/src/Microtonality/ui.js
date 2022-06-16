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
// ui.js
//
// Function for extracting ui values.
//
// Originally created: 11-4-2021
//

//////////////////////////////////////////////////
//
// Source: ui.js
// Function: getValuesFromUI
//
// Parameters:
//   None
//
// Description: This function gets the reference frequency, sound type,
//		divisions, amplitude, starting color, and ending color from the user interface objects.
//
function getValuesFromUI()
{
	try
	{
		// Get the reference pitch as text from the UI and convert it to an integer.
		referencePitch = parseFloat( document.getElementById("referencePitch").value.trim() );
	}
	catch(e)
	{
		// Upon error return the error message.
		return e.message();
	}
	
	try
	{
		// Get the divisions number as text from the UI and convert it to an integer.
		divisions = parseInt( document.getElementById("divisions").value.trim() );
		if( divisions < 12 || divisions > 32 )
		{
			return "Divisions can be from 12 to 32";
		}
	}
	catch(e)
	{
		// Upon error return the error message.
		return e.message();
	}

	// Sound type: sine=0, square=1, triangle=2
	soundType = document.getElementById("soundType").selectedIndex;
	
	return "";
}

