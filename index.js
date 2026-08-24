'use strict';

import map from './data/iso-4217.json' assert { type: 'json' };
import countryCurrencies from './data/iso-3166-1-alpha-2-to-iso-4217.json' assert { type: 'json' };

export const codes = Object.keys(map);
export const currencies = codes.map(code => map[code]);

export class CurrencyNotFoundError extends Error {
  constructor(currencyCode) {
    const message = currencyCode ?
      `currency '${currencyCode}' not found` :
      `currency not found`;
    super(message);
    this.name = 'CurrencyNotFoundError';
    this.code = currencyCode || '';
  }
}

export class CountryCurrencyNotFoundError extends Error {
  constructor(country) {
    country = country || '';
    const message = `currency for country '${country}' not found`;
    super(message);
    this.name = 'CountryCurrencyNotFoundError';
    this.country = country;
  }
}
export function guessCodeForCountry(countryCode) {
  const code = codes.find(code => 0 === code.indexOf(countryCode));
  if (!code) {
    throw new CountryCurrencyNotFoundError(countryCode);
  }
  return code;
}

export function codeForCountry(countryCode) {
  const currencyCode = countryCurrencies[countryCode];
  return currencyCode ? currencyCode : lib.guessCodeForCountry(countryCode);
}

export function country(countryCode) {
  return lib.currency(lib.codeForCountry(countryCode));
}

export function currency(currency) {
  const meta = map[currency];
  if (!meta) {
    throw new CurrencyNotFoundError(currency);
  }
  return meta;
}

export const lib = {
  CountryCurrencyNotFoundError,
  CurrencyNotFoundError,
  codes,
  currencies,
  map,
  guessCodeForCountry,
  codeForCountry,
  country,
  currency,
};

export default lib;
