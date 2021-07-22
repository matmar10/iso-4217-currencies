'use strict';

const lib = require('./../');

const assert = require('assert');
const faker = require('faker');
const test = require('tape');

const { guessCodeForCountry, CountryCurrencyNotFoundError } = lib;

const fakerCountryCodes = faker.definitions.address.country_code;

test('guessCodeForCountry method', function(t) {
  t.plan(2);
  t.equal(typeof guessCodeForCountry, 'function', 'member "codeForCountry" is a function');
  t.throws(() => guessCodeForCountry('NOTREALCODE'), CountryCurrencyNotFoundError, `Invalid code throws domain-specific Error`);
});

test('guessCodeForCountry guesses', function(t) {
  const fixtures = {
    AU: 'AUD',
    US: 'USD',
  };
  const countries = Object.keys(fixtures);
  t.plan(countries.length);
  countries.forEach(country => {
    const expected = fixtures[country];
    const actual = guessCodeForCountry(country);
    t.equal(actual, expected, `Guesses "${country}" to be "${expected}"`);
  });
});
