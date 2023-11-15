from io import BytesIO
from flask import Flask, render_template, send_file, request, make_response
from sqlalchemy.orm import validates
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_cors import CORS
from whisper import speech_to_text
import validators
from yt2wav import yt2wav
from scraper import scrape
from models import db, Transcription, Upload, Vocabulary

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

CORS(app)
api = Api(app)

url = "http://localhost:5000"

class UploadFile(Resource):
	def post(self):
		try:
			#This is if it's a youtube video
			new_file = ""
			if request.is_json:
				print(request.json['email'])
				audio_name = yt2wav(request.json['url'])
				print(audio_name)
				new_file = open(f"./{audio_name}.wav", "rb")
				print(new_file)
				upload = Upload(
					filename = audio_name,
					data = new_file.read(),
					email = request.json['email']
				)
				db.session.add(upload)
				db.session.commit()
				return {
					"filename": upload.filename,
					"id": upload.id,
					"email": upload.email
					}, 201
			#This is for a recording or upload
			else:
				email = request.form.get('email')
				new_file = request.files['file']
				upload = Upload(
					filename = new_file.filename,
					data = new_file.read(),
					email = email
				)
				db.session.add(upload)
				db.session.commit()
				return {
					"filename": upload.filename,
					"id": upload.id,
					"email": upload.email
					}, 201
		except:
			return {"error": "File already exists in database"}, 400
api.add_resource(UploadFile, '/audio_stream')

class FetchUserUploads(Resource):
	def get(self, email):
		try:
			audio_files = [{"id": upload.id, "filename": upload.filename, "email": upload.email} for upload in Upload.query.filter_by(email=email)]
			return make_response(audio_files, 200)
		except:
			return {"error": "Database empty"}, 400
api.add_resource(FetchUserUploads, '/audio_stream/<string:email>')


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

class TranscriptionByUploadId(Resource):
	def post(self, upload_id):
		try: 
			print("starting transcription")
			transcription = speech_to_text(f'{url}/audio_stream/{upload_id}')
			print("starting next one")
			audio_name = json.request['filename']
			new_transcription = Transcription(
				filename = audio_name,
				transcription = transcription,
				upload_id = upload_id
			)
			db.session.add(new_transcription)
			db.session.commit()
			return {"success", new_transcription}, 200
		except:
			return {"error", "Transcription could not be completed."}, 400
	def get(self, upload_id):
		try:
			transcription = Transcription.query.filter_by(upload_id=upload_id).first()
			return{"transcription": transcription.transcription, "id" :transcription.id}, 200
		except:
			return {"error": "Transcription does not exist"}, 404
api.add_resource(TranscriptionByUploadId, '/transcriptions/upload/<int:upload_id>')

class TranscriptionById(Resource):
	def patch(self, id):
		try:
			transcription = Transcription.query.filter_by(id=id).first()
			transcript = speech_to_text(f'{url}/audio_stream/{id}', transcription.filename)
			transcription.transcription = transcript
			print(transcription)
			db.session.add(transcription)
			db.session.commit()
			return {"transcription": transcript}, 201
		except:
			return {"error": "transcription error"}, 400
	def delete(self, id):
		try:
			transcription = Transcription.query.filter_by(id=id).first()
			db.session.delete(transcription)
			db.session.commit()
			return {"success": "deleted"}, 204
		except:
			return {"error": "404 not found"}, 404
api.add_resource(TranscriptionById, '/transcriptions/<int:id>')

class Transcriptions(Resource):
	def post(self):
		filename = request.json['filename']
		upload_id = request.json['upload_id']
		transcription = speech_to_text(f'{url}/audio_stream/{upload_id}', filename)
		audio_name = filename
		new_transcription = Transcription(
			filename = audio_name,
			transcription = transcription,
			upload_id = upload_id
		)
		db.session.add(new_transcription)
		db.session.commit()
		return {
			"filename": new_transcription.filename,
			"id": new_transcription.id,
			"transcription": new_transcription.transcription,
			"upload_id": new_transcription.upload_id
		}, 201
api.add_resource(Transcriptions, '/transcriptions') 

class Definition(Resource):
	def get(self, word):
		try:
			definition = scrape(word)
			return {"definition": definition}, 201
		except:
			return {"error": "invalid word"}, 404
api.add_resource(Definition, "/definitions/<string:word>")

class VocabularyList(Resource):
	def post(self):
		try:
			fields=request.get_json()
			new_vocab = Vocabulary(
				term = fields['term'],
				definition = fields['definition'],
				translation = fields['translation'],
				upload_id = fields['upload_id']
			)
			print("values assigned")
			db.session.add(new_vocab)
			db.session.commit()
			return {"success": "Post successful"}, 200
		except:
			return {"error": "invalid post"}, 400
api.add_resource(VocabularyList, '/vocabulary')

class VocabularyById(Resource):
	def patch(self, id):
		try:
			vocab = Vocabulary.query.filter_by(id=id).first()
			fields = request.get_json()
			for field in fields:
				setattr(vocab, field, fields['field'])
			db.session.add(vocab)
			db.session.commit()
			return {"term": vocab.term,
				"definition": vocab.definition,
				"translation": vocab.translation	
			}, 201
		except:
			return {"error": "wrong"}, 400
	def delete(self, id):
		try:
			vocab = Vocabulary.query.filter_by(id=id).first()
			db.session.delete(vocab)
			db.session.commit()
			return {"success": "item deleted"}, 204
		except:
			return {"error": "resource not found"}, 404
api.add_resource(VocabularyById, '/vocabulary/<int:id>')

class VocabularyByEmail(Resource):
		def get(self, email):
			try:
				vocabulary_list = [{
					"id": vocab.id, 
					"term": vocab.term, 
					"definition": vocab.definition, 
					"translation": vocab.translation,
					"upload_id": vocab.upload_id
				} for vocab in Vocabulary.query.filter_by(email=email)]
				return {"vocabulary": vocabulary_list}, 200
			except:
				return {"error": "failed to fetch"}, 404
api.add_resource(VocabularyByEmail, '/vocabulary/<string:email>')