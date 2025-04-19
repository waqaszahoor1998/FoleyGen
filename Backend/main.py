from models import add_audio_to_video
from models import create_midi
from models import getActions
from flask import Flask, request

app = Flask(__name__)


@app.route('/upload', methods=['POST'])
def upload():
    # print("Here")
    # Get the video file from the request
    video = request.files['video']

    # Save the video file to the server's file system
    video.save('uploaded_video.mp4')

    # Return a response to the client
    return 'Video uploaded successfully!'

@app.route('/')
def hello():
    return 'Hello, World!'

#create a flask route to add audio to video

@app.route('/add_audio_to_video')

def add_audio_to_video_route():
    
    return "Audio added to video"

#create main function


if __name__ == '__main__':
    app.run(debug=True)



