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
  // const parsed = marked.parser(clone(tokens)).split('\n')
  const res = {}
  var key = ''

  console.log(marked.parser(clone(tokens)).length)

  tokens.forEach(function (token, i) {
    if (token.type === 'heading') {
      key = token.text
      const html = []
      html.links = true
      res[key] = {html: html, raw: []}
      return
    }

    if (!key) return

    res[key].raw.push(token.text)
    res[key].html.push(token)
  })

  Object.keys(res).forEach(function (key) {
    res[key].raw = res[key].raw.join('\n')
    res[key].html = marked.parser(clone(res[key].html)).trim()
  })

  return res
}
