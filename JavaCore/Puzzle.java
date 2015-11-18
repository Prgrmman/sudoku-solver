import java.lang.*;





public class Puzzle{
   
    private int[][] grid;
    
    // default constructor
    public Puzzle()
    {
	grid = new int[9][9];
    }
    
   
    // read in a list of numbers and create our matrix
    public Puzzle(int[] grid)
    {
	this();
	
    }

    // user methods...
    public void printPuzzle(){
	for (int r = 0; r < 9; r++){
	    for (int c = 0; c < 9; c++){
		System.out.print(grid[r][c] + " ");
	    } 
	    System.out.print("\n");
	}

    }
    


}
