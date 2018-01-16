pragma solidity ^0.4.17;

import "./../lib/LinkedList.sol";


contract LinkedListTest {
    using LinkedList for LinkedList.Data;
    LinkedList.Data private map;

    function getSize() public view returns (uint) {
        return map.len;
    }

    function insertAfter(uint afterId, uint id) public {
        map.insertAfter(afterId, id);
    }

    function insertBefore(uint beforeId, uint id) public {
        map.insertAfter(beforeId, id);
    }

    function insertBeginning(uint id) public {
        map.insertBeginning(id);
    }

    function insertEnd(uint id) public {
        map.insertEnd(id);
    }

    function remove(uint id) public returns (bool) {
        return map.remove(id);
    }

    function first() public view returns (uint) {
        return map.firstNodeId;
    }

    function next(uint id) public view returns (uint) {
        return map.next(id);
    }

    function prev(uint id) public view returns (uint) {
        return map.prev(id);
    }
}
