const preprocessScript = (script) => {
  const keywords = [];
  const sentences = script.trim().split("[");

  const wordsToRemoveArr = ["animation", "video"];

  for (let i = 1; i < sentences.length; i++) {
    let words = sentences[i].trim().split("]")[0].split(" ");

    let temp = [];

    for (let i = 0; i < words.length; i++) {
      if (!wordsToRemoveArr.includes(words[i].toLowerCase())) {
        temp.push(words[i]);
      }
    }

    keywords.push(temp.join(" "));
  }

  return keywords;
};

export default preprocessScript;
