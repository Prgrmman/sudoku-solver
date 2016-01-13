**Java Core module**
This Directory contains to Java classes: Tester and Solver.
As its name would suggest, Tester is a tester class used to interact with Solver.

*Solver is the class that solves Sudoku puzzles. When you create an instance of Solver,
pass it a byte array of length 81 that represents all of the different numbers in a
Sudoku puzzle. Use 0s for blank spots in the puzzle. The Constructor will crash the 
program if you don't give it a byte array of sufficient length.

*<instance of Solver>.solve() will attempt to solve the puzzle and return true if 
successful.
To access the solved puzzle call <instance of Solver>.getGrid()
