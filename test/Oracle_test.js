const OracleClientTest = artifacts.require('./tester/OracleClientTest');
const OracleStatic = artifacts.require('./OracleStatic');
const should = require('chai').should();
const expect = require('chai').expect;

contract('OracleClientTest', async function(accounts) {
  let instance;
  let oracleStatic;
  before(async () => {
    instance = await OracleClientTest.deployed();
    oracleStatic = await OracleStatic.deployed();
    await instance.setStaticAddress(oracleStatic.address);
  });

  it('should have right static address', async function() {
    const address = await instance.getStaticAddress.call();
    address.should.eq(oracleStatic.address);
  });

});
