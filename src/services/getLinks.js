import preprocessScript from "./preprocessScript";
import requestApi from "./requestApi";

const getLinks = async (script, quality = "_720p", noVideos = 3) => {
  const keywords = preprocessScript(script);

  for (let i = 0; i < keywords.length; i++) {
    const apiRes = await requestApi(keywords[i]);

    const snippt = document.createElement("li");

    let header = document.createElement("h3");
    header.innerHTML = keywords[i];
    snippt.appendChild(header);

    const links = document.createElement("ul");

    for (let i = 0; i < noVideos; i++) {
      if (i < apiRes["total_results"]) {
        const listItem = document.createElement("li");
        const anc = document.createElement("a");

        anc.href = apiRes.results[i]["preview_urls"][quality];
        anc.innerHTML = `Link ${i + 1}`;
        anc.target = "_blank";

        listItem.appendChild(anc);
        links.appendChild(listItem);
      }
    }

    snippt.appendChild(links);

    document.getElementById("links-textarea").appendChild(snippt);
  }
};

export default getLinks;
