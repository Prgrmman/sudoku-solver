/********************************
This is the javascript file that runs the interface
Note: requires jquery and a canvas element with id "gridSpace"





**********************************/

//global variable stuff

var relX; // relative mouse x position inside canvas
var relY; // relative mouse y position inside canvas
var canvas = document.getElementById("gridSpace");
var ctx = canvas.getContext("2d");
var isClicked = false; // if we click the current cell
var drawList = []; // a list of objects that contain draw methods to be drawn
var numTiles = 0; // number of tiles
var isSolved = false;

var drawer;
var board;

//prevent our canvas from being selected
$('body').on('contextmenu', '#gridSpace', function(e){ return false; });




/*********************************
 Event listeners and whaterver not
**********************************/

$(document).keydown(function (e) 
{
    var keycode1 = (e.keyCode ? e.keyCode : e.which);
    if (keycode1 == 0 || keycode1 == 9) {
        e.preventDefault();
        e.stopPropagation();
    }
});


// update relative mouse postiion if mouse moves inside our canvas
$("#gridSpace").mousemove(function(e){
   var parentOffset = $(this).parent().offset(); 
    relX = e.pageX - parentOffset.left;
    relY = e.pageY - parentOffset.top;
});

// event for mouse click on the board
$("#gridSpace").click(function(e){
    var list = drawer.drawList; // a reference to the list of tiles in the instance drawer
    var tile; // contains the current tile in the index of our list
    board.setMouseCell();
    board.alpha = 0.99;
     $("#mobile").focus();
    $("#mobile").val("");
});

// event for keypress
$(document).ready(function(){
    $("#mobile").focus();
    $("body").keydown(function(e){
    	var key = e.which;
	if (key ==9){
	    if (!isSolved)
		solve();
	    else{
		init();
	   
		}
	}
    });

});
// events for capturing keypress on computer
$(document).ready(function(){
    $("body").keyup(function(e){
    	var key = e.which - 48; // subtracts the key code so the pressing the 1 key inputs a new keycode of 1
	$("#mobile").focus();
	switch(key){ 
	   case -35:
	    if (!isSolved) 
		solve();
	    else{
		init();
	    }
	     break;
	    case -40:
	    board.remove();
	    isSolved = false;
	     break;
	    case -11:
	     board.moveCursor('l');
	     break;
	    case -9:
	     board.moveCursor('r');
	     break;
	    case -8:
	     board.moveCursor('d');
	     break;
	    case -10:
	     board.moveCursor('u');
	     break;
	    
	}
	if (key <= 9 && key > 0)
	    board.fillCell(key);
    });
});



//environment functions

//returns the distance between two coordinates
function dist(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2)); 
}



/***************************
Object definitions:
-> Tile:

-> Drawer

-> Board


****************************/

function Tile(x,y,num)
{
    this.X = x;
    this.Y = y;
 
    this.num = num;
    this.id = numTiles;
    this.color = "#000000";
    
    numTiles ++;
  

}
Tile.prototype = {
    draw:function(){

	if(this.isVisible){
	    this.X = relX;
	    this.Y = relY;
	}

	ctx.fillStyle = this.color;
	ctx.font = "30px serif";
	ctx.fillText(this.num,this.X-5,this.Y+5)
    },
    setColor: function(c){
	this.color = c;
	}
    

};
// subclass of Tile
function SolvedTile(x,y,num){
    Tile.call(this,x,y,num);
    this.color = "#ff0000";

}
SolvedTile.prototype = Object.create(Tile.prototype);

// a colored tile



/*************************
DrawList object...
contains all of the different tiles that I am drawing
has methods to send objects on top of each other by changing draw order


***************************/
function Drawer()
{

    this.drawList = []; //empty list of everything to be drawn

    this.moveToFront = function(id){ // function that moves tile id to front of queue
	var current =  this.drawList.splice(id,1)[0]; // remove specified id to front
	this.drawList.push(current);
    }

    this.remove = function(id){
	var tile;
	for (var i = 0; i < this.drawList.length; i++){
	    tile = this.drawList[i];
	    if (tile.id == id)
		this.drawList.splice(i,1);


	}


    }
}


/***************************
Board object...
draws the sudoku board and also interacts with the mouse.


****************************/

