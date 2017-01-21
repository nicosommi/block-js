import path from 'path'

export default function getDelimiters(filePath, customDelimiters) {
  let currentDelimiter
  if (customDelimiters) {
    currentDelimiter = customDelimiters
  } else {
    let extension = path.extname(filePath)
    if (!delimiters[extension]) {
      currentDelimiter = delimiters.default
    } else {
      currentDelimiter = delimiters[extension]
    }
  }
  return currentDelimiter
}

const delimiters = {
  '.js': {
    'start': '/*',
    'end': '*/'
  },
  '.java': {
    'start': '/*',
    'end': '*/'
  },
  '.html': {
    'start': '<!--',
    'end': '-->'
  },
  '.md': {
    'start': '<!--',
    'end': '-->'
  },
  '.css': {
    'start': '/*',
    'end': '*/'
  },
  '.yml': {
    'start': '##-',
    'end': '-##'
  },
  '.gitignore': {
    'start': '##-',
    'end': '-##'
  },
  'default': {
    'start': '##-',
    'end': '-##'
  }
}