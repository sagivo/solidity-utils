pragma solidity ^0.4.11;


interface IOracleResponse {
    function  __cb (uint id, string responseData) external;
}
