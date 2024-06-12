import getLinks from "../../services/getLinks";
import "./Home.css";

const Home = () => {
  const getVideos = (event) => {
    event.preventDefault();

    document.getElementById("links-textarea").innerHTML = "";

    const scriptInput = document.getElementById("script-input").value;

    getLinks(scriptInput);
  };

  const downloadAllVideos = async () => {
    const hiddenLinks = document.getElementById("hidden-links").children;

    for (let i = 0; i < hiddenLinks.length; i++) {
      window.open(hiddenLinks[i].href);
    }
  };

  return (
    <div>
      <h1>StoryBlocks API</h1>
      <form onSubmit={getVideos}>
        <label>
          Enter Your Script:
          <textarea
            id="script-input"
            required
            placeholder="Enter Your Script Here."
          />
        </label>
        <input type="submit" />
      </form>
      <ul id="links-textarea"></ul>
      <div id="hidden-links" hidden={true}></div>
      <button className="download-all" onClick={downloadAllVideos}>
        Download All Links
      </button>
    </div>
  );
};

export default Home;
