import os 
import pickle 
import numpy as np
import fluidsynth
import pretty_midi
import tensorflow as tf

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout, Activation, BatchNormalization
from tensorflow.keras.utils import to_categorical, plot_model
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.models import load_model

from music21 import converter, instrument, note, chord, stream
from IPython.display import Audio, display, Image
from matplotlib import pyplot as plt


def display_audio(pm: pretty_midi.PrettyMIDI, seconds=30):
    """
    This function takes a pretty_midi object and plays the audio file for 30 secs.
    Args : 
        pretty_midi object, and duration
    Returns: 
        Plays the audio
    
    """
    waveform = pm.fluidsynth(fs=_SAMPLING_RATE)
    waveform_short = waveform[:seconds*_SAMPLING_RATE]
    return display(Audio(waveform_short, rate=_SAMPLING_RATE))


#Set the random seed so as to get constant results. 
seed = 42
tf.random.set_seed(seed)
np.random.seed(seed)

# Sampling rate for audio playback, and sequence_length of the window . 
_SAMPLING_RATE = 44100
SEQUENCE_LENGTH = 50

#play the music to get the feel of the training data. 
pm = pretty_midi.PrettyMIDI('project/foleygen/music/midi_songs/FF4.mid')
display_audio(pm)

MIDI_FILES_DIR = '/content/drive/MyDrive/project/autofoley/music/midi_songs/'

