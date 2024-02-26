import "./index.scss"
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container about-page">
      <div className="text-zone">
        <h1>
          About me
        </h1>
        <p>
          I am an ambitious software engineer interested in systems-level
          programming. I am proud to work with Western Digital as a Senior
          Embedded Software Engineer.
        </p>
        <p>
          I enjoy working with Java, C, C++, and Rust. I also have experience in
          Python, JavaScript, I have programmed a variety
          of open source software in these languages; see descriptions of some of
          my work in the projects section below.
        </p>
        <h1>Projects</h1>
        <h2><Link to="https://github.com/ezasm-org/ezasm">EzASM</Link></h2>
        <p>
          The goal of this project is to create a small-instruction-set
          programming language interpreter written in Java with a GUI interface
          for inspecting the current state of the environment. This simple
          interpreted language would be able to demonstrate the concepts of a
          lower level assembly language while still being easier to write. The
          instructions would be intuitive and simple compared to MIPS (e.g., no
          system calls or immediate limits) and act upon virtual registers akin to
          other assembly languages.
        </p>
        <p>
          I personally worked as the project lead and maintainer, writing code in
          Java to bring the project to life. My contributions include but are not
          limited to: the transformation representation of instructions (allowing
          for perfectly back-trackable code), a majority of the user interface for
          the application, the console GUI, the memory viewer, the register
          viewer, a finite-state-machine used to highlight code, the lexer, the
          parser, the instruction representation, the simulated processor, and the
          compilation/build scripts.

        </p>

        <h2><Link to="https://github.com/ezasm-org/rezasm">REzASM</Link></h2>
        <p>
          A port of the EzASM programs written in Rust. I personally worked with
          Rust, JavaScript, and ReactJS, and WASM to build the backbone of this
          project. I have written many aspects of the software such as: the
          build system, the Tauri / WASM-agnostic JavaScript x Rust interface,
          the lexer, the parser, the simulated CPU, the instruction definition
          macro, a basic cli core, a tauri core, and a WASM core.
        </p>
      </div>
    </div>
  );
}

export default About;
