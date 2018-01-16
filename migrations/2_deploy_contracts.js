var Obj = artifacts.require("./lib/Obj.sol");
var ObjTest = artifacts.require("./tester/ObjTest.sol");

module.exports = function(deployer) {
  deployer.deploy(Obj);
  deployer.deploy(ObjTest);
  deployer.link(Obj, ObjTest);
};
