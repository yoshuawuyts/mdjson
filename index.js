const assert = require('assert')
const marked = require('marked')
const clone = require('clone')

module.exports = toObj

// map a markdown string to an object
// with `html` and `raw` fields
// str -> obj
function toObj (txt) {
  assert.equal(typeof txt, 'string', 'input should be a markdown string')
  const lexer = new marked.Lexer()
  const tokens = lexer.lex(txt)
  const parsed = marked.parser(clone(tokens)).split('\n')
  const res = {}
  var key = ''

  tokens.forEach(function (token, i) {
    if (token.type === 'heading') {
      key = token.text
      res[key] = {html: '', raw: []}
      return
    }

    if (!key) return

    res[key].html += parsed[i]
    res[key].raw.push(token.text)
  })

  Object.keys(res).forEach(function (key) {
    res[key].raw = res[key].raw.join('\n')
  })

  return res
}
