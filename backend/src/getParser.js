import ini from 'ini';
import yaml from 'js-yaml';

const parsersList = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default typeOfFile => parsersList[typeOfFile];
