'use strict';

const lib = require('./../');

const assert = require('assert');
const faker = require('faker');
const test = require('tape');

const { CurrencyNotFoundError } = lib;

test('CurrencyNotFoundError', function(t) {
  t.plan(11);
  t.equal(typeof CurrencyNotFoundError, 'function', 'is an constructor (function)');
  const code = 'ZZZ';
  let err;
  try {
    throw new CurrencyNotFoundError(code);
  } catch (err) {
    t.true(err instanceof CurrencyNotFoundError, 'is an instance of an CurrencyNotFoundError');
    t.true(err instanceof Error, 'is an instance of an Error');
    t.equal(err.name, 'CurrencyNotFoundError', 'has property "name"');
    t.equal(err.code, code, 'has property "codes"');
    t.equal(String(err), `CurrencyNotFoundError: currency '${code}' not found`, 'message with code provided');
  }
  try {
    throw new CurrencyNotFoundError();
  } catch (err) {
    t.true(err instanceof CurrencyNotFoundError, 'is an instance of an CurrencyNotFoundError');
    t.true(err instanceof Error, 'is an instance of an Error');
    t.equal(err.name, 'CurrencyNotFoundError', 'has property "name"');
    t.equal(err.code, '', 'has empty property "code"');
    t.equal(String(err), `CurrencyNotFoundError: currency not found`, 'message without code provided');
  }
});
