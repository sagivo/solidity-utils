const DictionaryTest = artifacts.require('./TestContracts/DictionaryTest');
const should = require('chai').should();
const expect = require('chai').expect;

contract('DictionaryTest', async function(accounts) {
  let instance;
  let elements;
  const NUM1 = 1;
  const NUM2 = 2;
  const NUM3 = 3;

  before(async () => {
    instance = await DictionaryTest.deployed();
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

  contract('set & get', async function() {
    let elements;
    contract('reg insert 3', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 3 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x61');
        gets[1].should.eq('0x62');
        gets[2].should.eq('0x68656c6c6f20776f726c64');
      });
    });

    contract('reg existed val start', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM1, 'hello world');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 3 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x68656c6c6f20776f726c64');
        gets[1].should.eq('0x62');
        gets[2].should.eq('0x68656c6c6f20776f726c64');
      });
    });

    contract('reg existed val end', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        await instance.set(NUM3, 'a');
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 3 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x61');
        gets[1].should.eq('0x62');
        gets[2].should.eq('0x61');
      });
    });

    contract('reg existed val mid', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        await instance.set(NUM2, 'hello world');
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 3 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(3);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
        elements[2].toNumber().should.eq(NUM3);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x61');
        gets[1].should.eq('0x68656c6c6f20776f726c64');
        gets[2].should.eq('0x68656c6c6f20776f726c64');
      });
    });
  });

  contract('remove', async () => {
    let elements;
    contract('remove first', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        await instance.remove(NUM1);
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 2 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(2);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM2);
        elements[1].toNumber().should.eq(NUM3);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x');
        gets[1].should.eq('0x62');
        gets[2].should.eq('0x68656c6c6f20776f726c64');
      });
    });

    contract('remove middle', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        await instance.remove(NUM2);
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 2 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(2);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM3);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x61');
        gets[1].should.eq('0x');
        gets[2].should.eq('0x68656c6c6f20776f726c64');
      });
    });

    contract('remove end', async () => {
      let gets = [];
      before(async () => {
        await instance.set(NUM1, 'a');
        await instance.set(NUM2, 'b');
        await instance.set(NUM3, 'hello world');
        await instance.remove(NUM3);
        elements = await getAll(instance);
        gets.push(await instance.get.call(NUM1));
        gets.push(await instance.get.call(NUM2));
        gets.push(await instance.get.call(NUM3));
      });

      it('should have 2 items', async function() {
        const size = (await instance.getSize.call()).toNumber();
        size.should.eq(2);
      });
      it(`should insert items in right order`, async function() {
        elements[0].toNumber().should.eq(NUM1);
        elements[1].toNumber().should.eq(NUM2);
      });
      it(`should attach the right values`, async function() {
        gets[0].should.eq('0x61');
        gets[1].should.eq('0x62');
        gets[2].should.eq('0x');
      });
    });
  });

  contract('insertBeginning', async function() {
    let elements;
    before(async () => {
      await instance.insertBeginning(NUM1, 0);
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
        await instance.insertEnd(NUM1, 0);
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
        await instance.insertEnd(NUM1, 0);
        await instance.insertEnd(NUM2, 1);
        await instance.insertEnd(NUM3, 2);
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
        elements[0].toNumber().should.eq(NUM1, 1);
        elements[1].toNumber().should.eq(NUM2, 2);
        elements[2].toNumber().should.eq(NUM3, 3);
      });
    });

    contract('insertBeginning', async() => {
      before(async () => {
        await instance.insertBeginning(NUM3, 1);
        await instance.insertBeginning(NUM2, 2);
        await instance.insertBeginning(NUM1, 3);
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
        elements[0].toNumber().should.eq(NUM1, 1);
        elements[1].toNumber().should.eq(NUM2, 2);
        elements[2].toNumber().should.eq(NUM3, 3);
      });
    });

    contract('mixed', async() => {
      before(async () => {
        await instance.insertBeginning(NUM2, 2);
        await instance.insertBeginning(NUM1, 1);
        await instance.insertEnd(NUM3, 3);
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
        elements[0].toNumber().should.eq(NUM1, 1);
        elements[1].toNumber().should.eq(NUM2, 2);
        elements[2].toNumber().should.eq(NUM3, 3);
      });
    });

    contract('next', async() => {
      before(async () => {
        await instance.insertBeginning(NUM1, 1);
        await instance.insertEnd(NUM2, 2);
        await instance.insertEnd(NUM3, 3);
        elements = await getAll(instance);
      });

      it('should return next item', async function() {
        (await instance.next.call(NUM1)).toNumber().should.eq(NUM2, 2);
        (await instance.next.call(NUM2)).toNumber().should.eq(NUM3, 3);
        (await instance.next.call(NUM3)).toNumber().should.eq(0);
      });
    });

    contract('next iteration', async() => {
      const arr = [NUM1, NUM2, NUM3];
      before(async () => {
        arr.forEach(async num => await instance.insertEnd(num, 0));
        let node = await instance.first();
        elements = await getAll(instance);
      });

      it('should return next item', async function() {
        elements[0].toNumber().should.eq(NUM1, 1);
        elements[1].toNumber().should.eq(NUM2, 2);
        elements[2].toNumber().should.eq(NUM3, 3);
        elements.length.should.eq(3);
      });
    });
  });

  contract('get keys', function() {
    let elements = [];
    before(async () => {
      await instance.set(NUM1, 'a');
      await instance.set(NUM2, 'b');
      await instance.set(NUM2, 'hello world');
      await instance.set(NUM3, 'hello world');
      elements = await instance.keys.call();
    });

    it('should have right size', async function() {
      elements.length.should.eq(3);
    });

    it('should have right keys', async function() {
      elements[0].toNumber().should.eq(NUM1);
      elements[1].toNumber().should.eq(NUM2);
      elements[2].toNumber().should.eq(NUM3);
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