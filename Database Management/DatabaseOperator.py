import pymysql
import pymysql.cursors
import json

class DatabaseOperator():
    def __init__(self,host,user,pwd,db):
        self.connection=pymysql.connect(
            host=host,
            user=user,
            password=pwd,
            db=db,
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        self.cursor=self.connection.cursor()
    
    def extract_for_api(self):
        extract_query="""
                      SELECT DISTINCT film_title,film_id,director,year FROM showtime WHERE film_id =0
                      """
        
        try:
                self.cursor.execute(extract_query)
                result=self.cursor.fetchall()
                return result
        except pymysql.MySQLError as e:
            print("MySQL Error: ", e)
            return

    def upload_film_info(self,film_info):
        upload_query="""
                      INSERT INTO movie_info (film_id, title, original_title, directors, casts, genres, release_year, countries, languages, runtime, poster_path, overview, imdb_id)
                      VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                      """
        data_tuple = (
            film_info.get("film_id", None),  # Use None if `film_id` is missing
            film_info.get("title", ""),  # Title is expected to be present
            film_info.get("original_title", ""),
            json.dumps(film_info.get("directors", [])),
            json.dumps(film_info.get("casts", [])),
            json.dumps(film_info.get("genres", [])),
            film_info.get("release_year", 0),  # Set a default of 0 for year if missing
            json.dumps(film_info.get("countries", [])),
            json.dumps(film_info.get("languages", [])),
            film_info.get("runtime", 0),  # Default to 0 if runtime is missing
            film_info.get("poster_path", ""),
            film_info.get("overview", "No overview available"),
            film_info.get("imdb_id", None)  # Use None for optional fields
        )

        try:
            self.cursor.execute(upload_query,data_tuple)
            self.connection.commit()
        except pymysql.MySQLError as e:
             print(e)
    
    def close(self):
         self.cursor.close()
         self.connection.close()

              


 
    


