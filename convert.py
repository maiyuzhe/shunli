from pathlib import PurePath
from pydub import AudioSegment
import os
from pydub import AudioSegment
from pydub.silence import split_on_silence
 

file_name = "sample3.flac"
def convert_file(file_name):
    if file_name.split('.')[1] == "flac":
        file_path = PurePath("sample1.flac")

        flac_tmp_audio_data = AudioSegment.from_file(file_path, file_path.suffix[1:])

        flac_tmp_audio_data.export(file_path.name.replace(file_path.suffix, "") + ".wav", format="wav")
        print('flac converted to wav.')
    if file_name.split('.')[1] =="mp3":
        src = file_name
        dst = "sample1.wav"                                                     
        sound = AudioSegment.from_mp3(src)
        sound.export(dst, format="wav")

        print('mp3 converted to wav')

    new_directory = file_name.split('.')[0]

    if new_directory not in os.listdir():
        os.mkdir(new_directory)

    sound_file = AudioSegment.from_wav("sample1.wav")
    audio_chunks = split_on_silence(sound_file, min_silence_len=1000, silence_thresh=-40 )
    
    for i, chunk in enumerate(audio_chunks):
        out_file = f"{new_directory}/{i}.flac".format(i)
        print("exporting", out_file)
        chunk.export(out_file, format="flac")
        # audio = AudioSegment.from_wav(f"{new_directory}/chunk{i}.wav")
        # audio.export(f"{new_directory}/chunk{i}.flac",format = "flac")
