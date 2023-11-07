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
    if file_name in os.listdir():
        os.remove(file_name)
    shutil.rmtree(file_name.split(".")[0])


def speech_to_text(url, file_name):
    folder_name = file_name.split(".")[0]
    file_data = requests.get(url)
    with open(file_name, 'wb') as f:
        f.write(file_data.content)

    print(f"{file_name} downloaded")

    if folder_name not in os.listdir():
        print(f"creating folder: '{folder_name}'")
        convert_file(file_name)
    else:
        os.remove(file_name)
    print("conversion completed")

    full_text = []

    

    for flac_audio in natsorted(os.listdir(f'./{folder_name}')):
        output = query(f"./{folder_name}/{flac_audio}")
        try:
            print(f"transcribing {flac_audio}")
            print(output["text"])
            full_text.append(f"{output['text']}。")
        except:
            print(output)        
            print("API unavailable")

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


