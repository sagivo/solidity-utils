pragma solidity ^0.4.17;

import "./../lib/Obj.sol";


contract ObjTest {
    using Obj for Obj.Data;
    Obj.Data private obj;

    function getSize() public view returns (uint) {
        return obj.len;
    }

    function insertAfter(uint afterId, uint id, bytes data) public {
        obj.insertAfter(afterId, id, data);
    }

    function insertBefore(uint beforeId, uint id, bytes data) public {
        obj.insertAfter(beforeId, id, data);
    }

    function insertBeginning(uint id, bytes data) public {
        obj.insertBeginning(id, data);
    }

    function insertEnd(uint id, bytes data) public {
        obj.insertEnd(id, data);
    }

    function remove(uint id) public returns (bool) {
        return obj.remove(id);
    }

    function first() public view returns (uint) {
        return obj.firstNodeId;
    }

    function next(uint id) public view returns (uint) {
        return obj.next(id);
    }

    function prev(uint id) public view returns (uint) {
        return obj.prev(id);
    }
}
