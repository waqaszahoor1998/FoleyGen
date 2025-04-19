import React from "react";
import "../../App.js";
import Footer from "../Footer";
import Ffmpeg from "../ffmpg.js";
import VideoEditing from "../VideoEditing.js";

export default function EditVideo() {
  return (
    <>
      <div className="edit">
        <div className="edit-item">
          <Ffmpeg />
        </div>
      </div>
      <Footer />
    </>
  );
}
