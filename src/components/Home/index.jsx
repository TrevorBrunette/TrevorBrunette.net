import "./index.scss"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          Hi, I'm
          <br/>
          <p className="big-name">Trevor Brunette, </p>
          software engineer
        </h1>
        <h2>Embedded Software Engineer | C/C++ Practitioner | Java Expert</h2>
        <Link to="/contact" className="flat-button">CONTACT ME</Link>
      </div>
    </div>
  );
}

export default Home;
