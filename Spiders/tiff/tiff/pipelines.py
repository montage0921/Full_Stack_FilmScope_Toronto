# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymysql
import pymysql.cursors


class TiffPipeline:
    def __init__(self):
        self.connection=pymysql.connect(
            host='127.0.0.1',
            user='root',
            password='nicaiwojiaosha1.A',
            db='filmscope_toronto',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        self.cursor=self.connection.cursor()

    def process_item(self, item, spider):
        print(item)

        insert_query="""
            INSERT INTO showtime (theatre,show_title,show_date,show_time,film_title,director,year,link)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """

        try:
            director=item['director'] if item['director'] else None
            link=item['link'] if item['link'] else None
            self.cursor.execute(insert_query,(
                item['theatre'],
                item['show_title'],
                item['date'],
                item['time'],
                item['english_title'],
                director,
                item['year'],
                link
            ))

            self.connection.commit()
        except pymysql.MySQLError as e:
            print(f"Error insertion item:{e}")
            self.connection.rollback()

        return item
    
    def close_spider(self,spider):
        self.connection.close()
