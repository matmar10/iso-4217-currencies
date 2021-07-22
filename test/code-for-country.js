'use strict';

const lib = require('./../');

const assert = require('assert');
const faker = require('faker');
const test = require('tape');

const { codeForCountry, CurrencyNotFoundError, CountryCurrencyNotFoundError } = lib;

const fakerCountryCodes = faker.definitions.address.country_code;

test('codeForCountry method', function(t) {
  t.plan(2);
  t.equal(typeof codeForCountry, 'function', 'member "codeForCountry" is a function');
  t.throws(() => codeForCountry('NOTREALCODE'), CountryCurrencyNotFoundError, `Invalid code throws domain-specific Error`);
});

//
// const fakerCountryNames = Object.keys(fakerCurrencyMap);
// const fakerCountryCodes = fakerCountryNames.map(name => fakerCurrencyMap[name].code);
//
test('country currency metadata', function(t) {
  t.plan(fakerCountryCodes.length);
  fakerCountryCodes.forEach(code => {
    t.doesNotThrow(() => {
      const result = codeForCountry(code);
      assert('string' === typeof result, `${code} metadata is an string`);
    }, CountryCurrencyNotFoundError, `${code} currency known`);
  });
});