function Board()
{
    
    this.x = 0;
    this.y = 0;
    this.vals = [];


    // initialize vals
    var line = [];
    var cX;
    var cY;
    for (var r = 0; r < 9; r++){
	for (var c = 0; c< 9; c++){
	    var cX = Math.floor(c/9*800)+40;
	    var cY = Math.floor(r/9*800)+40;
	    line.push(new Tile(cX,cY,0));
	}
	this.vals.push(line);
	line = [];
    }
    this.remove = function(){
	var tile = this.vals[this.y][this.x];
	tile.num = 0;
	drawer.remove(tile.id);
    }
    this.moveCursor = function(dir){
	switch(dir){
	    case ('l'):
	     if (this.x > 0)
		 this.x --;
	     break;
	    case ('r'):
	     if (this.x < 8)
		 this.x ++;
	     break;
	    case ('u'):
	     if (this.y > 0)
		 this.y--;
	     break;
	    case ('d'):
	     if (this.y < 8)
		 this.y ++;
	    break;
	}
    }
    this.alpha = 1.0;
    // flashes the cell overwhich the mouse clicks
    this.setMouseCell= function(){
	if (relX > 800 || relY > 800){ // if are mouse is not over a cell...
	    this.x =null;
	    this.y = null;
	    return;
	}
	// ...otherwise, our mouse is over a cell
	this.x = Math.floor(relX / 800 * 9);
	this.y = Math.floor(relY / 800 * 9);
    }

    this.fillCell = function (num){
	var tile; 
	if (this.vals[this.y][this.x].num == 0){
	    this.vals[this.y][this.x].num = num;
	    drawer.drawList.push(this.vals[this.y][this.x]);
	}
	else this.vals[this.y][this.x].num = num;
    }
    this.drawBoard = function(){
	drawBackground(); // draw the grid lines
	// draw our flashing box
	if (this.x != null && this.y != null){
	    var cX = Math.floor(this.x / 9 * 800)+3;
	    var cY = Math.floor(this.y / 9 * 800)+3;
	    ctx.beginPath();
	    ctx.fillStyle = "rgba(200,200,200,"+this.alpha+")";
	    ctx.fillRect(cX,cY, 84,84);
	    ctx.closePath();
	}
    }

    var flasher = -0.03;
    this.flashCell = function(){
	this.alpha += flasher;
	if (this.alpha <=0 || this.alpha >= 1){
	    flasher = -flasher;
	}

    }


}



/*****************************
 Various draw functions
******************************/


//draws the sudoku grid
function drawBackground(){
    var width = 1;
    for(var c = 0; c <= 9; c++){
	if (c==0 || c % 3 == 0)
	    width = 5;
	else
	    width = 1;
	ctx.beginPath();
	ctx.moveTo(c * 800/9,0);
	ctx.lineTo(c * 800/9, 800);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.moveTo(0, c*800/9);
	ctx.lineTo(800,c*800/9);
	ctx.lineWidth = width;
	ctx.stroke();
	ctx.closePath();
    }
}

//draws a tile associated with a Tile object



/*************************************/
// Main game loop

function init(){
    drawer = new Drawer();
    board = new Board();
    numTiles = 0;
    isSolved = false;
}









function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.drawBoard();
   // myTile.draw();

    for (var i = 0; i < drawer.drawList.length; i++){
	drawer.drawList[i].draw();

    }
    board.flashCell();
    requestAnimationFrame(main);
}

var list = [];
var solver;



// copies board data and solves puzzle
function solve()
{

    board.alpha = 0.01;
    list = [];
    for (var r = 0; r < 9; r++)
	for (var c = 0; c < 9; c++)
	    list.push(board.vals[r][c].num);
    
    solver = new Solver(list);
    isSolved = solver.solve();
    var grid = solver.getGrid();
    var tile;
    
    if (!isSolved){
	alert("Bad Puzzle");
	return;
    }
    else{
   
	for (var r = 0; r < 9; r++)
	    for (var c = 0; c < 9; c++){
		tile = board.vals[r][c];
		var num = tile.num;
		tile.num = grid[r][c];
		if (num == 0){
		    tile.setColor("#DF2079");
		    drawer.drawList.push(tile);
		}
	    }
    }
}










