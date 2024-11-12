import scrapy
from datetime import datetime


class ParadiseSpider(scrapy.Spider):
    name = "paradise"
    allowed_domains = ["paradiseonbloor.com"]
    start_urls = ["https://paradiseonbloor.com/coming-soon/"]

    def parse(self, response):
        film_info={}
        shows=response.css(".show-details")
        
        for show in shows:
            if "Director:" not in show.css("p.show-specs span::text").getall():
                continue
            else: 
                film_info["theatre"]="Paradise Theatre"

                show_title=show.css("h2.show-title a::text").get()
                film_info["show_title"]=show_title
                film_info["english_title"]=show_title
 
                if show.css("div.show-datelist.single-date span::text"):
                    date=show.css("div.show-datelist.single-date span::text").get().strip()
                    date=self.formatted_date(date)
                    film_info["date"]=date
                
                if show.css("ol.showtime-button-row li a::text"):
                    time=show.css("ol.showtime-button-row li a::text").get().strip()
                    time=self.formatted_time(time)
                    film_info["time"]=time
                    link=show.css("ol.showtime-button-row li a::attr(href)").get()
                    film_info["link"]=link

                details=show.css("p.show-specs span::text").getall()
                for i in range(len(details)):
                    if details[i]=="Director:":
                        director=details[i+1].strip()
                    elif details[i]=="Release Year:":
                        year=details[i+1].strip()
                        year=int(year)

                film_info["director"]=director
                film_info["year"]=year
                
            yield film_info

    def formatted_date(self,date):
        current_month=datetime.now().month

        # to cope with "Today, Nov 12"
        if "Today" in date:
            today_weekday = datetime.now().strftime("%a")
            date = date.replace("Today", today_weekday)

        showtime_month=datetime.strptime(date,"%a, %b %d").month
        if showtime_month>=current_month:
            show_year=datetime.now().year
        else:
            show_year=datetime.now().year+1
        
        full_date=f"{date} {show_year}"

        date_obj=datetime.strptime(full_date,"%a, %b %d %Y")

        return date_obj.strftime("%Y-%m-%d")

    def formatted_time(self,time_str):
        time_obj=datetime.strptime(time_str,'%I:%M %p')
        formatted_time=time_obj.strftime('%H:%M:%S')
        return formatted_time

