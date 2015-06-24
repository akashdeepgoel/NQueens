// Code for Drawing Chess Board
var NUMBER_OF_COLS = 8,
	NUMBER_OF_ROWS = 8,
	BLOCK_SIZE = 100;

var BLOCK_COLOUR_1 = '#000000',
	BLOCK_COLOUR_2 = '#FFFFFF',
	HIGHLIGHT_COLOUR = '#fb0006';
var valid=[];
var PIECE_QUEEN = 4;
var json = 
    {
        "white": 
        [ 
            {
                "piece": PIECE_QUEEN
            }
        ],
        "black": 
        [  
            {
                "piece": PIECE_QUEEN
            }
        ]       
    };
function draw()
{
	//alert("Hello");
	for(vrow=0;vrow<=100;vrow++)
	{
		valid[vrow]=1;
	}
	canvas = document.getElementById('game');

	if(canvas.getContext)
	{
		context = canvas.getContext('2d');

		BLOCK_SIZE = canvas.height / NUMBER_OF_ROWS;
		// Draw Background
		drawBoard();
		pieces = new Image();
		pieces.src = 'pieces.png';

		canvas.addEventListener('click', board_click,false);
	}
	else
	{
		alert('Canvas Not Supported :-(');
	}
}

function drawBoard()
{
	for(rows=0;rows<NUMBER_OF_ROWS;rows++)
	{
		drawRow(rows);
	}

	//Draw Outline
	context.lineWidth = 3;
	context.strokeRect(0,0,NUMBER_OF_ROWS * BLOCK_SIZE,NUMBER_OF_COLS * BLOCK_SIZE);
}

function drawRow(rows)
{
	//Draw blocks left to right
	for(block_count=0;block_count<NUMBER_OF_ROWS;block_count++)
	{
			drawBlock(rows,block_count);
	}
}

function drawBlock(rows,block_count)
{
    // Set the background
    context.fillStyle = getBlockColour(rows, block_count);
     
    // Draw rectangle for the background
    context.fillRect(rows * BLOCK_SIZE, block_count * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
 
    context.stroke();   
}

function getBlockColour(rows,block_count)
{
	var StartColour;
	//Alternate the block colour
	if(rows%2)
	{
		StartColour = (block_count % 2?BLOCK_COLOUR_1:BLOCK_COLOUR_2);
	}
	else
	{
		StartColour = (block_count % 2?BLOCK_COLOUR_2:BLOCK_COLOUR_1);
	}

	return StartColour;
}

function board_click(event)
{
	var x = event.clientX - canvas.offsetLeft;
	var y = event.clientY - canvas.offsetTop;
	//alert("Clicked");
	var column_number = (x/100) + 1;
	var row_number = (800-y)/100 + 1;
	column_number=parseInt(column_number);
	row_number = parseInt(row_number);
	//alert("Came HERE");
	var matrix_number = (row_number-1)*8 + column_number;
	if(valid[matrix_number]==0)
	{
		alert("Game Over,It will start again!f");
		draw();
	}
	else
	{
		var curr = row_number;
		var cucc = column_number;
		curr=parseInt(curr);
		cucc=parseInt(cucc);
		var check = curr+cucc;
		var cl=x/100;
		var rw=y/100;
		cl=parseInt(cl);
		rw=parseInt(rw);
		drawPiece(check,cl,rw);
		var matrix_number = (curr-1)*8 + cucc;
		valid[matrix_number]=0;
		for(num=1;num<=8;num++)
		{
			var matrix_number = (curr-1)*8 + num;
			valid[matrix_number]=0;
		}	
		for(num=1;num<=8;num++)
		{
			var matrix_number = (num-1)*8 + cucc;
			valid[matrix_number]=0;
		}
		while(curr!=8 && cucc!=8)
		{
			//alert("Here as well");
			curr++;
			cucc++;
			var matrix_number = (curr-1)*8 + cucc;
			valid[matrix_number]=0;
		}
		curr=parseInt(row_number);
		cucc=parseInt(column_number);
		while(curr!=0 && cucc!=0)
		{
			curr--;
			cucc--;
			var matrix_number = (curr-1)*8 + cucc;
			valid[matrix_number]=0;
		}
		curr=parseInt(row_number);
		cucc=parseInt(column_number);
		while(curr!=0 && cucc!=8)
		{
			curr--;
			cucc++;
			var matrix_number = (curr-1)*8 + cucc;
			valid[matrix_number]=0;
		}
		curr=parseInt(row_number);
		cucc=parseInt(column_number);
		while(curr!=8 && cucc!=0)
		{
			curr++;
			cucc--;
			var matrix_number = (curr-1)*8 + cucc;
			valid[matrix_number]=0;
		}
	}
}

function drawPiece(check,cl,rw)
{
	if(check%2==0)
	{

		drawqueen(json.white[0],1,cl,rw);

	}
	else
	{
		drawqueen(json.black[0],0,cl,rw);
	}
}


function drawqueen(curPiece,black,cl,rw)
{
	var imageCoords = getImageCoords(curPiece.piece,black);
	context.drawImage(pieces,imageCoords.x, imageCoords.y, BLOCK_SIZE, BLOCK_SIZE,cl * BLOCK_SIZE, rw * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function getImageCoords(pieceCode, bBlackTeam)
{

    var imageCoords = 
    {
        "x": pieceCode * BLOCK_SIZE,
        "y": (bBlackTeam?0:BLOCK_SIZE)
    }; 
     
    return imageCoords;
}
		