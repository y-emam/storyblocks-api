const preprocessScript = (script) => {
  const keywords = [];
  const sentences = script.trim().split("[");

  const wordsToRemoveArr = ["animation", "video"];

  for (let i = 1; i < sentences.length; i++) {
    let word = sentences[i].trim().split("]")[0];

    if (!wordsToRemoveArr.includes(word.toLowerCase())) {
      keywords.push(word);
    }
  }

  return keywords;
};

export default preprocessScript;
