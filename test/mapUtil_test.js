const LinkedListContract = artifacts.require('./TestContracts/LinkedListTest');
const should = require('chai').should();
const expect = require('chai').expect;

contract('LinkedListContract', async function(accounts) {
  let instance;
  let elements;
  const NUM1 = 1;
  const NUM2 = 2;
  const NUM3 = 3;

  before(async () => {
    instance = await LinkedListContract.deployed();
  });

  contract('initial state', function() {
    it('should have no items', async function() {
      const size = (await instance.getSize.call()).toNumber();
      size.should.eq(0);
    });
    it('should have empty values', async function() {
      const elements = (await getAll(instance));
      const foundNonZero = elements.find(el => el.toNumber() !== 0);
      expect(foundNonZero).to.be.undefined;
    });
  });

  contract('insertBeginning', async function() {
    let elements;
    before(async () => {
      await instance.insertBeginning(NUM1);
      elements = await getAll(instance);
    });

    it('should have one item', async function() {
      const size = (await instance.getSize.call()).toNumber();
      size.should.eq(1);
    });
    it(`should have element number ${NUM1}`, async function() {
      const foundElements = elements.filter(el => el.toNumber() === NUM1);
      foundElements.length.should.eq(1);
    });
  });

  contract('insertions', async function() {
    let elements;

    contract('one insert', async() => {
      before(async () => {
        await instance.insertEnd(NUM1);
        elements = await getAll(instance);
      });

      it('should have one item', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(1);
      });
      it(`should have element number ${NUM1}`, async function() {
        const foundElements = elements.filter(el => el.toNumber() === NUM1);
        foundElements.length.should.eq(1);
      });
    });

    contract('insertEnd', async() => {
      before(async () => {
        await instance.insertEnd(NUM1);
        await instance.insertEnd(NUM2);
        await instance.insertEnd(NUM3);
        elements = await getAll(instance);
      });

      it('should have multiple items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should have element number ${NUM1}`, async function() {
        const foundElements = elements.filter(el => el.toNumber() === NUM1);
        foundElements.length.should.eq(1);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
    });

    contract('insertBeginning', async() => {
      before(async () => {
        await instance.insertBeginning(NUM3);
        await instance.insertBeginning(NUM2);
        await instance.insertBeginning(NUM1);
        elements = await getAll(instance);
      });

      it('should have multiple items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should have element number ${NUM1}`, async function() {
        const foundElements = elements.filter(el => el.toNumber() === NUM1);
        foundElements.length.should.eq(1);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
    });

    contract('mixed', async() => {
      before(async () => {
        await instance.insertBeginning(NUM2);
        await instance.insertBeginning(NUM1);
        await instance.insertEnd(NUM3);
        elements = await getAll(instance);
      });

      it('should have multiple items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should have element number ${NUM1}`, async function() {
        const foundElements = elements.filter(el => el.toNumber() === NUM1);
        foundElements.length.should.eq(1);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
    });

    contract('next', async() => {
      before(async () => {
        await instance.insertBeginning(NUM1);
        await instance.insertEnd(NUM2);
        await instance.insertEnd(NUM3);
        elements = await getAll(instance);
      });

      it('should return next item', async function() {
        (await instance.next.call(NUM1)).toNumber().should.eq(NUM2);
        (await instance.next.call(NUM2)).toNumber().should.eq(NUM3);
        (await instance.next.call(NUM3)).toNumber().should.eq(0);
      });
    });

    contract('next iteration', async() => {
      const arr = [NUM1, NUM2, NUM3];
      before(async () => {
        arr.forEach(async num => await instance.insertEnd(num));
        let node = await instance.first();
        elements = await getAll(instance);
      });

      it('should return next item', async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
        elements.length.should.eq(3);
      });
    });

  });

});

async function getAll(instance) {
  let node = await instance.first();
  const elements = [];
  while (node != 0) {
    elements.push(node);
    node = await instance.next(node);
  }
  return elements;
}