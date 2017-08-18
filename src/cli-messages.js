exports.webpackPrettyMessage = (str) => {
  let _str = str.toLowerCase();
  const emojiKey = {
    'completed': '✅',
    'building': '🏗',
    'failed': '🚫',
    'serving': '🌏',
    'default': '📝'
  }
  let msg = null
  for(let key in emojiKey) {
    if(_str.includes(key)) {
      msg = `${emojiKey[key]}  ${str}`
    }
  }
  return msg || `${emojiKey['default']}  ${str}`
}