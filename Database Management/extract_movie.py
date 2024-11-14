import pymysql
import pymysql.cursors

class Extract_Movie():
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
                self.cursor.close()
                self.connection.close()
                return result
        except pymysql.MySQLError as e:
            print("MySQL Error: ", e)
            return

    def upload_movie_info(self):
         upload_query="""

        """
    


