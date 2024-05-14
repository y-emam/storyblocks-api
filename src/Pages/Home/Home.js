import { useState } from "react";
import getLinks from "../../services/getLinks";
import "./Home.css";

const Home = () => {
  const [links, setLinks] = useState(<h1>Some Testing</h1>);
  const getVideos = (event) => {
    event.preventDefault();

    // todo: uncomment these line
    // const scriptInput = document.getElementById("script-input").value;
    // const qualityVideo = '720p';
    // const noVideos = 3;

    const scriptInput = `
      However, as the weeks turned into months, [time passing rapidly]
  the tingling gradually intensified, [increasing tingling sensation]
  evolving into a constant, unrelenting numbness [numb feet close-up]
  that began to steal the joy from my days. [joyless teacher]
  `;

    getLinks(scriptInput, setLinks);
  };
  return (
    <div>
      <h1>StoryBlocks API</h1>
      <form onSubmit={getVideos}>
        <label>
          Enter Your Script:
          <textarea id="script-input" />
        </label>
        <input type="submit" />
      </form>
      <ul id="links-textarea"></ul>
    </div>
  );
};

export default Home;
