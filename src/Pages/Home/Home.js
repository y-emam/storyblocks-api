import getLinks from "../../services/getLinks";
import "./Home.css";

const Home = () => {
  const getVideos = (event) => {
    event.preventDefault();

    document.getElementById("links-textarea").innerHTML = "";

    const scriptInput = `
      However, as the weeks turned into months, [time passing rapidly]
  the tingling gradually intensified, [increasing tingling sensation]
  evolving into a constant, unrelenting numbness [numb feet close-up]
  that began to steal the joy from my days. [joyless teacher]
  lkadjflksdfjadslkfjdsaklfj. [hiker on scenic trail]
  `;

    getLinks(scriptInput);
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
