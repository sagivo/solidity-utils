var Dictionary = artifacts.require("./lib/Dictionary.sol");
var DictionaryTest = artifacts.require("./tester/DictionaryTest.sol");

module.exports = function(deployer) {
  deployer.deploy(Dictionary);
  deployer.deploy(DictionaryTest);
  deployer.link(Dictionary, DictionaryTest);
};
