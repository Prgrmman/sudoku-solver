// just a wrapper for x an y coordinate
// used by Solver.java

public class Point{

    private int row;
    private int col;
    //constructors
    public Point(){
	row = col = 0;
    }
    public Point(int x, int y){
	row = x;
	col = y;

    }

    //accesses
    public int getRow(){return row;}
    public int getCol(){return col;}




    


}
