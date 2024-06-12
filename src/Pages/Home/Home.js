import axios from "axios";
import fs from "fs";
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

    axios({
      url: hiddenLinks[0].href,
      method: "GET",
      responseType: "stream", // Important: responseType must be 'stream' to handle binary files
    })
      .then((response) => {
        // Create a writable stream and pipe the response data to it
        const writer = fs.createWriteStream("video.mp4");
        response.data.pipe(writer);

        // Handle successful response
        writer.on("finish", () => {
          console.log("Video downloaded successfully");

          fs.rename("nature.mp4", "D:/Media/pexels/nature.mp4", (err) => {
            if (err) {
              console.error("Error moving file", err);
            } else {
              console.log("File saved to destination");
            }
          });
        });

        // Handle errors
        writer.on("error", (err) => {
          console.error("Error downloading video", err);
        });
      })
      .catch((err) => {
        console.error("Error downloading video", err);
      });
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
