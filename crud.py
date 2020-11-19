from model import db, Movie, Location, connect_to_db, User, Savedmovies, Savedlocation


def create_movie(movie_id, title, description, director, producer, release_date, rt_score):
    """Create and return a new movie."""

    movie = Movie(movie_id=movie_id,
                  title=title,
                  description = description, 
                  director = director,
                  producer = producer, 
                  release_date = release_date, 
                  rt_score = rt_score)
    
    db.session.add(movie)
    db.session.commit()

# line = movie name, real location, movie scene location, imgURL, movie iD
def create_location(real_location, movie_scene, imgURL, description, movie,  movie_real_life_scene_img, movie_scene_img):

    location = Location(real_location = real_location, 
                        movie_scene = movie_scene,  
                        imgURL = imgURL,
                        description = description, 
                        movie = movie,
                        movie_scene_img = movie_scene_img,
                        movie_real_life_scene_img = movie_real_life_scene_img

                        )

    db.session.add(location)
    db.session.commit()

def create_location_full(real_location, movie_scene, imgURL, movie, lat, lng):

    location = Location(real_location = real_location, 
                        movie_scene = movie_scene,  
                        imgURL = imgURL,
                        movie = movie, 
                        lat = lat, 
                        lng = lng)

    db.session.add(location)
    db.session.commit()

def update_coordinates(lat,lng, loc_id,address,place_id):

    # Location.update().where(location_id= loc_id).values({'lat':lat, 'lng':lng})
    # location = Location.query.filter_by(location_id = loc_id).update({'lat':lat, 'lng':lng})
    db.session.query(Location).filter_by(location_id=loc_id).update({'lat':lat, 'lng':lng,'address':address,'place_id':place_id})
    # db.session.add(location)
    db.session.commit()

def update_posterpath(movie_id,poster_path):

    # Location.update().where(location_id= loc_id).values({'lat':lat, 'lng':lng})
    # location = Location.query.filter_by(location_id = loc_id).update({'lat':lat, 'lng':lng})
    db.session.query(Movie).filter_by(movie_id=movie_id).update({'poster_path':poster_path})
    # db.session.add(location)
    db.session.commit()


def create_user(email, password):

    user = User(email = email, 
                password = password)

    db.session.add(user)
    db.session.commit()

customers = {}
def get_all_user():
    """make customers dictionary
        customers['enail']={id,email,password}"""
    users = User.query.all()
    
    for u in users:
        customers[u.email] = {"id":u.user_id,"email": u.email,"password": u.password}    
    return customers

def create_saved_movies(movie_id, user_id):
    user_id = int(user_id)
    saved_movie = Savedmovies(movie_id=movie_id,
                                user_id = user_id)
    
    db.session.add(saved_movie)
    db.session.commit()
