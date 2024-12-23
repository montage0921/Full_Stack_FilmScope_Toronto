import pymysql
import scrapy

class MySQLPipeline:
    def __init__(self, mysql_host, mysql_db, mysql_user, mysql_password):
        self.mysql_host = mysql_host
        self.mysql_db = mysql_db
        self.mysql_user = root
        self.mysql_password = mysql_password
        self.connection = None
        self.cursor = None

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        mysql_host = crawler.settings.get('MYSQL_HOST')
        mysql_db = crawler.settings.get('MYSQL_DB')
        mysql_user = crawler.settings.get('MYSQL_USER')
        mysql_password = crawler.settings.get('MYSQL_PASSWORD')
        return cls(mysql_host, mysql_db, mysql_user, mysql_password)
    return cls(mysql_host, mysql_db, mysql_user, mysql_password)
    def open_spider(self, spider):
        try:
            self.connection = pymysql.connect(
                host=self.mysql_host,
                user=self.mysql_user,
                password=self.mysql_password,
                db=self.mysql_db,
                charset='utf8mb4'
            )
            self.cursor = self.connection.cursor()
            spider.logger.info('MySQL connection established.')
        except pymysql.MySQLError as e:
            spider.logger.error(f"Error connecting to MySQL: {e}")

    def close_spider(self, spider):
        try:
            self.connection.commit()  # Commit any changes if needed
            self.cursor.close()
            self.connection.close()
            spider.logger.info('MySQL connection closed.')
        except pymysql.MySQLError as e:
            spider.logger.error(f"Error closing MySQL connection: {e}")

    def process_item(self, item, spider):
        try:
            # Construct your insert query here
            insert_query = """
            INSERT INTO showtime (theatre, show_title, film_title, director, year, showtimes_dict)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            # Convert dictionary (if any) into a JSON string before inserting
            if 'showtimes_dict' in item:
                import json
                showtimes_json = json.dumps(item['showtimes_dict'])
            else:
                showtimes_json = None  # or handle appropriately

            # Insert item values into the database
            self.cursor.execute(insert_query, (
                item['theatre'],
                item['show_title'],
                item['english_title'],
                item['director'],
                item['year'],
                showtimes_json
            ))
            self.connection.commit()  # Commit the transaction
            return item
        except pymysql.MySQLError as e:
            spider.logger.error(f"Error inserting item into MySQL: {e}")
            return None
