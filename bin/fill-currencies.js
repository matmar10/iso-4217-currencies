#!/usr/bin/env node
'use strict';

const faker = require('faker');

const lib = require('./../');
const iso4217Currencies = require('./../data/iso-4217.json');

const { CurrencyNotFoundError, currency } = lib;

const fakerCurrencyMapByName = faker.definitions.finance.currency;
const fakerCurrencyNames = Object.keys(fakerCurrencyMapByName);
const fakerCountryMapByCode = {};
const fakerCurrencyCodes = fakerCurrencyNames.map(name => {
  const meta = fakerCurrencyMapByName[name];
  const { code, symbol } = meta;
  fakerCountryMapByCode[code] = {
    code,
    name,
    symbol,
  };
  return code;
});

const notFound = [];
fakerCurrencyCodes.forEach(code => {
  try {
    const meta = currency(code);
  } catch (err) {
    if (err instanceof CurrencyNotFoundError) {
      const partialMeta = fakerCountryMapByCode[code];
      const fullMeta = {
        symbol: partialMeta.symbol,
        name: '',
        symbolNative: partialMeta.symbol,
        decimalDigits: 0,
        rounding: 0,
        code: partialMeta.code,
        namePlural: '',
      };
      notFound.push(fullMeta);
      iso4217Currencies[code] = fullMeta;
    } else {
      throw err;
    }
  }
});

const new4217Currencies = {};
Object.keys(iso4217Currencies)
  .sort()
  .forEach((currencyCode) => new4217Currencies[currencyCode] = {...iso4217Currencies[currencyCode] });

console.log(JSON.stringify(new4217Currencies, null, 2));
