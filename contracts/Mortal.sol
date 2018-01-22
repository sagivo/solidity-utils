pragma solidity ^0.4.0;

import "./Owned.sol";

contract Mortal is Owned {
    function kill() public onlyOwner {
        selfdestruct(owner);
    }
}
