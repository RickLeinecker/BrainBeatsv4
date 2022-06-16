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
"use strict";

let background = new Image();
let octave = 3;

let generated = false;
let mappingDlgShowing = false;
let loadDlgShowing = false;

let saveText = "";
let _saveText = "";
let recordId = -1;

//////////////////////////////////////////////////
//
// Source: code.js
// Function: setup
//
// Parameters:
//   None
//
// Description: This function sets up the eidth and events that
//		we need to maintain.
//
function setup()
{

	// Set the initial canvas width. FYI: setting the width in CSS
	//		causes the text to be blurry.
	setCanvasWidth();
	// Calls the function that creates event handlers for down, up, and move.
	setCanvasEvents();
	
	// Resize event.
	window.addEventListener('resize', function(event)
	{
		// Set the canvas width to reflect the new width.
		setCanvasWidth();
		// Redraw.
		let canvas = document.getElementById('demoCanvas');
		drawMe(canvas.width,canvas.height,canvas,canvas.getContext('2d'));
	});
	
	// This is the event to handle a keydown event.
	document.getElementById("myBody").addEventListener("keydown", function(event)
	{
		if( !generated )
		{
			return;
		}
		
		if( mappingDlgShowing )
		{
			handleKey( event.key );
			return;
		}
		
		let index = keyPressed( event.key );
		if( index >= 0 )
		{
			playNote( index, octave, soundType );
		}
		
	});
	
	document.getElementById("myBody").addEventListener("keyup", function(event)
	{
		if( !generated )
		{
			return;
		}
		
		if( mappingDlgShowing )
		{
			return;
		}
		
		let index = keyUnpressed( event.key );
		if( index >= 0 )
		{
			killNote( index, octave );
		}
	});

	// Connect to a midi device if it is plugged in.
	connect();
	
	let canvas2 = document.getElementById("demoCanvas");
	canvas2.addEventListener('mousemove', function(event)
	{
		handleMappingMouseMove(event.offsetX, event.offsetY); 
	});

	canvas2.addEventListener('mousedown', function(event)
	{
		handleMappingMouseDown(event.offsetX, event.offsetY); 
	});

	canvas2.addEventListener('mouseup', function(event)
	{
		handleMappingMouseUp(event.offsetX, event.offsetY); 
	});
	
    (function() {
//		let updateButton = document.getElementById('modal-btn');
//		let cancelButton = document.getElementById('cancel');
		let resetButton = document.getElementById('confirm5');
//		let applyButton = document.getElementById('apply');
		let saveAsButton = document.getElementById('confirm4');
		let saveButton = document.getElementById('confirm3');
		if( recordId == -1 )
		{
			saveButton.disabled = true;
		}
		else
		{
			saveButton.disabled = true;
		}
		let dialog = document.getElementById('favDialog');
		let canvas = document.getElementById("mappingCanvas");
		dialog.returnValue = 'favAnimal';

		function openCheck(dialog) 
		{
			if(dialog.open) 
			{
				drawMapper();
			} 
		}

//		updateButton.addEventListener('click', function() 
//		{
//			mappingDlgShowing = true;
//			dialog.showModal();
//			openCheck(dialog);
//		});

		saveAsButton.addEventListener('click', function() 
		{
			getSaveText();
			
			if( _saveText.length == 0 )
			{
				alert("You must have a save name");
				return;
			}
			
			doMappingApply();
			mappingDlgShowing = false;
			doSave(true);
			dialog.close('');
			openCheck(dialog);
		});
		
		saveButton.addEventListener('click', function() 
		{
			getSaveText();
			
			if( _saveText.length == 0 )
			{
				alert("You must have a save name");
				return;
			}
			
			doMappingApply();
			mappingDlgShowing = false;
			dialog.close('');
			openCheck(dialog);
		});
		
		resetButton.addEventListener('click', function() 
		{
			doMappingReset();
		});
		
//		applyButton.addEventListener('click', function() 
//		{
//			doMappingApply();
//			mappingDlgShowing = false;
//			dialog.close('');
//			openCheck(dialog);
//		});
		
//		cancelButton.addEventListener('click', function() 
//		{
//			mappingDlgShowing = false;
//			dialog.close('');
//			openCheck(dialog);
//		});
		
		canvas.addEventListener('mousemove', function(event)
		{
			handleMappingMouseMove(event.offsetX, event.offsetY); 
		});

		canvas.addEventListener('mousedown', function(event)
		{
			handleMappingMouseDown(event.offsetX, event.offsetY); 
		});

		canvas.addEventListener('mouseup', function(event)
		{
			handleMappingMouseUp(event.offsetX, event.offsetY); 
		});
		
	})();
	
    (function() {
		let loadButton = document.getElementById('modal-btn2');
		let cancelButton = document.getElementById('cancel2');
		let searchButton = document.getElementById('search2');
		let dialog = document.getElementById('selectorDlg');
		dialog.returnValue = 'selectedIndex';

		function openCheck(dialog) 
		{
			if(dialog.open) 
			{
			} 
		}

		loadButton.addEventListener('click', function() 
		{
			loadDlgShowing = true;
			dialog.showModal();
			openCheck(dialog);
		});

		searchButton.addEventListener('click', function() 
		{
			let obj = document.getElementById("record-select");
			removeOptions( obj );
			let tm = document.getElementById("textMatch");
			let search = tm.value.trim().replace("'","").replace('"','');
			getList( obj, search );
		});
		
		cancelButton.addEventListener('click', function() 
		{
			loadDlgShowing = false;
			dialog.close('');
			openCheck(dialog);
		});

	})();

}

