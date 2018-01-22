pragma solidity ^0.4.0;

import "./interfaces/IOracleResponse.sol";
import "./interfaces/IOracleQuery.sol";

contract OracleConnector is IOracleResponse {
    modifier onlyOracleAddress() {
        require(msg.sender == staticAddress);
        _;
    }

    address staticAddress;// = 0x51815cebef59b88dafd1a5f24095eee1236ffcdd;

    function setStaticAddress(address newStaticAddress) public {
        staticAddress = newStaticAddress;
    }

    function getStaticAddress() public view returns (address) {
        return staticAddress;
    }

    function query(string callType, string data) internal returns (uint256 id) {
        id = uint256(keccak256(block.number, now, callType, data, msg.sender));
        IOracleQuery(staticAddress).query(id, callType, data);
    }

    function  __cb (uint id, string responseData) onlyOracleAddress external {
        // posible just raise event here to save gass
        oracleResponse (id, responseData);
    }

    function oracleResponse (uint id, string responseData) internal;
}