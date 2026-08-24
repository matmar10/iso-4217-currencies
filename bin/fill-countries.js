#!/usr/bin/env node
'use strict';

import { LocationDefinition } from '@faker-js/faker';
import { codeForCountry } from './../index.js';

const newCountryCurrencies = {};
LocationDefinition.country_code
  .map((country) => country.alpha_2)
  .sort()
  .forEach(country => newCountryCurrencies[country] = codeForCountry(country));

console.log(JSON.stringify(newCountryCurrencies, null, 2));
