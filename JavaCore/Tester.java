import java.util.Scanner;

public class Tester{

    public static void main(String[] args){
	System.out.println("Hello");
	Scanner in = new Scanner (System.in);
	byte[] nums = new byte[81];
	int i = 0;
	
	while(in.hasNextInt() && i < 81)
	    nums[i++] = (byte)in.nextInt();

	
	
       	
	
	Solver solver = new Solver(nums);
	System.out.println("Printing our puzzle");
	System.out.println(solver.toString());

	System.out.println("Is there a solution: " +solver.solve());
	System.out.println(solver.toString());

	// print out the locations of the orignal empty cells

/*	Point[] empty = solver.getEmptyCells();
	for (Point p : empty){
	    int row, col,val;
	    row = p.getRow();
	    col = p.getCol();
	    val = solver.getGrid()[row][col];
	    System.out.println("row: " + row +" col: "+ col +" value "+ val);
	}
*/	
	System.out.println("End of program");
	
    
    }
    

 



}
