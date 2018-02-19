import _ from 'lodash';

const makeSpaces = (num) => {
  if (num === 0) {
    return '';
  }
  return ` ${makeSpaces(num - 1)}`;
};

const valueToString = (value, spaces) => {
  if (value instanceof Object) {
    const result = Object.keys(value).reduce((acc, key) =>
      [...acc, `${makeSpaces(spaces + 6)}${[key]}: ${value[key]}`], []);
    return `${['{', ...result, `${makeSpaces(spaces + 2)}}`].join('\n')}`;
  }
  return value;
};

const keyTypes = {
  nested: (item, spaces, f) =>
    `${makeSpaces(spaces + 2)}${item.key}: {\n${_.flatten(f(item.curValue, spaces + 4)).join('\n')}\n${makeSpaces(spaces + 2)}}`,
  removed: (item, spaces) =>
    `${makeSpaces(spaces)}- ${item.key}: ${valueToString(item.curValue, spaces)}`,
  added: (item, spaces) =>
    `${makeSpaces(spaces)}+ ${item.key}: ${valueToString(item.curValue, spaces)}`,
  updated: (item, spaces) =>
    [`${makeSpaces(spaces)}+ ${item.key}: ${valueToString(item.curValue, spaces)}`,
      `${makeSpaces(spaces)}- ${item.key}: ${item.oldValue}`],
  equal: (item, spaces) =>
    `${makeSpaces(spaces)}  ${item.key}: ${item.curValue}`,
};

const result = (ast, spaces = 2) =>
  ast.map(item => keyTypes[item.type](item, spaces, result));

const renderToStructuredText = ast => `${['{', ..._.flatten(result(ast)), '}'].join('\n')}\n`;

export default renderToStructuredText;
