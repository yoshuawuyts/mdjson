const assert = require('assert')
const mdast = require('mdast')
const html = require('mdast-html')

module.exports = mdjson

function trimRight (value) {
  return value.replace(/\n+$/, '')
}

// map a markdown string to an object
// with `html` and `raw` fields
// str -> obj
function mdjson (txt) {
  assert.equal(typeof txt, 'string', 'input should be a markdown string')
  const toHtml = mdast().use(html)
  const lexer = mdast()
  const tokens = lexer.parse(txt).children
  const res = {}
  var key = ''

  tokens.forEach(function (token, i) {
    if (token.type === 'heading') {
      key = token.children[0].value
      res[key] = []
      return
    }

    if (!key) return

    res[key].push(token)
  })

  Object.keys(res).forEach(function (key) {
    const node = {
      type: 'root',
      children: res[key]
    }

    res[key] = {
      raw: trimRight(lexer.stringify(node)),
      html: trimRight(toHtml.stringify(node))
    }
  })

  return res
}
