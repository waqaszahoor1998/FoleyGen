# create a simple flask server
from flask import Flask, render_template, request, jsonify, send_file
import json
import os
import sys
import cv2
import time
# use cors to allow cross origin resource sharing
from flask_cors import CORS, cross_origin
from Action_Recognition import *
import requests
from models import *
from Action_Recognition.poseDetection import *

#------------------------------------------creating backend api---------------------------------------------

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

@app.route('/upload', methods=['POST'])
def index():
    file = request.files['video']
    # save the file
    file.save(os.path.join('uploads', file.filename))
    video_path= os.path.join('uploads', file.filename)
    print(video_path)

    lrcn_model = load_model('project/autofoley/video_lrcn/lrcns.h5')

#------------------------ Perform Single Prediction on the Test Video.--------------------------------------
    predicted_label,video_time_duration = predict_single_action(lrcn_model, video_path)
    predicted_class_name = CLASSES_LIST[predicted_label]
    #-----------------------------selecting themodel to be used------------------------------
    if(predicted_class_name=='walk' or predicted_class_name=='ride_bike'):
        addVoices(video_path)
        filename = 'output.mp4'
        return send_file(filename, as_attachment=True)
        
    elif (predicted_class_name=='PlayingPiano'):
        add_audio_to_video(video_path, predicted_label,video_time_duration)
        filename = 'new_filename.mp4'
        return send_file(filename, as_attachment=True)
    else:
        return send_file(video_path, as_attachment=True)
        
        
# create main function
def main():
    # run flask server
    app.run(debug=True)

# run main function
if __name__ == '__main__':
    main()

