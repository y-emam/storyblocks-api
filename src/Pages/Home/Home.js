import getLinks from "../../services/getLinks";
import "./Home.css";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [folder, setFolder] = useState({ files: {} });

  const getVideos = (event) => {
    event.preventDefault();

    document.getElementById("links-textarea").innerHTML = "";

    const scriptInput = document.getElementById("script-input").value;

    getLinks(scriptInput);
  };

  const downloadAllVideos = async () => {
    const hiddenLinks = document.getElementById("hidden-links").children;

    // for (let i = 0; i < hiddenLinks.length; i++) {
    //   fetch(hiddenLinks[i].href)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //       const blobUrl = window.URL.createObjectURL(blob);

    //       const a = document.createElement("a");
    //       a.style.display = "none";
    //       a.href = blobUrl;
    //       a.download = `${hiddenLinks[i].innerHTML}${i + 1}.mp4`;
    //       document.body.appendChild(a);
    //       a.click();

    //       window.URL.revokeObjectURL(blobUrl);
    //       document.body.removeChild(a);
    //     })
    //     .catch((err) => console.error("Error downloading video", err));
    // }

    for (let i = 0; i < hiddenLinks.length; i++) {
      await downloadFile(
        hiddenLinks[i].href,
        `${hiddenLinks[i].innerHTML}/${hiddenLinks[i].innerHTML}${i + 1}.mp4`
      );
    }

    createZip();
  };

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const fileBlob = await response.blob();

      // Update the folder state with the downloaded file
      setFolder((prevFolder) => ({
        files: {
          ...prevFolder.files,
          [filename]: fileBlob,
        },
      }));
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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
      {/* <button className="download-all" onClick={createZip}>
        Download All Links
      </button> */}
      <button className="download-all" onClick={downloadAllVideos}>
        Download All Links
      </button>
      <ul id="links-textarea"></ul>
      <div id="hidden-links" hidden={true}></div>
    </div>
  );
};

export default Home;
