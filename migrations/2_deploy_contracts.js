var LinkedList = artifacts.require("./lib/LinkedList.sol");
var LinkedListTest = artifacts.require("./TestContracts/LinkedListTest.sol");

module.exports = function(deployer) {
  deployer.deploy(LinkedListTest);
  deployer.link(LinkedList, LinkedListTest);
};
