from flask import Flask, request,jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from DatabaseOperator import DatabaseOperator
from fetch_from_api import fetch_movie_info

app=Flask(__name__)
CORS(app, resources={
    r"/fetch-movie-info": {"origins": "http://localhost:5173"}
})

# Load Environment Variables
load_dotenv(r"C:\Users\19692\Downloads\Full_Stack_FilmScope_Toronto\Config\.env")
api_key=os.getenv("API_KEY")
host=os.getenv("DB_HOST")
user=os.getenv("DB_USER")
password=os.getenv("DB_PASSWORD")
db=os.getenv("DB_NAME")



@app.route('/fetch-movie-info',methods=['POST'])
def fetch_movie_info_endpoint():
    db_operator=DatabaseOperator(host,user,password,db)
    try:
        film=request.json # get film ("film_title","year") from JAVA backend
        film_info=fetch_movie_info(film)
        return jsonify({"status":"success","film_info":film_info}),200
    except Exception as e:
        return jsonify({"status":"error","message":str(e)}),500
    finally:
        db_operator.close()

if __name__=='__main__':
    app.run(port=5000)
