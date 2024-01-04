# ISO-4217 Currencies

Simply a list of ISO-4217 currencies with name, code, symbol, &amp; decimal rounding. Also, support for figuring out the currency based on ISO-3166-1 Alpha-2 country code.


## Basic Usage

```JavaScript

// include it
const lib = require('@blossomfinance/iso-4217-currencies');

// get metadata for a specific currency code
const usd = lib.currency('USD');
// {
//   "symbol": "$",
//   "name": "US Dollar",
//   "symbolNative": "$",
//   "decimalDigits": 2,
//   "rounding": 0,
//   "code": "USD",
//   "namePlural": "US dollars"
// }

// get currency metadata by country code
const eur = lib.currency('FR');
// {
//   "symbol": "€",
//   "name": "Euro",
//   "symbolNative": "€",
//   "decimalDigits": 2,
//   "rounding": 0,
//   "code": "EUR",
//   "namePlural": "euros"
// }

// get currency code for a country code
const code = lib.codeForCountry('CM');
// "XAF"
```

## Exported API

```JavaScript
const lib = require('@blossomfinance/iso-4217-currencies');

const {
  // array of currency codes
  // ['AED', 'AFN', ...]
  codes,

  // array of currency metadata
  // [
  //   {
  //     "symbol": "AED",
  //     "name": "United Arab Emirates Dirham",
  //     "symbolNative": "د.إ.‏",
  //     "decimalDigits": 2,
  //     "rounding": 0,
  //     "code": "AED",
  //     "namePlural": "UAE dirhams"
  //   },
  //   ...
  // ]
  currencies,

  // hash map of currency metadata indexed by currency code
  // {
  //   "AED": {
  //     "symbol": "AED",
  //     "name": "United Arab Emirates Dirham",
  //     "symbolNative": "د.إ.‏",
  //     "decimalDigits": 2,
  //     "rounding": 0,
  //     "code": "AED",
  //     "namePlural": "UAE dirhams"
  //   },
  //   ...
  // }
  map,

  // domain-specific errors thrown if currency code was not found:
  CurrencyNotFoundError,

  // domain-specific errors thrown if no currency code found for country code:
  CountryCurrencyNotFoundError,

} = lib;
```


## Why?

Most solutions available are super overkill, not distributed as packages (e.g. gist), and/or out of date.

## Credits

Original inspiration was from [Kent Safranski](https://github.com/Fluidbyte) in the form of [this helpful Gist](https://gist.github.com/Fluidbyte/2973986)
