from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

movie_list = []

class Movie(db.Model):
    """Studio Ghibli Movies"""

    __tablename__ = 'movies'

    # movie_id = db.Column(db.Integer,
    #                     autoincrement=True,
    #                     primary_key=True)
    movie_id = db.Column(db.String, unique=True, primary_key = True)

    title = db.Column(db.String, unique=True)
    description = db.Column(db.String, unique=True)
    director = db.Column(db.String)
    producer = db.Column(db.String)
    release_date = db.Column(db.String)
    rt_score = db.Column(db.String)
    poster_path = db.Column(db.String)
    # imgURL for movies?


    location = db.relationship('Location')

    def __repr__(self):
        return f'<Movie movie_id={self.movie_id} title={self.title}>'


  
    

class Location(db.Model):
    """location in the films"""

    __tablename__ = 'locations'

    location_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
                        
    real_location = db.Column(db.String, unique=True)
    # address = db.Column(db.String, unique=True) #or coordinates? use google places to search for the place
    movie_scene = db.Column(db.String)
    description = db.Column(db.String, nullable = True)
    imgURL = db.Column(db.String, unique =True)
    movie_id = db.Column(db.String, db.ForeignKey('movies.movie_id'))
    movie_scene_img = db.Column(db.String)
    movie_real_life_scene_img = db.Column(db.String) #obsolete
    lat = db.Column(db.String)
    lng = db.Column(db.String)
    address = db.Column(db.String)
    place_id = db.Column(db.String) 
    
  

    movie = db.relationship('Movie')

    def __repr__(self):
        return f'<Location location_id={self.movie_id} real_location={self.real_location} >'

   
    


class User(db.Model): 
    """"User infomration"""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    saved_movie_id = db.Column(db.Integer, db.ForeignKey('savedmovies.saved_movie_id'))
    saved_location_id = db.Column(db.Integer, db.ForeignKey('savedlocations.saved_location_id'))



class Savedmovies(db.Model):
    """saved movies"""

    __tablename__ = "savedmovies"


    saved_movie_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    movie_id = db.Column(db.String, db.ForeignKey('movies.movie_id'), unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

class Savedlocation(db.Model):
    """saved location"""

    __tablename__ = "savedlocations"

    saved_location_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.location_id'),unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

class Addedlocation(db.Model):
    """saved location"""

    __tablename__ = "addedlocations"

    added_location_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    real_location = db.Column(db.String, unique=True)
    movie_scene = db.Column(db.String)
    description = db.Column(db.String, nullable = True)
    imgURL = db.Column(db.String, unique =True)
    movie_id = db.Column(db.String, db.ForeignKey('movies.movie_id'))
    lat = db.Column(db.String)
    lng = db.Column(db.String)
    address = db.Column(db.String)
    place_id = db.Column(db.String) 
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))





def connect_to_db(flask_app, db_uri='postgresql:///studioghibli', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)
