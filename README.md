# solidity-utils
This library has some basic missing utils in Solidity. 

## Dictionary
`mapping` + keys iteration.  
Inspired by `Dictionary` in python or 'Object` in javascript, `Dictionary` is an improved and faster mapping data-structure that allows you to retrieve all the keys in a mapping object while  minimizing storage usage.  
The data-stucture combines linked-list iteration style with solidity `mapping` hash-table.  

### Using
```sol
pragma solidity ^0.4.0;
// import the contract
import "github.com/sagivo/solidity-utils/contracts/lib/Dictionary.sol";

contract Foo {
    // declare and use new Dictionary structure
    using Dictionary for Dictionary.Data;
    Dictionary.Data private dic;

    function Foo() public view returns (uint) {
        dic.set(1, "value");
        dic.set(2, "foo");
        // get an item
        dic.get(2); // => '0x666f6f' (byte hex of 'foo')
        // get all keys
        dic.keys(); // => [1, 2]
    }
}
```

### Basic Operations
`set(uint id, bytes data)`  
`get(uint id) --> bytes data`  
`remove(uint id)`  
`getSize() --> uint num of keys`  

### Iteration operations
Keys are stored based on the order you specify, allows you to iterate over keys.  
`keys()` - return an array of all the keys.  
`next(uint id)` / `prev(uint id)` - return the next/prev key for a given key.  
`firstNodeId` / `lastNodeId` - return the first/last key.  
Example iteration:
```solidity
uint nodeId = dic.firstNodeId;
while (nodeId != 0) {
  // do something
  nodeId = dic.next(nodeId);
}
```

### Insertion Options
`insertBeginning(uint id, bytes data)` - add a node to the begining of the list.  
`insertEnd(uint id, bytes data)` - add a node to the end of the list.  
`insertBefore(uint beforeId, uint id, bytes data)` - add a node before another.  
`insertEnd(uint beforeId, uint id, bytes data)` - add a node after another.  
The default order for `.set(uint id, bytes data)` is `insertEnd`.  

### Limitation
Key must be bigger than 0.  
