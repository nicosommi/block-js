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
    'end': '*/',
    'inline': '//'
  },
  '.jsx': {
    'start': '/*',
    'end': '*/',
    'inline': '//'
  },
  '.ts': {
    'start': '/*',
    'end': '*/',
    'inline': '//'
  },
  '.tsx': {
    'start': '/*',
    'end': '*/',
    'inline': '//'
  },
  '.go': {
    'start': '/*',
    'end': '*/',
    'inline': '//'
  },
  '.java': {
    'start': '/*',
    'end': '*/',
    'inline': '//'
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
    'end': '*/',
    'inline': '//'
  },
  '.yml': {
    'start': '##-',
    'end': '-##',
    'inline': '#'
  },
  '.gitignore': {
    'start': '##-',
    'end': '-##',
    'inline': '#'
  },
  'default': {
    'start': '##-',
    'end': '-##',
    'inline': '#'
  }
}