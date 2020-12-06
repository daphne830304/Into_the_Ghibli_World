"""Demonstration of Google Maps."""

from jinja2 import StrictUndefined
from flask import Flask, render_template, jsonify, send_from_directory, make_response, request,session,flash,redirect
# from flask_debugtoolbar import DebugToolbarExtension
from model import connect_to_db, Movie, Location, User, Savedlocation, Savedmovies, Addedlocation
import crud
import os
# from model import connect_to_db, db, Bear

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ['SECRET_KEY']
# app.jinja_env.undefined = StrictUndefined

#---------------------------------------------------------------------#
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """Show homepage."""

    return render_template("index.html")

@app.route('/api/movies.json')
def movies():
    """show all movies"""

    movies = Movie.query.all()
    movie_list = []

    for m in movies:
        movie_list.append({"id":m.movie_id,
                            "title": m.title,
                           "description": m.description,
                           "director": m.director,
                           "producer": m.producer,
                           "release_date": m.release_date,
                           "rt_score": m.rt_score,
                           "poster_path": m.poster_path})


    
    return jsonify({'movies':movie_list}) 

@app.route('/api/locations.json')
def locations():
    """show all movies"""

    locations = Location.query.all()
    location_list = []

    for l in locations:
        title = crud.get_movie_title_from_movie_id(l.movie_id)
        location_list.append({"real_location": l.real_location,
                              "movie_scene": l.movie_scene,
                              "description": l.description,
                              "imgURL": l.imgURL,
                              "location_id": l.location_id,
                              "lat": l.lat,
                              "lng": l.lng,
                              "movie_scene_img": l.movie_scene_img,
                              "movie_real_life_scene_img": l.movie_real_life_scene_img,
                              "address": l.address,
                              "place_id": l.place_id,
                              "title": title,
                              "movie_id":l.movie_id})


    
    return jsonify({'locations':location_list})

# @app.route("/places")
# def view_places():
#     """Demo of basic map-related code.

#     - Programmatically adding markers, info windows, and event handlers to a
#       Google Map
#     - Showing polylines, directions, etc.
#     - Geolocation with HTML5 navigator.geolocate API
#     """

#     return render_template("places.html")

@app.route("/admin/missing-coordinates") #json
def admin_missing_coords():

    loc = Location.query.filter(Location.lat==None).all()
    location_list = []

    for l in loc:
        location_list.append({"real_location": l.real_location,
                           "movie_scene": l.movie_scene,
                           "description": l.description,
                           "imgURL": l.imgURL,
                           "location_id":l.location_id})


    # print(loc)
    
    return jsonify(location_list)

# @app.route("/admin/missing-posterpath") #json
# def admin_missing_path():

#     mov = Movie.query.filter(Movie.poster_path==None).all()
#     movie_list = []

#     for m in mov:
#         movie_list.append({"title": m.title,
#                            "movie_id":m.movie_id})


#     print(mov)
    
#     return jsonify(movie_list)

@app.route("/admin")
def admin():

    return render_template('admin.html')

@app.route("/admin/result", methods=["POST"])
def resutls():
    

    # import pdb
    # pdb.set_trace()
    res = request.form
    # print(res['lat'])
    # print(res['lng'])
    # print(res['id'])

    lat = res['lat']
    lng = res['lng']
    location_id = res['id']
    address = res['address']
    place_id = res['place_id']

    crud.update_coordinates(lat, lng, location_id,address,place_id)

    loc = Location.query.all()
    # for i in loc:
    #     print(i.real_location)
    #     print(i.lat)
    #     print(i.lng)
    # Location.update().values({"lat": lat, "lng":lng, "id":loc_id})


    return make_response("",200)

@app.route("/api/get_user.json")
def getusers():
    users = User.query.all()
    user_list = []
    for u in users:
        user_list.append({"id":u.user_id,
                            "email": u.email,
                           "password": u.password,
                          })
    
    return jsonify({'users':user_list}) 

@app.route("/api/add_location", methods=['POST'])
def addlocation():
    res = request.form
    # print(f'______________________________________________________________this is the current log in user{session}')
    # print(session.get('logged_in_user_id',None))
    # print(session)
    # print(f'this is the response {res}')
    # print('8'*50)
    # print(res['name'])
    # print(res['lat'])
    # print(res['lng'])
    # print(res['address'])
    # print(res['imgURL'])
    # print(res['place_id'])
    # # print(res['allvalues[location]'])
    # print(res['allvalues[movie_scene]'])
    # print(res['allvalues[dropdownmovies]'])
    # print(res['allvalues[Description]'])
    crud.get_movie_id(res['allvalues[dropdownmovies]'])

    user_id = session.get('logged_in_user_id',None)
    name = res['name']
    lat = res['lat']
    lng = res['lng']
    address = res['address']
    imgURL = res['imgURL']
    place_id = res['place_id']
    movie_scene = res['allvalues[movie_scene]']
    dropdownmovies = res['allvalues[dropdownmovies]']
    Description = res['allvalues[Description]']
    movie_id = crud.get_movie_id(res['allvalues[dropdownmovies]'])

    if crud.create_addedlocation(user_id, name, lat, lng,
                              address, imgURL, place_id, movie_scene,
                              movie_id, Description):
        flash('success')
        return redirect('/')
    else:
        flash('not added successfully')
        return redirect('/login')


    # return make_response("",200)

