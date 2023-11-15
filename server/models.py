from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
#from sqlalchemy.ext.associationproxy import association_proxy
#from sqlalchemy_serializer import SerializerMixin

convention = {
  "ix": "ix_%(column_0_label)s",
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

class Vocabulary(db.Model):
	__tablename__ = 'vocabulary'
	id = db.Column(db.Integer, primary_key=True)
	term = db.Column(db.String(50))
	definition = db.Column(db.String(50))
	translation = db.Column(db.String(50))
	email = db.Column(db.String(50))

class Upload(db.Model):
	__tablename__ = "uploads"
	id = db.Column(db.Integer, primary_key=True)
	filename = db.Column(db.String(50))
	data = db.Column(db.LargeBinary)
	email = db.Column(db.String(50))
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


