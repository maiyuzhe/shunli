import os
from natsort import natsorted
from convert import convert_file
import requests
import json

API_TOKEN = open('./.env', "r").read()

API_URL = "https://api-inference.huggingface.co/models/jonatasgrosman/wav2vec2-large-xlsr-53-chinese-zh-cn"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

file_name = "09-2.mp3"
if file_name.split('.')[0] not in os.listdir():
    convert_file(file_name)

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

directory = file_name.split('.')[0]

full_text = []

for flac_audio in natsorted(os.listdir(f'./{directory}')):
    output = query(f"./{directory}/{flac_audio}")
    if "text" not in output:
        print(output)        
        print("API unavailable")
    else:
        print(f"transcribing {flac_audio}")
        print(output["text"])
        full_text.append(f"{output['text']}。")

transcribed_text = " ".join(full_text)

json_entry = {
    "file": file_name,
    "text": transcribed_text
}
 
print (json_entry)

