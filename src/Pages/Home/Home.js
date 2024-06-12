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
      fetch(hiddenLinks[i].href)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.style.display = "none";
          a.href = blobUrl;
          a.download = `${hiddenLinks[i].innerHTML}${i + 1}.mp4`;
          document.body.appendChild(a);
          a.click();

          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        })
        .catch((err) => console.error("Error downloading video", err));
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
      <button className="download-all" onClick={downloadAllVideos}>
        Download All Links
      </button>
      <ul id="links-textarea"></ul>
      <div id="hidden-links" hidden={true}></div>
    </div>
  );
};

export default Home;
