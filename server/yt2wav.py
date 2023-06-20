# importing packages
from pytube import YouTube
import os

def yt2wav(url):
    yt = YouTube(url)
    # extract only audio
    video = yt.streams.filter(only_audio=True).first()

    # check for destination to save file
    print("Enter the destination (leave blank for current directory)")
    destination = str(input(">> ")) or '.'

    # download the file
    out_file = video.download(output_path=destination)

    # save the file
    base, ext = os.path.splitext(out_file)
    new_file = base + '.wav'
    os.rename(out_file, new_file)

    # result of success
    print(yt.title + " has been successfully downloaded.")

yt2wav("https://www.youtube.com/watch?v=e-ORhEE9VVg&ab_channel=TaylorSwiftVEVO")
