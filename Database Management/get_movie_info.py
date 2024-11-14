import pymysql
import pymysql.cursors
import extract_movie
import requests
import json

# My SQL configuration
host='127.0.0.1'
user='root'
password='nicaiwojiaosha1.A'
db='filmscope_toronto'

# header for my TMDB API
headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzFmODNhOTU4M2FmYjNkMTUyMzRkMWRlNDQyMjc3MyIsIm5iZiI6MTczMTUzOTcyOS41NTk1NDIyLCJzdWIiOiI2NzE4NGQ2NDQ1NDJlMzcxZmUwYTEyNTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NRlzDrRbn2nfSrs5ZgRhz8NUHKB83psINIkjQUlORmc"
}

# Fetch All Movies that doesn't have movie information yet
film_extractor=extract_movie.Extract_Movie(host,user,password,db)
films=film_extractor.extract_for_api() # return all the films in database

#-----------------------------------------------------------------------------------------
for film in films:
    film_info={}
    # get its title and year to make API call
    title=film["film_title"]
    year=film["year"]
    title_for_query="%20".join(title.split()) # title should be seperated by %20, Talk%20To%20Her
    url_id = f"https://api.themoviedb.org/3/search/movie?query={title_for_query}&include_adult=true&page=1&year={year}"
    #-------------------------------------------------------------------------------------------------------------------
    #GET TMDB ID
    movie_id_json = requests.get(url_id, headers=headers).json()
    tmdb_id=movie_id_json["results"][0]["id"]
    film_info["film_id"]=tmdb_id

    # --------------------------------------------------------------------------------------
    # GET DETAILS INFO EXCEPT CASTS INFO
    url_details = f"https://api.themoviedb.org/3/movie/{tmdb_id}"

    movie_details_json=requests.get(url_details,headers=headers).json()

    # get all generes
    generes_list=[]
    for generes in movie_details_json["genres"]:
        generes_list.append(generes["name"])
    film_info["generes"]=generes_list

    # get imdb_id
    imdb_id=movie_details_json.get("imdb_id",None)
    film_info["imdb_id"]=imdb_id

    # get original title
    original_title=movie_details_json.get("original_title",None)
    film_info["original_title"]=original_title

    # get ovewview
    overview=movie_details_json.get("overview","No overview available")
    film_info["overview"]=overview

    # get poster_path
    poster_path=movie_details_json.get("poster_path","")
    film_info["poster_path"]=poster_path

    # get runtime
    runtime=movie_details_json.get("runtime",None)
    film_info["runtime"]=runtime


    # get languages
    langugaes_list=[]
    for language in movie_details_json["spoken_languages"]:
        langugaes_list.append(language["english_name"])
    film_info["langugaes"]=langugaes_list

    # get countries
    countries_list=[]
    for country in movie_details_json["production_countries"]:
        countries_list.appen(country["name"])
    film_info["countries"]=countries_list

    #------------------------------------------------------------------------------------------
    # GET CAST INFO
    url_cast = f"https://api.themoviedb.org/3/movie/{tmdb_id}/credits"

    response_cast=requests.get(url_cast,headers=headers).json()

    # store casts
    casts_list=[]

    max_cast_count=5 # we only gonna store 5 actors/actress
    cast_count=0 

    for cast in response_cast["cast"]:
        if cast_count<max_cast_count and cast["known_for_department"]=="Acting":
            cast_count+=1
            casts_list.append(cast["name"])
    film_info["casts"]=casts_list
    # store directors
    director_list=[]
    for crew in response_cast["crew"]:
        if crew["job"]=="Director":
            director_list.append(crew["name"])
    film_info["directors"]=director_list
    film_info["title"]=title
    film_info["release_year"]=year






    




