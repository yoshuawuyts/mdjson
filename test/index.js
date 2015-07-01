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

test('should handle multiple paragraphs', function (t) {
  const fixture = path.resolve(__dirname, 'text-multi.md')
  const markdown = fs.readFileSync(fixture, 'utf8')
  const tree = mdjson(markdown)

  t.deepEqual(tree, {
    'first heading': {
      html: '<p>  Hi there!</p>\n<p>This content runs over multiple lines...</p>',
      raw: '  Hi there!\nThis content runs over multiple lines...'
    },
    'second heading': {
      html: '<p>As does this one.\nYup.</p>\n<p>With even more whitespace :O</p>',
      raw: 'As does this one.\nYup.\nWith even more whitespace :O'
    }
  })

  t.end()
})

test('should ignore text before headings', function (t) {
  const fixture = path.resolve(__dirname, 'text-pre-headings.md')
  const markdown = fs.readFileSync(fixture, 'utf8')
  const tree = mdjson(markdown)

  t.deepEqual(tree, {
    'Main Content': {
      html: '<p>Goes here</p>',
      raw: 'Goes here'
    }
  })

  t.end()
})
