'use strict';

const lib = require('./../');

const assert = require('assert');
const faker = require('faker');
const test = require('tape');

const { CountryCurrencyNotFoundError } = lib;

test('CountryCurrencyNotFoundError', function(t) {
  t.plan(6);
  t.equal(typeof CountryCurrencyNotFoundError, 'function', 'is an constructor (function)');
  const code = 'ZZZ';
  let err;
  try {
    throw new CountryCurrencyNotFoundError(code);
  } catch (err) {
    t.true(err instanceof CountryCurrencyNotFoundError, 'is an instance of an CountryCurrencyNotFoundError');
    t.true(err instanceof Error, 'is an instance of an Error');
    t.equal(err.name, 'CountryCurrencyNotFoundError', 'has property "name"');
    t.equal(err.country, code, 'has property "country"');
    t.equal(String(err), `CountryCurrencyNotFoundError: currency for country '${code}' not found`, 'error message');
  }
});
