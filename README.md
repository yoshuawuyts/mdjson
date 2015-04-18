# mdjson
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]
[![js-standard-style][standard-image]][standard-url]

Transform markdown to an object where headings are keys.

## Installation
```bash
$ npm install mdjson
```

## Usage
```js
const mdjson = require('mdjson')

mdjson(`
  ## my heading
  oh wow, amazing

  ## another heading
  gorgeous copy, stunning
`)
// => {
//  'my heading': {
//    raw: 'oh wow, amazing',
//    html: '<p>oh wow, amazing</p>'
//  },
//  'another heading': {
//    raw: 'gorgeous copy, stunning',
//    html: '<p>gorgeous copy, stunning</p>'
//  }
//}
```

## Why?
Writing copy in markdown is more pleasant than writing it inline in html or JS.
This module allows you to separate copy from markup on a page per page basis.

## See Also
- [newspeak](https://github.com/yoshuawuyts/newspeak) - Natural language localization
- [ndjson](https://github.com/maxogden/ndjson) - newline delimited json parser, not to be confused with this markdown module

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/mdjson.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mdjson
[travis-image]: https://img.shields.io/travis/yoshuawuyts/mdjson.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/mdjson
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/mdjson.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/mdjson?branch=master
[downloads-image]: http://img.shields.io/npm/dm/mdjson.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/mdjson
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
