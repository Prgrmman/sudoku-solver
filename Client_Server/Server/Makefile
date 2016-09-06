all: test.so run


run: test.py test.c
	@echo "Testing shared library"
	python test.py

test.so: test.c
	gcc -Wall -O3 -shared -fPIC test.c -o test.so	

