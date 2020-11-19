import os
import json
from random import choice, randint
from datetime import datetime

from urllib.request import urlopen
import json

#python files in our folder
import crud
import model
import server

import requests
from pprint import pprint

import pandas as pd
# import numpy as np
import xlrd
import csv





os.system('dropdb studioghibli')
os.system('createdb studioghibli')

model.connect_to_db(server.app)
model.db.create_all()

film_data = urlopen('https://ghibliapi.herokuapp.com/films').read()
data_json = json.loads(film_data)

# insert data into Movie table
movie_dict = {}
for data in data_json:
    movie_dict[data['title']] = data['id']

# for movie in movie_dict:


movie_dict_v2 = {}
for data in data_json:
    movie_dict_v2[data['title']] = [data['id'],
                                 data['description'], 
                                 data['director'],
                                 data['producer'],
                                 data['release_date'],
                                 data['rt_score']]


for movie in movie_dict_v2:
    title = movie_dict_v2[movie]
    ids, description, director, producer, release_date, rt_score = title
    crud.create_movie(ids,
                      movie,
                      description,
                      director, 
                      producer, 
                      release_date, 
                      rt_score
                      )

poster_path_dict = {}
for mov in movie_dict:
    movie_id = movie_dict[mov]
    params = {"api_key":"97ba3bbccb7a848bfd2d5f611541de24","query":mov,"original_language":"ja"}
    res = requests.get('https://api.themoviedb.org/3/search/movie',params = params)

    
    output = res.json()['results']
    poster_path = output[0]['poster_path']
    vote = output[0]['vote_count']

    for i in output:
        if i['vote_count'] > vote:
            poster_path = i['poster_path']
            vote = i['vote_count']

    poster_path_dict[movie_id] = f'https://image.tmdb.org/t/p/w300{poster_path}'

for movie_id in poster_path_dict:
    poster_path = poster_path_dict[movie_id]
    crud.update_posterpath(movie_id, poster_path)

# # print(movie_dict)

#insert data into Location Table from text file
# location_list = []

# filename = "location_data_v2.csv"
# with open(filename) as f:
#     next(f)
#     for line in f:
#         line = line.rstrip().split(',')
#         movie, location_name, movie_scene, imgURL = line
#         line.append(movie_dict[movie])
#         location_list.append(line)
        # print(location_name)
        # print(movie)
        # print(movie_scene)
        # line = movie name, real location, movie scene location, imgURL, movie iD
        # print(line)
location_list = []

df = pd.read_excel('location_description.xlsx')

i = 0
while i< len(df) and not df.loc[i].empty:
    
    Movie = df.loc[i]['Movie']
    real_life_location = df.loc[i]['real-life-location']
    movie_scene = df.loc[i]['movie scene']
    img = df.loc[i]['img']
    description = df.loc[i]['description']
    movie_real_life_scene_img = df.loc[i]['movie_scene_real_location']
    movie_scene_img = df.loc[i]['movie_scene_img']

    movie_id = movie_dict[Movie]

    location_tuple = (Movie, real_life_location, movie_scene, img, description, movie_id, movie_real_life_scene_img,movie_scene_img )
    location_list.append(location_tuple)
  
    i += 1

print(location_list)
print(len(location_list))

for lst in location_list:

    _, real_location, movie_scene, imgURL, description, movie_id, movie_real_life_scene_img,movie_scene_img = lst
    # movie_id = lst[-1]
    
    movie = model.Movie.query.get(movie_id)

    #inserting lat and lng in python
    # res = requests.get('https://maps.googleapis.com/maps/api/geocode/json',params = {"address":f"{real_location}", "key":"AIzaSyB-33vlR6YV43rPhaQIU-vZAW0LZcS2qpc"})
    # # print(movie)
    # print(res.json()['results'][0]['geometry']['location']['lat'])

    # lat = res.json()['results'][0]['geometry']['location']['lat']
    # lng = res.json()['results'][0]['geometry']['location']['lng']

    # crud.create_location_full(real_location=real_location,
    #                      movie_scene=movie_scene,
    #                      imgURL = imgURL, 
    #                      movie = movie,
    #                      lat = lat, 
    #                      lng = lng
    #                      )
    #end of the code
        

    
    crud.create_location(real_location=real_location,
                         movie_scene=movie_scene,
                         imgURL = imgURL, 
                         description = description,
                         movie = movie,
                         movie_real_life_scene_img = movie_real_life_scene_img,
                         movie_scene_img = movie_scene_img
                         )

# # params = {"address":"Dogo Onsen","key":"AIzaSyB-33vlR6YV43rPhaQIU-vZAW0LZcS2qpc"}

# # res = requests.get('https://maps.googleapis.com/maps/api/geocode/json',params = params)

# # print(res.json())

# # pprint(res.json())

# # pprint(res.json()['results'][0]['geometry']['location']['lat'])

for i in range(5):
    crud.create_user(f"email_{i}@user.com",f'user-{i}')