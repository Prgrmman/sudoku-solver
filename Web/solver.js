





/*
  A Point object that is simply a wrapper for a row and column
*/



function Point(x,y)
{
    return {
	getRow: function(){
	    return x;
	},
	getCol: function(){
	    return y;
	    }
    };
}

  
/*
 A solver object that solves a Sudoku puzzle
 it needs to take an array of numbers
*/

function Solver(nums)
{
    // nums need to be an array of length 81!
    if (nums.constructor != Array)
	return {}; // return an empty object
    if (nums.length != 81)
	return {};

    // data fields...
    var emptyCells = new Array();
    var grid = new Array();
    
    (function(){
		
	var i = 0;
	for (var r = 0; r < 9; r++){
	    var line = [];
	    for (var c = 0; c < 9; c++){
		line.push(nums[i]);
		if (nums[i] == 0)
		    emptyCells.push(new Point(r,c));
		i++;
	    }
	    grid.push(line);
	}
    })();
    
    this.solve = function(){
	var start = getNextEmptyCell(0,0);
	return findSolution(start.getRow(), start.getCol());
    }
    this.getGrid = function(){return grid;}






    // helper function for findSolution
     function isValPossible(value, r,c){
	 if (grid[r][c] != 0)
	     return false;
	 //check if it's in the row
	 for (var i =  0; i < 9; i++){
	     if (grid[r][i] == value)
		 return false;
	     }
	 //check if it's in the col
	 for (var i = 0; i< 9; i++){
	     if (grid[i][c] == value)
		 return false;
	     }
	 //check if it's in the box
	 var bRow = r; var bCol = c;
	 while (bCol % 3 != 0  && bCol %3  != 3){ bCol --;}
	 while (bRow % 3 != 0 &&  bRow %3 != 3){ bRow --;}
	 for(var i = 0; i < 3; i++)
	     for(var j = 0; j < 3; j++)
		 if (grid[bRow+i][bCol+j] == value)
		     return false;
	 return true;
    }
    //returns the next empty cell found after the one specified
    function getNextEmptyCell(r,c){
	while( r < 9){
	    if (grid[r][c] == 0)
		return new Point(r,c);
	    c ++;
	    if (c == 9){
		    c = 0;
		    r++;
	    }
	}
	return null;
    }


  function findSolution(r, c)
    {

	//scan through choices 1-9
	for (var i = 1; i <= 9; i++){
	    if (isValPossible(i,r,c))
		{
		    grid[r][c] = i;
		    var next = getNextEmptyCell(r,c);
		    if (next == null)
			return true;
		    if (!findSolution(next.getRow(),next.getCol()))
			{
			    grid[r][c] = 0;
			    continue;
			}
		    else return true;
		}
	}
	return false;
    }            



}










    


/*
var nums = [0,0,4,5,0,7,0,1,9,
	    1,7,6,0,9,0,0,8,3,
	    0,0,8,0,0,0,0,0,0,
	    0,3,0,0,0,5,0,0,4,
	    0,0,0,8,3,6,0,0,0,
	    7,0,0,4,0,0,0,3,0,
	    0,0,0,0,0,0,7,0,0,
	    6,5,0,0,4,0,3,2,8,
	    2,8,0,6,0,3,4,0,0]

var solver = new Solver(nums);
solver.solve();



*/
