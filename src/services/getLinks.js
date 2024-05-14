import preprocessScript from "./preprocessScript";
import requestApi from "./requestApi";

const getLinks = (script, quality = "", noVideos = 3) => {
  // const keywords = preprocessScript(script);
  const keywords = ["good teacher"];

  keywords.forEach(async (keyword) => {
    alert(await requestApi(keyword));
  });
};

export default getLinks;
