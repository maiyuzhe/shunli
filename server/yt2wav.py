# importing packages
from pytube import YouTube
import os

def yt2wav(url):
    yt = YouTube(url)
    # extract only audio
    video = yt.streams.filter(only_audio=True).first()

    destination = '.'

    # download the file
    out_file = video.download(output_path=destination)

    # save the file
    new_file = yt.title.replace(" ", "_") + '.wav'
    os.rename(out_file, new_file)

    # result of success
    print(yt.title.replace(" ", "_") + " has been successfully downloaded.")
    return yt.title.replace(" ", "_")
