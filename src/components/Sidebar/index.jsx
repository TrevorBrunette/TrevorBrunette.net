import "./index.scss"
import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Sidebar() {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <h1 className="logo-t"><b>T</b></h1>
        <h2 className="logo-sub">Trevor<br/>Brunette</h2>
      </Link>
      <nav>
        <NavLink className="home-link" exact="true" activeclassname="active" to="/">
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink className="about-link" exact="true" activeclassname="active" to="/about">
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
        <NavLink className="contact-link" exact="true" activeclassname="active" to="/contact">
          <FontAwesomeIcon icon={faEnvelope} />
        </NavLink>
      </nav>
      <ul>
        <li>
          <a target="_blank" rel="noreferrer" href="https://github.com/TrevorBrunette">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/trevor-brunette/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;