import os
from natsort import natsorted
from convert import convert_file
import requests

API_TOKEN = open('./.env', "r").read()

API_URL = "https://api-inference.huggingface.co/models/jonatasgrosman/wav2vec2-large-xlsr-53-chinese-zh-cn"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

file_name = "sample1.flac"
if file_name.split('.')[0] not in os.listdir():
    convert_file(file_name)

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

full_text = []

for flac_audio in natsorted(os.listdir('./sample1')):
    print(f"transcribing {flac_audio}")
    output = query(f"./sample1/{flac_audio}")
    full_text.append(f"{output['text']}。")

print(" ".join(full_text))
