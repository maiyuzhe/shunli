from io import BytesIO
from flask import Flask, render_template, send_file, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_cors import CORS
from whisper import speech_to_text
# from models import Upload, Transcription

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

CORS(app)
api = Api(app)

class Upload(db.Model):
    __tablename__ = "uploads"
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)

class Transcription(db.Model):
  __tablename__ = "transcriptions"
  id = db.Column(db.Integer, primary_key=True)
  filename = db.Column(db.String(50))
  transcription = db.Column(db.String(50))

class UploadFile(Resource):
    def post(self):
        new_file = request.files['file']

        upload = Upload(
            filename = new_file.filename,
            data = new_file.read()
        )
        db.session.add(upload)
        db.session.commit()
        return {
            "filename": upload.filename,
            "id": upload.id
            }, 201
    def get(self):
        audio_files = [{"id": upload.id, "filename": upload.filename} for upload in Upload.query.all()]
        return make_response(audio_files, 200)
api.add_resource(UploadFile, '/audio_stream')

class DownloadById(Resource):
    def get(self, id):
        upload = Upload.query.filter_by(id=id).first()

        file_data = BytesIO(upload.data)
        file_data.seek(0)

        return send_file(file_data, download_name=upload.filename, mimetype='audio/mpeg')
api.add_resource(DownloadById, '/audio_stream/<int:id>')

class TransciptionById(Resource):
    # def post(self, id):
    #     transcription = speech_to_text(f'http://localhost:5000/audio_stream/{id}')
    #     audio_name = f'{id}.mp3'
    #     new_transcription = Transcription(
    #         filename = audio_name,
    #         transcription = transcription
    #     )
    #     db.session.add(new_transcription)
    #     db.session.commit()
    #     return {
    #         "filename": new_transcription.filename,
    #         "id": new_transcription.id,
    #         "transcription": new_transcription.transcription
    #     }, 201
    def get(self, id):
        transcription = Transcription.query.filter_by(id=id).first()
        return(transcription.transcription)
api.add_resource(TransciptionById, '/transcriptions/<int:id>')

class Transcriptions(Resource):
    def post(self):
        print(request.is_json)
        print(request.headers)
        print(request.json)
        audio = request.json['audio_id']
        transcription = speech_to_text(f'http://localhost:5000/audio_stream/{audio}')
        audio_name = f'{audio}.mp3'
        new_transcription = Transcription(
            filename = audio_name,
            transcription = transcription
        )
        db.session.add(new_transcription)
        db.session.commit()
        return {
            "filename": new_transcription.filename,
            "id": new_transcription.id,
            "transcription": new_transcription.transcription
        }, 201
api.add_resource(Transcriptions, '/transcriptions') 