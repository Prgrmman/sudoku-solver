all: Solver.class Tester.class Point.class

test: Solver.class Tester.class Point.class
	java Tester < test.txt


Solver.class: Solver.java
	javac Solver.java

Tester.class: Tester.java
	javac Tester.java

Point.class: Point.java
	javac Point.java

clean:

	rm *.class
