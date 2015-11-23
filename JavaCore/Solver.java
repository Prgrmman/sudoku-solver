import java.util.ArrayList;

/*
* This class implements the code that will solve our Sudoku puzzle
* Uses the following objects:
* ->
*
* this requires an array of bytes to start
*/

public class Solver{
    
    // the puzzle board
    private byte[][] grid;
    private ArrayList<Point> emptyCells; //storing locations of initial empty cells...might be useful later
    
    //constructor
    // if we don't have a full puzzle, then we crash
    public Solver(byte[] nums){
	grid = new byte[9][9];
	emptyCells = new ArrayList<Point>();
	
	
	if (nums.length != 81)
	    {
		System.out.println("Error making puzzle: exiting now");
		System.exit(0);
	    }
	int i = 0;
	for (int r = 0; r < 9; r++){
	    for (int c = 0; c < 9; c++){
		grid[r][c] = nums[i];
		if (nums[i] == 0)
		    emptyCells.add(new Point(r,c));
		i++;
		
	    }
	}
    }
    // assessor
    public byte[][] getGrid(){return grid;}
    public ArrayList<Point> getEmptyCells(){return emptyCells;}
    
    //User methods

    //this is the function that solves the puzzle. Note: this function modifies the grid field.
    public boolean solve()
    {
	Point start = getNextEmptyCell(0,0);
	return findSolution(start.getRow(), start.getCol());
	
    }

    private boolean findSolution(int r, int c)
    {

	//scan through choices 1-9
	for (byte i = 1; i <= 9; i++){
	    if (isValPossible(i,r,c))
		{
		    grid[r][c] = i;
		   Point next = getNextEmptyCell(r,c);
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
    // returns the next empty cell found after the one specified
    private Point getNextEmptyCell(int r, int c)
    {
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

// helper functions used by findSolution.
//returns true only if that value may be placed in that cell
    private  Boolean isValPossible(byte value, int r, int c)
    {
	if (grid[r][c] != 0)
	    return false;
	// check if it's in the the row
	for (int i = 0; i < 9; i++){
	    if (grid[r][i] == value)
		return false;

	}
	// check if it's in the col
	for (int i = 0; i < 9; i++){
	    if (grid[i][c] == value)
		return false;

	}
	// check if it's in the box	
	int bRow = r; int bCol = c;
	while (bCol % 3 != 0  && bCol %3  != 3){ bCol --;}
	while (bRow % 3 != 0 &&  bRow %3 != 3){ bRow --;}
	//	System.out.println(bRow + " " + bCol);
	for (int i = 0; i < 3; i++)
	    for (int j = 0; j < 3; j++)
		if (grid[bRow+i][bCol+j] == value)
		    return false;
	
	return true;
    }
// override default toString()
    public String toString()
    {
	String result = "";
	for (int r = 0; r < 9; r++){
	    for (int c = 0; c < 9; c++){
		result += grid[r][c] + " ";
	    }
	    result += "\n";
	}
	return result;
    }
}
