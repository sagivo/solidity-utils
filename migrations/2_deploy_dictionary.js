var Dictionary = artifacts.require("./lib/Dictionary");
var DictionaryTest = artifacts.require("./tester/DictionaryTest");

module.exports = function(deployer) {
  deployer.deploy(Dictionary);
  deployer.deploy(DictionaryTest);
  deployer.link(Dictionary, DictionaryTest);
};
