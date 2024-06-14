import preprocessScript from "./preprocessScript";
import requestPexelsApi from "./requestPexelsApi";

const getLinks = async (script, noVideos = 50, quality = "_720p") => {
  const keywords = preprocessScript(script);

  for (let i = 0; i < keywords.length; i++) {
    let apiRes;

    while (keywords[i].split(" ").length > 0) {
      apiRes = await requestPexelsApi(keywords[i], noVideos);

      if (apiRes["total_results"] >= 0) {
        break;
      }

      const words = keywords[i].split(" ").slice(1, keywords.length);

      keywords[i] = words.join(" ").trim();
    }

    const snippt = document.createElement("li");

    let header = document.createElement("h3");
    header.innerHTML = keywords[i];
    snippt.appendChild(header);

    const links = document.createElement("ul");

    for (let j = 0; j < noVideos; j++) {
      if (j < apiRes["total_results"]) {
        const listItem = document.createElement("li");
        const anc = document.createElement("a");

        anc.href = apiRes.videos[j]["url"];
        anc.innerHTML = `Link ${j + 1}`;
        anc.target = "_blank";

        listItem.appendChild(anc);
        links.appendChild(listItem);

        // hidden links for download all
        let autoDownloadLink = apiRes.videos[j]["video_files"].filter(
          (video) => video["quality"] === "hd"
        );

        // if video quality not found, get the any quality
        if (autoDownloadLink.length === 0) {
          autoDownloadLink = apiRes.videos[j]["video_files"][0]["link"];
        } else {
          autoDownloadLink = autoDownloadLink[0]["link"];
        }

        const hiddenDiv = document.getElementById("hidden-links");

        const hiddenLink = document.createElement("a");
        hiddenLink.href = autoDownloadLink;
        hiddenLink.innerHTML = keywords[i];
        hiddenLink.hidden = true;

        hiddenDiv.appendChild(hiddenLink);
      }
    }

    snippt.appendChild(links);

    document.getElementById("links-textarea").appendChild(snippt);
  }
};

export default getLinks;
