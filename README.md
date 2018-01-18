# solidity-utils
This library has some basic missing utils in Solidity. 

## Dictionary
`mapping` + keys iteration.  
Inspired by `Dictionary` in python or 'Object` in javascript, `Dictionary` is an improved and faster mapping data-structure that allows you to retrieve all the keys in a mapping object while  minimizing storage usage.  
The data-stucture combines linked-list iteration style with solidity `mapping` hash-table.  

### Using
```solidity
pragma solidity ^0.4.0;
// import the contract
import "github.com/sagivo/solidity-utils/contracts/lib/Dictionary.sol";
// have fun
contract Foo {
    // declare and use new Dictionary structure
    using Dictionary for Dictionary.Data;
    Dictionary.Data private dic;

    function Foo() public view returns (uint) {
        dic.set(1, "value");
        dic.set(2, "foo");
        dic.set(123, "bar");
        dic.set(1, "new value");
        // get an item
        dic.get(2); // => '0x666f6f' (byte hex of 'foo')
        // get all keys
        dic.keys(); // => [1, 2, 123]
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

