const renderValue = value => (typeof value === 'object' ? 'complex value' : `value: ${value}`);

const itemName = (item, name) => ((name === undefined) ? item.key : `${name}.${item.key}`);

const keyTypes = {
  nested: (item, name, f) =>
    f(item.curValue, itemName(item, name)),
  removed: (item, name) =>
    `Property '${itemName(item, name)}' was removed\n`,
  added: (item, name) =>
    `Property '${itemName(item, name)}' was added with ${renderValue(item.curValue)}\n`,
  updated: (item, name) =>
    `Property '${itemName(item, name)}' was updated. From value: ${item.oldValue} to ${renderValue(item.curValue)}\n`,
  equal: () => '',
};

const renderToPlain = (ast, name) =>
  ast.map(item => keyTypes[item.type](item, name, renderToPlain)).join('');

export default renderToPlain;
