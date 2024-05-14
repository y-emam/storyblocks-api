import "./Home.css";

const Home = () => {
  const getVideos = () => {
    const scriptInput = document.getElementById("script-input").value;

    alert(scriptInput);
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
    </div>
  );
};

export default Home;
