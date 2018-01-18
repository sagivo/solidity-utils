# solidity-utils

This library has some basic missing utils in Solidity. 

## Obj
This is an improved mapping data-structure that allows you to retrieve all the keys in a mapping object.

### Using
```solidity
pragma solidity ^0.4.0;
// import the contract
import "github.com/sagivo/solidity-utils/contracts/lib/Obj.sol";
// have fun
contract Foo {
    // declare and use new obj structure
    using Obj for Obj.Data;
    Obj.Data private obj;

    function Foo() public view returns (uint) {
        obj.set(1, "value");
        obj.set(2, "foo");
        obj.set(123, "bar");
        obj.set(1, "new value");
        // get all keys
        obj.keys(); // => [1, 2, 123]
    }
}
```

### Basic Operations
`set(uint id, bytes data)` - store bytes for a given key.  
`get(uint id, bytes data)` - get bytes for a given key.  
`remove(uint id)` - delete a key.  
`getSize()` - get the number of keys.  

### Iteration operations
Keys are stored based on the order you specify, allows you to iterate over keys.  
`keys()` - return an array of all the keys.  
`next(uint id)` / `prev(uint id)` - return the next/prev key for a given key.  
`firstNodeId` / `lastNodeId` - return the first/last key.  
Example iteration:
```solidity
uint nodeId = obj.firstNodeId;
while (nodeId != 0) {
  // do something
  nodeId = obj.next(nodeId);
}
```

### Insertion Options
`insertBeginning(uint id, bytes data)` - add a node to the begining of the list.  
`insertEnd(uint id, bytes data)` - add a node to the end of the list.  
`insertBefore(uint beforeId, uint id, bytes data)` - add a node before another.  
`insertEnd(uint beforeId, uint id, bytes data)` - add a node after another.  
The default order for `.set(uint id, bytes data)` is `insertEnd`.  

