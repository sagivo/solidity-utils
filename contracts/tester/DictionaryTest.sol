pragma solidity ^0.4.17;

import "./../lib/Dictionary.sol";


contract DictionaryTest {
    using Dictionary for Dictionary.Data;
    Dictionary.Data private dic;

    function getSize() public view returns (uint) {
        return dic.len;
    }

    function insertAfter(uint afterId, uint id, bytes data) public {
        dic.insertAfter(afterId, id, data);
    }

    function insertBefore(uint beforeId, uint id, bytes data) public {
        dic.insertAfter(beforeId, id, data);
    }

    function insertBeginning(uint id, bytes data) public {
        dic.insertBeginning(id, data);
    }

    function set(uint id, bytes data) public {
        dic.set(id, data);
    }

    function get(uint id) public view returns (bytes) {
        return dic.get(id);
    }

    function keys() public view returns (uint[]) {
        return dic.keys();
    }

    function insertEnd(uint id, bytes data) public {
        dic.insertEnd(id, data);
    }

    function remove(uint id) public returns (bool) {
        return dic.remove(id);
    }

    function first() public view returns (uint) {
        return dic.firstNodeId;
    }

    function next(uint id) public view returns (uint) {
        return dic.next(id);
    }

    function prev(uint id) public view returns (uint) {
        return dic.prev(id);
    }
}
