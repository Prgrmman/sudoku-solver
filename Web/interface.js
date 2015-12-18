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

// update relative mouse postiion if mouse moves inside our canvas
$("#gridSpace").mousemove(function(e){
   var parentOffset = $(this).parent().offset(); 
   //or $(this).offset(); if you really just want the current element's offset
    relX = e.pageX - parentOffset.left;
    relY = e.pageY - parentOffset.top;

    



  //  board.getMouseCell();
   

    

});


$("#gridSpace").click(function(e){
    
    var list = drawer.drawList; // a reference to the list of tiles in the instance drawer
    var tile; // contains the current tile in the index of our list
    board.setMouseCell();
    board.alpha = 0.99;
     $("#mobile").focus();
    $("#mobile").val("");
    // alert("Clicked cell ("+board.x+" ," +board.y+")");
  
  
});

// event for keypress
$(document).ready(function(){
    $("body").keydown(function(e){
     //   alert(e.which-48);
	var key = e.which;
	if (key ==9)
	    solve();
    }
});
		      

$(document).ready(function(){
    $("body").keyup(function(e){
     //   alert(e.which-48);
	var key = e.which - 48;
	
	switch(key){
	    case -35:
	    if (!isSolved) 
		solve();
	    else{
		isSolved = false;
		init();
	    }
	     break;
	    case -40:
	    board.remove();
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
Definitions of tile sprites and
tile objects

****************************/

function Tile(x,y,num)
{
    this.X = x;
    this.Y = y;
    this.isVisible = false;  //this tile is not being dragged by the mouse at first
    this.num = num;
    this.id = numTiles;
    numTiles ++;
    this.draw = function(){
	if(this.isVisible){
	    this.X = relX;
	    this.Y = relY;
	}
	drawTile(this.X,this.Y,this.num);
	

    }
    
    
    //need to add lots of functionality

}
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
    // flashes the cell overwhich the mouse is over
    this.setMouseCell= function(){
	if (relX > 800 || relY > 800){ // if are mouse is not over a cell...
	    this.x =null;
	    this.y = null;
	    return;
	}
	// otherwise, our mouse is hovering over a cell
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
	    var cX = Math.floor(this.x / 9 * 800) + 5;
	    var cY = Math.floor(this.y / 9 * 800) + 5;
	    ctx.beginPath();
	    ctx.fillStyle = "rgba(200,200,200,"+this.alpha+")";
	    ctx.fillRect(cX,cY, 80,80);
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


/*********************
 Solve Button object
**********************/







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
function drawTile(x,y,number){
   

    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    ctx.fillText(number,x-5,y+5)

}


/*************************************/
// Main game loop

function init(){
    drawer = new Drawer();
    board = new Board();
}







function spawnRandom(){
    var x = Math.round(Math.random()*800);
    var y = Math.round(Math.random()*800);
    var num = Math.round(Math.random()*9);
    
    drawer.drawList.push(new Tile(x,y,num));
    


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

// copies board data and solves puzzle
function solve()
{

    board.alpha = 0.01;
    list = [];
    for (var r = 0; r < 9; r++)
	for (var c = 0; c < 9; c++)
	    list.push(board.vals[r][c].num);
    
		      
    
    var solver = new Solver(list);
    isSolved = solver.solve();
    drawer.drawList = [];
    var grid = solver.getGrid();
    for (var r = 0; r < 9; r++)
	for (var c = 0; c < 9; c++){
	    board.vals[r][c].num = grid[r][c];
	    drawer.drawList.push(board.vals[r][c]);
	}
 
    if (!isSolved)
	alert("Bad Puzzle");
   






}










