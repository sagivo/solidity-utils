pragma solidity ^0.4.11;


interface IOracleQuery {
    function query(uint256 id, string queryType, string data) external payable;
}
