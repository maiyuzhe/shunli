from pathlib import PurePath
from pydub import AudioSegment
import os
from pydub import AudioSegment
from pydub.silence import split_on_silence
import fleep
 

def convert_file(file_name):
    file_type = file_name.split(".")[1]
    with open(file_name, "rb") as f:
        info = fleep.get(f.read(128))
    print(info.mime)
    print(f"conversion process started for {file_name} of type {file_type}")
    if file_type == "flac":
        file_path = file_name

        flac_tmp_audio_data = AudioSegment.from_file(file_path, file_path.suffix[1:])

        flac_tmp_audio_data.export(file_path.name.replace(file_path.suffix, "") + ".wav", format="wav")
        print('flac converted to wav.')
    if file_type =="mp3":
        print("Starting mp3 conversion")
        src = file_name
        dst = f"{file_name.split('.')[0]}.wav"  
        print("Audio segmenting")                                                   
        sound = AudioSegment.from_mp3(src)
        print("Exporting audio...")
        sound.export(dst, format="wav")

        print('mp3 converted to wav')

    if file_type == "webm":
        dst = file_name.split(".")[0]
        sound = AudioSegment.from_file(file_name, "webm")
        sound.export(f"{dst}.wav", format="wav")

    if file_type == "wav":
        print("This is a wav file")

    print(f"{file_name} passed initial checks")

    new_directory = file_name.split('.')[0]

    if new_directory not in os.listdir():
        os.mkdir(new_directory)
    
    print("Directory created")

    sound_file = AudioSegment.from_wav(f"{new_directory}.wav")

    audio_chunks = split_on_silence(sound_file, min_silence_len=1000, silence_thresh=-40 )
    
    for i, chunk in enumerate(audio_chunks):
        out_file = f"{new_directory}/{i}.flac".format(i)
        print("exporting", out_file)
        chunk.export(out_file, format="flac")
        # audio = AudioSegment.from_wav(f"{new_directory}/chunk{i}.wav")
        # audio.export(f"{new_directory}/chunk{i}.flac",format = "flac")
    os.remove(f"{new_directory}.wav")
