import path from 'path';
import getParser from './getParser';
import iterAst from './compareParsedData';
import getRender from './rendersToOutputFormats';

export default (file1, file2, outputFormat) => {
  const typeOfFile = path.extname(file1.originalname).slice(1);
  const dataOfFile1 = file1.buffer.toString('utf8');
  const dataOfFile2 = file2.buffer.toString('utf8');
  const parse = getParser(typeOfFile);
  const parsedDataOfFile1 = parse(dataOfFile1);
  const parsedDataOfFile2 = parse(dataOfFile2);
  const render = getRender(outputFormat);
  return render(iterAst(parsedDataOfFile1, parsedDataOfFile2));
};
