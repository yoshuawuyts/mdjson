const assert = require('assert')
const marked = require('marked')
const clone = require('clone')
const lexer = new marked.Lexer()

module.exports = toObj

// map a markdown string to an object
// with `html` and `raw` fields
// str -> obj
function toObj (txt) {
  assert.equal(typeof txt, 'string', 'input should be a markdown string')
  const tokens = lexer.lex(txt)
  const parsed = marked.parser(clone(tokens)).split('\n')
  const res = {}
  var key = ''

  tokens.forEach(function (token, i) {
    if (i === 0) assert.equal(token.type, 'heading', 'files should start with a heading')
    if (token.type === 'heading') {
      key = token.text
      res[key] = {html: '', raw: ''}
      return
    }
    res[key].html += parsed[i]
    res[key].raw += token.text
  })

  return res
}
