public class DLinkedList <T> {
    // create a Node inner class
    private static class Node<T>{
	private T data;
	private Node next;
	private Node prev;
	// Make the contructor
	
	public Node(){
	    data = prev = next = null;
	}
	public Node(T data){
	    this();
	    setNode(data);
	   
	}
	
	//accessors and setters
	public void setNode(T data){
	    this.data = data;
	}
	public T getNodeData(){ return this.data;}
    }
    
    //Fields for DLinkedList
    private Node<T> root; // the root element
    
    //Constructors for DLinkedList
    
    public DLinkedList<T>(){
	root = null;
    }

}





}
