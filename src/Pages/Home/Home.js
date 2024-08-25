import getLinks from "../../services/getLinks";
import "./Home.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

const Home = () => {
  const [folder, setFolder] = useState({ files: {} });
  const [downloadedVideosPercent, setdownloadedVideosPercent] = useState(0);
  const [keywordsLength, setkeywordsLength] = useState(1);
  const [noVideos, setNoVideos] = useState(1);
  const [videoOrientation, setVideoOrientation] = useState("landscape");

  const getVideos = async (event) => {
    event.preventDefault();

    document.getElementById("links-textarea").innerHTML = "";

    const scriptInput = document.getElementById("script-input").value;

    setkeywordsLength(await getLinks(scriptInput, noVideos, videoOrientation));
  };

  const downloadAllVideos = async () => {
    const downloadAllButton = document.getElementById("download-all");
    downloadAllButton.disabled = true;
    downloadAllButton.innerHTML = "Loading...";
    downloadAllButton.style.background = "#20b340";

    const hiddenLinks = document.getElementById("hidden-links").children;

    const newFolder = { files: {} };
    const finished = { count: 0 };

    const allFiles = [];
    for (let i = 0; i < hiddenLinks.length; i++) {
      const fileName = `videos/${hiddenLinks[i].innerHTML}/${
        hiddenLinks[i].innerHTML
      }${i + 1}.mp4`;

      allFiles.push(
        downloadFile(hiddenLinks[i].href).then((fileBlob) => {
          newFolder.files = { ...newFolder.files, [fileName]: fileBlob };

          finished["count"]++;
          const newPercent = Math.ceil(
            (finished["count"] / (noVideos * keywordsLength)) * 100
          );
          setdownloadedVideosPercent(newPercent);
        })
      );
    }

    Promise.all(allFiles).then((results) => {
      setFolder(newFolder);

      downloadAllButton.disabled = false;
      downloadAllButton.innerHTML = "Download All Videos";
      downloadAllButton.style.background = "#0f0";
    });
  };

  const downloadFile = async (url) => {
    try {
      const response = await fetch(url);
      const fileBlob = await response.blob();

      return new Promise((resolve) => {
        resolve(fileBlob);
      });
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    const createZip = () => {
      const zip = new JSZip();

      // Add files to the zip object
      Object.keys(folder.files).forEach((filename) => {
        zip.file(filename, folder.files[filename]);
      });

      // Generate the zip file asynchronously
      zip
        .generateAsync({ type: "blob" })
        .then((content) => {
          // Save and download the zip file
          saveAs(content, "folder.zip");
        })
        .catch((error) => {
          console.error("Error creating zip file:", error);
        });
    };

    if (Object.keys(folder.files).length > 0) {
      createZip();
    }
  }, [folder]);

  return (
    <div className="home-container">
      <h1>Stock Video Assistance Bot - Pexels</h1>
      <form onSubmit={getVideos}>
        <label>
          Enter Your Script:
          <textarea
            id="script-input"
            required
            placeholder="Enter Your Script Here."
          />
        </label>
        <label className="label-field">
          Number of Videos:
          <input
            type="number"
            className="input-field"
            value={noVideos}
            onChange={(event) => setNoVideos(event.target.value)}
          />
        </label>

        <label className="label-field">
          Video Orientation:
          <select
            type="number"
            className="input-field"
            value={videoOrientation}
            onChange={(e) => setVideoOrientation(e.target.value)}
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </label>
        <br />
        <input type="submit" />
      </form>
      <button id="download-all" onClick={downloadAllVideos}>
        Download All Links
      </button>
      <div style={{ height: "3vh" }}></div>
      <ProgressBar
        bgColor="#0f0"
        labelColor="black"
        baseBgColor="#333"
        width="700px"
        margin="20px 0"
        completed={downloadedVideosPercent}
      />
      <ul id="links-textarea"></ul>
      <div id="hidden-links" hidden={true}></div>
    </div>
  );
};

export default Home;
