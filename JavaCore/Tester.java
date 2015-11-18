import java.util.Scanner;

public class Tester{

    public static void main(String[] args){
	System.out.println("Hello");
	Scanner in = new Scanner (System.in);
	int[] nums = new int[81];
	int i = 0;
	
	while(in.hasNextInt() && i < 81)
	    nums[i++] = in.nextInt();

       
    }

 



}
