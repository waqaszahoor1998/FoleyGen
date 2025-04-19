import React from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { useState, useEffect } from "react";
import LoadingBar from "./loading";
import "./ffmpg.css";
//--------------------------------loading ffmpeg attributes---------------------------------------------
function Ffmpeg() {
  const [videoSrc, setVideoSrc] = useState("");
  //upload file functionality
  const [imageFile, setImageFile] = useState({});
  const [soundFile, setSoundFile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Video Src", videoSrc);
  }, [videoSrc]);

  const ffmpeg = createFFmpeg({
    log: true,
  });

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleChangeSound = (e) => {
    const file = e.target.files[0];
    setSoundFile(file);
  };

  const uploadSound = (e) => {
    document.getElementById("selectSound").click();
  };

  const uploadVideo = (e) => {
    document.getElementById("selectVideo").click();
  };

  //---------------------------------giving and recieving data from server----------------------------
  const createVideo = async () => {
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "image.mp4", await fetchFile(imageFile));

    // send the image file to flask a form data
    const formData = new FormData();
    // formData.append("image", imageFile);
    setLoading(true);
    formData.append("video", imageFile);
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const responseVideo = await response.blob();
        setVideoSrc(URL.createObjectURL(responseVideo));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });

    // ffmpeg.FS("writeFile", "sound.mp3", await fetchFile(soundFile));

    // const filtergraph = `[0:a]volume=1:enable='between(t,0,90)'[a1];
    //                         [1:a]volume=0:enable='between(t,10,30)'[a2];
    //                         [a1][a2]amix=inputs=2[aout]`;

    // await ffmpeg.run(
    //   "-i",
    //   "image.mp4",
    //   "-i",
    //   "sound.mp3",
    //   "-filter_complex",
    //   filtergraph,
    //   "-map",
    //   "0:v:0",
    //   "-map",
    //   "[aout]",
    //   "-c:v",
    //   "copy",
    //   "test.mp4"
    // );
    // const data = ffmpeg.FS("readFile", "test.mp4");
  };

  //   const createVideo = async () => {
  //     console.log("ffmpeg");
  //     await ffmpeg.load();
  //     ffmpeg.FS("writeFile", "image.mp4", await fetchFile(imageFile));
  //     ffmpeg.FS("writeFile", "sound.mp3", await fetchFile(soundFile));

  //     console.log("ffmpeg");
  //     // // printf("FFFF");
  //     // // send mp4 file to flask
  //     // fetch('http://127.0.0.1:5000/upload', {
  //     //   method: 'POST',
  //     //   body: ffmpeg.FS('readFile', 'image.mp4'),
  //     // })
  //     // .then(response => {
  //     //   // Handle the response from the Flask server
  //     //   console.log(response);
  //     // })
  //     // .catch(error => {
  //     //   // Handle any errors that occur during the POST request
  //     //   console.error(error);
  //     // });

  //     // Select the video file input element
  // const fileInput = document.querySelector('image.mp4');

  // // When the file input changes, send the video file to the Flask server
  // fileInput.addEventListener('change', () => {
  //   // Create a new form data object
  //   const formData = new FormData();

  //   // Append the video file to the form data object
  //   formData.append('video', fileInput.files[0]);

  //   // Send a POST request to the Flask server with the form data
  //   fetch('/http://127.0.0.1:5000/upload', {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(response => {
  //     // Handle the response from the Flask server
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     // Handle any errors that occur during the POST request
  //     console.error(error);
  //   });
  // });

  //     const filtergraph = `[0:a]volume=1:enable='between(t,0,90)'[a1];
  //                             [1:a]volume=0:enable='between(t,10,30)'[a2];
  //                             [a1][a2]amix=inputs=2[aout]`;

  //     await ffmpeg.run(
  //       "-i",
  //       "image.mp4",
  //       "-i",
  //       "sound.mp3",
  //       "-filter_complex",
  //       filtergraph,
  //       "-map",
  //       "0:v:0",
  //       "-map",
  //       "[aout]",
  //       "-c:v",
  //       "copy",
  //       "test.mp4"
  //     );
  //     const data = ffmpeg.FS("readFile", "image.mp4");
  //     setVideoSrc(
  //       URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
  //     );
  //   };

  //-----------------------------------displaying the video----------------------------------------

  return (
    <div className="ffmpg">
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="App">
          <h1 className="top-heading">Upload your video</h1>
          <video
            className="video-container"
            src={videoSrc}
            // width="700"
            // height="700"
            controls
          ></video>
          <div className="App-row">
            <div title="Upload video" className="row-element">
              <i className="fa fa-upload black fa-lg" onClick={uploadVideo}></i>
              <input
                type="file"
                id="selectVideo"
                style={{
                  display: "none",
                }}
                accept="video/*"
                onChange={handleChangeImage}
              />
            </div>
            <div title="Upload music" className="row-element">
              <i
                className="fa-solid fa-music black fa-lg"
                onClick={uploadSound}
              ></i>
              <input
                type="file"
                id="selectSound"
                style={{
                  display: "none",
                }}
                accept="sound/*"
                onChange={handleChangeSound}
              />
            </div>
          </div>
          <div className="App-row1">
            <button className="btn--create" onClick={createVideo}>
              Create Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ffmpeg;
