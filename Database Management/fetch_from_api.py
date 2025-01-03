from DatabaseOperator import DatabaseOperator
import requests
import time
from dotenv import load_dotenv
import os
from flask import Flask, request,jsonify

# Load Environment Variables
load_dotenv(r"C:\Users\19692\Downloads\Full_Stack_FilmScope_Toronto\Config\.env")
api_key=os.getenv("API_KEY")
host=os.getenv("DB_HOST")
user=os.getenv("DB_USER")
password=os.getenv("DB_PASSWORD")
db=os.getenv("DB_NAME")


# header for my TMDB API
headers = {
    "accept": "application/json",
    "Authorization": api_key
}



def fetch_movie_info(film):
    film_info={}
    # get Title and Year to make API call
    title=film["film_title"]
    year=film["year"]
    title_for_query="%20".join(title.split()) # title should be seperated by %20, Talk%20To%20Her
    url_id = f"https://api.themoviedb.org/3/search/movie?query={title_for_query}&include_adult=true&page=1&year={year}"
    #-------------------------------------------------------------------------------------------------------------------
    #GET TMDB ID
    try:
        movie_id_json = requests.get(url_id, headers=headers).json()
        tmdb_id=movie_id_json["results"][0]["id"]
        film_info["film_id"]=tmdb_id

        # --------------------------------------------------------------------------------------
        # GET DETAILS INFO EXCEPT CASTS INFO
        url_details = f"https://api.themoviedb.org/3/movie/{tmdb_id}"

        movie_details_json=requests.get(url_details,headers=headers).json()

        # get all genres
        genres_list=[]
        for genres in movie_details_json["genres"]:
            genres_list.append(genres["name"])
        film_info["genres"]=genres_list

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

        # get backdrop_path
        backdrop_path=movie_details_json.get("backdrop_path")
        film_info["backdrop_path"]=backdrop_path

        # get runtime
        runtime=movie_details_json.get("runtime",None)
        film_info["runtime"]=runtime


        # get languages
        languages_list=[]
        for language in movie_details_json["spoken_languages"]:
            languages_list.append(language["english_name"])
        film_info["languages"]=languages_list

        # get countries
        countries_list=[]
        for country in movie_details_json["production_countries"]:
            countries_list.append(country["name"])
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

    except Exception as e:
        #print(f"There is an error happend when extracting movie {title}({year}): {e}")
        film_info["title"]=title
        film_info["release_year"]=year
    time.sleep(0.5)
    return film_info

#-----------------------------------------------------------------------------------------

if __name__=='__main__':
    # Fetch All Movies that doesn't have movie information yet
    # create a DB Operator
    db_operator=DatabaseOperator(host,user,password,db)

    films=db_operator.extract_for_api() # return all the films in database

    for film in films:
        film_info=fetch_movie_info(film)
        print(film_info)
        db_operator.upload_film_info(film_info)

    db_operator.sync_showtime_table()
    db_operator.close()
    

        







    




