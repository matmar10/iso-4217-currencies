#!/usr/bin/env node
'use strict';

const faker = require('faker');
const lib = require('./../');

const newCountryCurrencies = {};
faker.definitions.address.country_code
  .sort()
  .forEach(country => newCountryCurrencies[country] = lib.codeForCountry(country));

console.log(JSON.stringify(newCountryCurrencies, null, 2));
