import React from "react";
import "../../App.css";
import Footer from "../Footer";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <div className="about">
        <h2>ABOUT US</h2>
        <p>
          Our Project aims to provide auomatic solution to the sound effect
          addition to human actions in videos. We aim to provide our users with
          an easy to understand and use solution. You can use our app to make
          your videos llvely and attractive to th audience with a few clicks.
        </p>
        <h2>HOW IT WORKS?</h2>
        <p>
          You can get automatic sound effects to the human actions in your video
          by clicking on the upload video icon. And if you simply want to add
          background music you can upload music from the music icon in the Edit
          page along with the video. After uploading video and background music,
          Click on create video button.
        </p>
        <h2>OUR TEAM</h2>
        <p>
          We are a team of three. We worked together for the achevement of our
          set goals of autimatic video editing.<br></br>
          <br></br>
          Muhammad Waqas Zahoor <Link>waqaszahoor26@gmail.com</Link>
          <br></br>
          Muhammad Faizan <Link>email</Link>
          <br></br>
          <br></br>
          Our Supervisor for the project guidance and advice.
          <br></br>
          sir <Link>email</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
