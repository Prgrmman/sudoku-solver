import java.util.Scanner;

public class Tester{

    public static void main(String[] args){
	System.out.println("Hello");
	Scanner in = new Scanner (System.in);
	byte[] nums = new byte[81];
	int i = 0;
	
	while(in.hasNextInt() && i < 81)
	    nums[i++] = (byte)in.nextInt();

	// a test of our doubly linked list class
	DLinkedList<Integer> list = new DLinkedList(new Integer(5));
       	list.append(new Integer(4));
	
	Solver solver = new Solver(nums);
	System.out.println("Printing our puzzle");
	System.out.println(solver.toString());

	System.out.println("Is there a solution: " +solver.solve());
	System.out.println(solver.toString());
	System.out.println("End of program");
	
    
    }
    

 



}
