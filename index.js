const html = require('mdast-html')
const assert = require('assert')
const mdast = require('mdast')

module.exports = mdjson

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
      const html = []
      html.links = true
      res[key] = {html: html, raw: []}
      return
    }

    if (!key) return

    res[key].raw.push(lexer.stringify(token))
    res[key].html.push(token)
  })

  Object.keys(res).forEach(function (key) {
    res[key].raw = res[key].raw.join('\n')
    res[key].html = toHtml.process(res[key].raw).trim()
  })

  return res
}
