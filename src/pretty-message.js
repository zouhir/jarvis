const emojis = {
  'completed': '✅',
  'building': '🏗',
  'failed': '🚫',
  'serving': '🌏'
}

function prefix (str) {
  let _str = str.toLowerCase()
  for(let key in emojis) {
    if (_str.includes(key)) {
      return emojis[key]
    }
  }
  return '📝'
}

module.exports = (str) => {
  let sym = prefix(str)
  console.log(`${sym}  ${str}`)
}