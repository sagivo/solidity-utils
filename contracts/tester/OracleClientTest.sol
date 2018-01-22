pragma solidity ^0.4.0;

import "./../OracleConnector.sol";

contract OracleClientTest is OracleConnector {
    event CallbackEvent(uint, string);
    string public foo;

    function buySomething() public {
        query("get", "http://goo.com");
    }

    function  oracleResponse (uint id, string responseData) internal {
        CallbackEvent(id, responseData);
        foo = responseData;
    }
}