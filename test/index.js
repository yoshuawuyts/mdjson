const path = require('path')
const test = require('tape')
const fs = require('fs')

const mdjson = require('../')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(mdjson, /markdown string/)
})

test('should return a parsed obj', function (t) {
  t.plan(2)
  fs.readFile(path.resolve(__dirname, 'text.md'), 'utf8', function (err, res) {
    t.notOk(err)
    const obj = mdjson(res)
    t.deepLooseEqual(obj, {
      'my heading': {
        raw: 'oh wow, amazing',
        html: '<p>oh wow, amazing</p>'
      },
      'another heading': {
        raw: 'gorgeous copy, stunning',
        html: '<p>gorgeous copy, stunning</p>'
      }
    })
  })
})
