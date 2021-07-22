'use strict';

const lib = require('./../');

const assert = require('assert');
const faker = require('faker');
const test = require('tape');

const { CurrencyNotFoundError, currency } = lib;

const fakerCurrencyMap = faker.definitions.finance.currency;
const fakerCurrencyNames = Object.keys(fakerCurrencyMap);
const fakerCurrencyCodes = fakerCurrencyNames.map(name => fakerCurrencyMap[name].code);

test('currency method', function(t) {
  t.plan(2);
  t.equal(typeof currency, 'function', 'member "currency" is a function');
  t.throws(() => currency('NOTREALCODE'), CurrencyNotFoundError, `Invalid code throws domain-specific Error`);
});

test('currency metadata', function(t) {
  t.plan(fakerCurrencyCodes.length);
  fakerCurrencyCodes.forEach(code => {
    t.doesNotThrow(() => {
      const meta = currency(code);
      assert('object' === typeof meta, `${code} metadata is an object`);
    }, CurrencyNotFoundError, `"${code}" metadata exists`);
  });
});
