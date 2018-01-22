pragma solidity ^0.4.0;

import "./Mortal.sol";
import "./interfaces/IOracleQuery.sol";
import "./interfaces/IOracleResponse.sol";

contract OracleStatic is Mortal, IOracleQuery {
    mapping(string => uint256) private prices;

    struct QueryObj {
        address sender;
        string queryType; // get, post,
        string data;
    }

    function OracleStatic() public {
        prices['get'] = 1;
        prices['post'] = 1;
    }

    mapping(uint256 => QueryObj) queries;
    uint256 trackerIndex = 0;
    uint256[] queriesQue;

    event NewRequest(address sender, uint256 id, string queryType, string data);

    function getQueries() public onlyOwner view returns (uint256) {
        return queriesQue[0];
    }

    function query(uint256 id, string queryType, string data) external payable {
        NewRequest(msg.sender, id, queryType, data);
        queries[id] = QueryObj({ sender: msg.sender, queryType: queryType, data: data });
    }

    function response(uint256 id, string responseData) public onlyOwner {
        IOracleResponse(queries[id].sender).__cb(id, responseData);
    }

}
