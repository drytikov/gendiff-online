import renderToSructuredText from '../rendersToOutputFormats/renderToStructuredText';
import renderToPlain from '../rendersToOutputFormats/renderToPlain';

export default (outputFormat) => {
  const outputFormatsList = {
    sructuredText: renderToSructuredText,
    plain: renderToPlain,
  };
  return outputFormatsList[outputFormat];
};
