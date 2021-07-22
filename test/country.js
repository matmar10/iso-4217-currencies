'use strict';

const lib = require('./../');

const assert = require('assert');
const faker = require('faker');
const test = require('tape');

const { country, CountryCurrencyNotFoundError } = lib;

const fakerCountryCodes = faker.definitions.address.country_code;

test('country method', function(t) {
  t.plan(2);
  t.equal(typeof country, 'function', 'member "country" is a function');
  t.throws(() => country('NOTREALCODE'), CountryCurrencyNotFoundError, `Invalid code throws domain-specific Error`);
});

//
// const fakerCountryNames = Object.keys(fakerCurrencyMap);
// const fakerCountryCodes = fakerCountryNames.map(name => fakerCurrencyMap[name].code);
//
test('country currency metadata', function(t) {
  t.plan(fakerCountryCodes.length);
  fakerCountryCodes.forEach(code => {
    t.doesNotThrow(() => {
      const meta = country(code);
      assert('object' === typeof meta, `${code} metadata is an object`);
    }, CountryCurrencyNotFoundError, `${code} metadata exists`);
  });
});