@app.route("/api/get_add_location.json")
def getaddlocation():
    user_id = session.get('logged_in_user_id',None)
    addedlocation = Addedlocation.query.filter_by(user_id=user_id).all()
    addedlocation_list = []

    for a in addedlocation:
        if a.user_id and a.place_id:
            movie = crud.get_movie_title_from_movie_id(a.movie_id)
            addedlocation_list.append({"location_id":a.added_location_id,
                            "real_location": a.real_location,
                           "movie_scene": a.movie_scene,
                           "description": a.description,
                           "real_location_img": a.imgURL,
                           "lat": a.lat ,
                           "lng": a.lng,
                           "movie":movie,
                           "address":a.address,
                           "place_id":a.place_id})



    
    return jsonify({'addedlocations':addedlocation_list}) 



@app.route("/login", methods=['POST'])
def adduser():
    res = request.form
    # print(res)
    # print(res['email'])
    # print(res['password'])
 
    
    email = res['email']
    password = res['password']

    all_users = crud.get_all_user()
    if email not in all_users:
        flash('email not matched in database')
        # print('emailed not matched in database')

        return redirect('/login')

    elif email in all_users:
        if password == all_users[email]['password']:
            session['logged_in_user_id'] = all_users[email]['id']
            # print(session)
            # print(session['logged_in_user_id'].keys())
            flash('success')
            return redirect('/')
        else:
            print('incorrect password')

    

    
    return redirect('/login')

@app.route("/logout")
def process_logout():
    session.pop('logged_in_user_id')
    # print(session)
    flash('You have logged out')
    return redirect('/login')

@app.route('/register', methods=['POST'])
def register_process():
	"""Process registration."""

	email = request.form["email"]
	password = request.form["password"]

	user = User.query.filter_by(email=email).first()

	if user:
		flash("This email address is already registered.")
		return redirect('/login')
	else:
		crud.create_user(email,password)

	flash(f"User {email} added.")
	return redirect("/")


@app.route("/api/saved_movie",methods=['POST'])
def process_saved_movies():
    res = request.form #{'movie_id':id}
    # print('movie_id is ' + res['movie_id'])
    # print(f"user id is :{session['logged_in_user_id']}")
    movie_id = res['movie_id']
    user_id = session['logged_in_user_id']
    crud.create_saved_movies(movie_id,user_id)

    return make_response("",200)

@app.route("/api/saved_location",methods=['POST'])
def process_saved_location():
    res = request.form 
    # print('location_id is ' + res['location_id'])
    # print(f"user id is :{session['logged_in_user_id']}")
    location_id = res['location_id']
    user_id = session['logged_in_user_id']
    crud.create_saved_locations(location_id,user_id)

    return make_response("",200)

@app.route('/api/associated_locations',methods=['POST','GET'])
def find_associated_locations():

    res = request.form
    # print(res['movie_id'])
    # print("_____________________________________________________________this is the response from the browser",res)
    

    associated_locations = crud.associated_locations(res['movie_id'])
    assocciated_location_list = []
    if associated_locations:
        for l in associated_locations:
            assocciated_location_list.append({"real_location": l.real_location,
                            "movie_scene": l.movie_scene,
                            "description": l.description,
                            "imgURL": l.imgURL,
                            "location_id":l.location_id,
                            "lat": l.lat ,
                            "lng": l.lng,
                            "movie_scene_img": l.movie_scene_img,
                            "movie_real_life_scene_img": l.movie_real_life_scene_img,
                            "address":l.address})
        return  jsonify({'associated_location_list':assocciated_location_list}) 
    else:
        return jsonify({'empty':'empty'})
    # return make_response("",200)

@app.route("/api/userprofile")
def get_user_data():

    user_id = session.get('logged_in_user_id',None)
    # print(user_id)

    user_fav_list= []
    savedmovies = Savedmovies.query.filter(Savedmovies.user_id==user_id).all()
    savedlocations = Savedlocation.query.filter(Savedlocation.user_id==user_id).all()

    count = 0
    for m in savedmovies:
        title = crud.get_movie_title_from_movie_id(m.movie_id)
        # print('________________________________________________________________________',title,user_id)
        user_fav_list.append({'title': title,
                              'user_id': user_id,
                              'count':count})
        count += 1
    for l in savedlocations:
        location = crud.get_location_name_from_location_id(l.location_id)
        # print('_________________________________________________________________________',location, user_id)
        user_fav_list.append({'location': location,
                              'user_id': user_id,
                              'count':count})
        count += 1

    
    return jsonify({'userfavs':user_fav_list})



if __name__ == "__main__":
    # app.debug = False
    connect_to_db(app)
    # DebugToolbarExtension(app)

    app.run(host="0.0.0.0")
