const preprocessScript = (script) => {
  const keywords = [];
  const sentences = script.trim().split("[");

  for (let i = 1; i < sentences.length; i++) {
    keywords.push(sentences[i].trim().split("]")[0]);
  }

  return keywords;
};

export default preprocessScript;
