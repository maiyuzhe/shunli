from io import BytesIO
from flask import Flask, render_template, send_file, request, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

CORS(app)
api = Api(app)

class Upload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(50))
    data = db.Column(db.LargeBinary)

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
api.add_resource(UploadFile, '/audio_upload')

class DownloadById(Resource):
    def get(self, id):
        upload = Upload.query.filter_by(id=id).first()

        file_data = BytesIO(upload.data)
        file_data.seek(0)

        return send_file(file_data, download_name=upload.filename, mimetype='audio/mpeg')
api.add_resource(DownloadById, '/audio_download/<int:id>')