from io import BytesIO
from flask import Flask, render_template, send_file, request, make_response
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_cors import CORS
from whisper import speech_to_text, test
import validators
from yt2wav import yt2wav

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
	@validates("filename")
	def validates_filename(self, key, filename):
		if filename not in Upload.query.all():
			return filename
		raise ValueError("File name already exitsts")

class Transcription(db.Model):
  __tablename__ = "transcriptions"
  id = db.Column(db.Integer, primary_key=True)
  filename = db.Column(db.String(50))
  transcription = db.Column(db.String(50))
  @validates("transcription")
  def validates_transcription(self, key, transcription):
    if transcription != "":
      return transcription
    raise ValueError("Transcription Blank!")
  @validates("filename")
  def validates_filename(self, key, filename):
    if filename not in Transcription.query.all():
      return filename
    raise ValueError("File name already exitsts")

class UploadFile(Resource):
	def post(self):
		try:
			new_file = ""
			if request.is_json:
				audio_name = yt2wav(request.json['url'])
				new_file = open(f"./{audio_name}.wav", "rb")
				print(new_file)
				upload = Upload(
					filename = audio_name,
					data = new_file.read()
				)
				db.session.add(upload)
				db.session.commit()
				return {
					"filename": upload.filename,
					"id": upload.id
					}, 201
			else:
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
		except:
			return {"error": "File already exists in database"}, 400
	def get(self):
		try:
			audio_files = [{"id": upload.id, "filename": upload.filename} for upload in Upload.query.all()]
			return make_response(audio_files, 200)
		except:
			return {"error": "Database empty"}, 400
api.add_resource(UploadFile, '/audio_stream')

class DownloadById(Resource):
	def get(self, id):
		upload = Upload.query.filter_by(id=id).first()

		file_data = BytesIO(upload.data)
		file_data.seek(0)

		return send_file(file_data, download_name=upload.filename, mimetype='audio/mpeg')
	def delete(self, id):
		try:
			upload = Upload.query.filter_by(id=id).first()
			db.session.delete(upload)
			db.session.commit()
			return {"Success": f"{upload.filename} deleted!"}, 204
		except:
			return {"Error": "File not found"}, 404
api.add_resource(DownloadById, '/audio_stream/<int:id>')

class TransciptionById(Resource):
	def get(self, id):
		try:
			transcription = Transcription.query.filter_by(id=id).first()
			return(transcription.transcription)
		except:
			return {"error": "Transcription does not exist"}, 404
	def patch(self, id):
		try:
			transcription = Transcription.query.filter_by(id=id).first()
			print(transcription)
			transcript = speech_to_text(f'http://localhost:5000/audio_stream/{id}')
			transcription.transcription = transcript
			print(transcription)
			db.session.add(transcription)
			db.session.commit()
			return {"transcription": transcript}, 201
		except:
			return {"error": "transcription error"}, 400
api.add_resource(TransciptionById, '/transcriptions/<int:id>')

class Transcriptions(Resource):
	def post(self):
		print(request.is_json)
		print(request.headers)
		print(request.json)
		audio = request.json['audio_id']
		filename = request.json['filename']
		transcription = "Press Transcribe!"
		audio_name = filename
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