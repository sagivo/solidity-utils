const OracleStatic = artifacts.require("OracleStatic");
const OracleClientTest = artifacts.require("./tester/OracleClientTest");

module.exports = async (deployer) => {
  deployer.deploy(OracleStatic);
  deployer.deploy(OracleClientTest);
  // console.log('----->', OracleStatic.address);
  // const instance = await OracleClientTest.deployed();
  // console.log(await instance.setStaticAddress());
  // instance.setStaticAddress(OracleStatic.address)
};