function getMappingString()
{
	let mapping = '';
	for( let i=0; i<indices.length; i++ )
	{
		mapping += ( '' + indices[i] );
		if( i < indices.length - 1 )
		{
			mapping += ';';
		}
	}
	
	return mapping;
}

function doSave(isSaveAs)
{
	let url = "https://microtonality.net/API/save.php";

	let id = recordId;
	if( isSaveAs )
	{
		id = -1;
	}
	
	let payload = {id:recordId,text:_saveText,referenceFrequency:referencePitch,divisions:divisions,mapping:getMappingString()};
	let jsonPayload = JSON.stringify( payload );
	
	saveText = _saveText;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				recordId = jsonObject.id;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert( err.message );
	}
	
}

function getList(obj,search)
{
	let url = "https://microtonality.net/API/list.php";

	let payload = {search:search};
	let jsonPayload = JSON.stringify( payload );
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					let json = jsonObject.results[i];
					
					var opt = document.createElement('option');
					opt.value = json.id;
					opt.innerHTML = json.text;
					obj.appendChild(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert( err.message );
	}
	
}

function getSaveText()
{
	var obj = document.getElementById("saveName");
	_saveText = obj.value.trim().replace("'","").replace('"','');
	obj.value = _saveText;
}

function doPlus()
{
	if( octave != -1 && octave < 7 )
	{
		octave++;
		drawMini();
	}
}

function doMinus()
{
	if( octave > 1 )
	{
		octave--;
		drawMini();
	}
}

function getDivisionWidth()
{
	let w = 5;
	
	for( var i=0; i<_numKeysToDraw; i++ )
	{
		var mod = i % 12;
		if( mod == 1 || mod == 3 || mod == 6 || mod == 8 || mod == 10 )
		{
			if( i == _numKeysToDraw - 1 )
			{
				w += 4;
			}
		}
		else
		{
			w += 8;
		}
	}
	return w;
}

function drawMini()
{
	var w = 81;//getDivisionWidth();
	
	let ctx = document.getElementById('mini').getContext('2d');
	ctx.drawImage(background,0,0,506,150);
	
	// The line will be white.
	ctx.strokeStyle = "green";
	ctx.lineWidth = 5;
	
	// Start the draw path.
	ctx.beginPath();
	ctx.moveTo(18 + (octave - 1 ) * 68, 72);
	ctx.lineTo(18 + (octave - 1 ) * 68, 5);
	ctx.lineTo(18 + (octave - 1 ) * 68 + w, 5);
	ctx.lineTo(18 + (octave - 1 ) * 68 + w, 72);

	// Now draw the line.
	ctx.stroke();		

}

//////////////////////////////////////////////////
//
// Source: code.js
// Function: doGenerate
//
// Parameters:
//   None
//
// Description: Generate the scale, the note buffers, and draw the hexagons.
//
function doGenerate()
{

	// Here we call the function get get all UI values
	//	before we start. An error shouldn't happen, but might.
	var error = getValuesFromUI()
	if( error.length > 0 )
	{
		alert( error );
		return;
	}

//	let but = document.getElementById( "modal-btn" );
//	but.disabled = false;
	generated = true;

	// Generate the scale and save the array into scale variable.
	scale = generateScale( referencePitch, divisions );
	init( referencePitch, divisions );
	
	pushMappingIndices();
	
	octave = 3;
	
	_numKeysToDraw = 13;//divisions + 1;
	
	let canvas = document.getElementById('demoCanvas');
	let w = setKeyboardData( 0, keyboardYOffset );
	setKeyboardData( ( canvas.width - w ) / 2, keyboardYOffset );

	background.src = "images/img0.png";
	background.onload = function()
	{
		drawMini();
	}

	let obj = document.getElementById("minus");
	obj.src = "images/minus.png";
	
	obj = document.getElementById("plus");
	obj.src = "images/plus.png";
	
	// Call the code that draws the hexagons.
	drawMe(canvas.width,canvas.height,canvas,canvas.getContext('2d'));
}

//////////////////////////////////////////////////
//
// Source: code.js
// Function: drawMe
//
// Parameters:
//   None
//
// Description: This draws keyboard keys, each on which
//		represent a note.
//
function drawMe(width,height,canvas,ctx)
{
	// Clear the canvas so that we start with a blank object.
	ctx.clearRect(0, 0, width, height);
	_drawKeyboard(canvas,ctx,13);//divisions+1);
}

//////////////////////////////////////////////////
//
// Source: code.js
// Function: setCanvasWidth
//
// Parameters:
//   None
//
// Description: This sets the canvas width, which is important for when the
//		user resizes the window.
//
function setCanvasWidth()
{
	// Get the canvase object.
	let canvas = document.getElementById('demoCanvas');
	
	// Calculate the adjusted width (25 is for the scrollbar, etc.)
	let w = window.innerWidth - 25;
	let h = canvasHeight;
	
	// Set the canvas width.
	canvas.width = w;
	canvas.height = h;
	
	w = setKeyboardData( 0, keyboardYOffset );
	setKeyboardData( ( canvas.width - w ) / 2, keyboardYOffset );
}

