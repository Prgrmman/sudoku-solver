import ctypes
import os

file_path = os.getcwd() + '/test.so'
lib = ctypes.cdll.LoadLibrary(file_path)
lib.spam_system("ls -l")


