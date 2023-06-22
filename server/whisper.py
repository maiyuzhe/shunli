import os
from natsort import natsorted
from convert import convert_file
import requests
import json
import shutil

API_TOKEN = open('./.env', "r").read()

API_URL = "https://api-inference.huggingface.co/models/jonatasgrosman/wav2vec2-large-xlsr-53-chinese-zh-cn"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

def clean_up(file_name):
    if f'{file_name}.mp3' in os.listdir():
        os.remove(f'{file_name}.mp3')
    if f'{file_name}.wav' in os.listdir():
        os.remove(f'{file_name}.wav')
    shutil.rmtree(file_name)


def speech_to_text(url):
    file_data = requests.get(url)
    file_name = url.split('/')[4]
    with open(f'{file_name}.mp3', 'wb') as f:
        f.write(file_data.content)

    if file_name not in os.listdir():
        convert_file(f'{file_name}.mp3')
    else:
        os.remove(f'{file_name}.mp3')

    full_text = []

    for flac_audio in natsorted(os.listdir(f'./{file_name}')):
        output = query(f"./{file_name}/{flac_audio}")
        if "text" not in output:
            print(output)        
            print("API unavailable")
        else:
            print(f"transcribing {flac_audio}")
            print(output["text"])
            full_text.append(f"{output['text']}。")

    transcribed_text = str(" ".join(full_text))
    if transcribed_text =="":
        transcribed_text = "API Error, please transcribe again"
        print("API Offline")
    else:
        clean_up(file_name)

    print(transcribed_text)

    return transcribed_text

def test():
    return "test"


