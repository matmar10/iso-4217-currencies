'use strict';

const map = require('./data/iso-4217');
const countryCurrencies = require('./data/iso-3166-1-alpha-2-to-iso-4217');

const codes = Object.keys(map);
const currencies = codes.map(code => map[code]);

class CurrencyNotFoundError extends Error {
  constructor(currencyCode) {
    const message = currencyCode ?
      `currency '${currencyCode}' not found` :
      `currency not found`;
    super(message);
    this.name = 'CurrencyNotFoundError';
    this.code = currencyCode || '';
  }
}

class CountryCurrencyNotFoundError extends Error {
  constructor(country) {
    country = country || '';
    const message = `currency for country '${country}' not found`;
    super(message);
    this.name = 'CountryCurrencyNotFoundError';
    this.country = country;
  }
}

const lib = {
  CountryCurrencyNotFoundError,
  CurrencyNotFoundError,
  codes,
  currencies,
  map,
  guessCodeForCountry: function (countryCode) {
    const code = codes.find(code => 0 === code.indexOf(countryCode));
    if (!code) {
      throw new CountryCurrencyNotFoundError(countryCode);
    }
    return code;
  },
  codeForCountry: function(countryCode) {
    const currencyCode = countryCurrencies[countryCode];
    return currencyCode ? currencyCode : lib.guessCodeForCountry(countryCode);
  },
  country: function(countryCode) {
    return lib.currency(lib.codeForCountry(countryCode));
  },
  currency: function(currency) {
    const meta = map[currency];
    if (!meta) {
      throw new CurrencyNotFoundError(currency);
    }
    return meta;
  },
};

module.exports = lib;
