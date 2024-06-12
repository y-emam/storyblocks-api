import getLinks from "../../services/getLinks";
import "./Home.css";

const Home = () => {
  const getVideos = (event) => {
    event.preventDefault();

    document.getElementById("links-textarea").innerHTML = "";

    const scriptInput = document.getElementById("script-input").value;

    getLinks(scriptInput);
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
      <button className="download-all">Download All Links</button>
    </div>
  );
};

export default Home;
