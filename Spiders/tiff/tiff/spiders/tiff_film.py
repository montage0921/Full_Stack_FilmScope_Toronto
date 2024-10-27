import scrapy
from scrapy_playwright.page import PageMethod
import re
from datetime import datetime

class TiffFilmSpider(scrapy.Spider):
    name = "tiff_film"
    allowed_domains = ["www.tiff.net"]
    start_urls = ["https://www.tiff.net/calendar"]

    # response= TIFF Schdule page
    def start_requests(self):
        yield scrapy.Request(
            self.start_urls[0],
            meta=dict(
                playwright=True,
                playwright_page_methods=[
                    # solve tiff loading issue
                    PageMethod("wait_for_load_state","networkidle"),
                    PageMethod("wait_for_timeout",3000),
                ]
            )
        )

    # extract link of each movie
    def parse(self, response):
        film_url=response.css("h3[class*=style__cardTitle] a::attr(href)").getall()
        unique_film_url=set(film_url) # one movie with mutiple showtimes, only record once
        for link in unique_film_url:
            yield scrapy.Request(
                url=response.urljoin(link),
                callback=self.parse_movie_info,
                meta=dict(
                    playwright=True,
                )
            )

    # extract movie info for each movie
    def parse_movie_info(self,response):

        film_info={}
        # movie theatre
        film_info["theatre"]="TIFF Lightbox"
        # show name
        show_title=response.css("div[class*=style__title]::text").get()
        film_info["show_title"]=show_title

        # schedule
        dates=response.css("div[class*=style__scheduleItemBlock]")
        showtimes=[]
        for d in dates:
            date=d.css("div[class*=style__scheduleItemDate]::text").get().strip()
            times=d.css("span[class*=style__scheduleItemDisplayTime]::text").getall()
            links=d.css("div[class*=style__scheduleItemDiv] a::attr(href)").getall()

            if date:
                formatted_date=self.formatted_date(date)
            
            for time, link in zip(times,links):
                showtime={}
                formatted_time=self.formatted_time(time)
                showtime["date"]=formatted_date
                showtime["time"]=formatted_time if time else None
                showtime["link"]=link
                showtimes.append(showtime)
        
        # for child events (mutiple films in one show)
        if response.css("div[class*=style__childEventsHeader]"):
           info_container=response.css("div[class*=style__childInfo]")
           for c in info_container:
               title_eng=c.css("div[class*=style__childTitle]::text").get()

               director=c.css("div[class*=style__childDirector] span *::text").get()
               

               year=self.get_year_page_type1(c)

               film_info["english_title"]=title_eng
               film_info["director"]=director
               film_info["year"]=year

               for showtime in showtimes:
                   complete_info={**film_info,**showtime}
                   yield complete_info # each show matches a film matches a showtime
            
        else:
            director=response.css("div[class*=style__director] span::text").getall() # director is a list
            director=','.join(director) 
            
            year=self.get_year_page_type2(response)

            film_info["english_title"]=show_title
            film_info["director"]=director
            film_info["year"]=year

            for showtime in showtimes:
                complete_info={**film_info,**showtime}
                yield complete_info
                 
    # get year from credits info
    def get_year_page_type1(self,c):
        year=0

        credits=c.css("div[class*=style__childCredits] span::text").getall() # countries, year, length, language 

        cleaned_credits=[c.strip().replace('|','').strip() for c in credits]
        
        if not cleaned_credits:
            return year
        
        year_pattern = re.compile(r'^\d{4}$')  # 4-digit year
        
        for c in cleaned_credits:
            if year_pattern.match(c):
                year=int(c)
                break;
        
        return year

    def get_year_page_type2(self,response):
        year=0
        credits=response.css("div[class*=style__runtimeSection] span[class*=charlie]::text").get()

        if not credits:
            return year
            
    
        credits_list=credits.split("|")
        credits=[c.strip().replace("|","").strip() for c in credits_list]
        
        year_pattern = re.compile(r'^\d{4}$')  # 4-digit year
        
        for c in credits:
            if year_pattern.match(c):
                year=int(c)
                break
        
        return year

    # convert scraped date info to SQL Date TYpe
    def formatted_date(self,date_str):

        current_month=datetime.now().month # return a number (10 is October for example)
        showtime_month=datetime.strptime(date_str,"%A, %B %d").month

        # if show time month >= current month, show happens in this year
        # else show happens in next year
        if showtime_month >=current_month:
            show_year=datetime.now().year
        else:
            show_year=datetime.now().year+1
        
        full_date_str=f"{date_str} {show_year}"

        date_obj = datetime.strptime(full_date_str, "%A, %B %d %Y")
        formatted_date=date_obj.strftime('%Y-%m-%d')
        return formatted_date    

    # convert scraped time to SQL TIME DATA TYPE
    def formatted_time(self,time_str):
        time_obj=datetime.strptime(time_str,'%I:%M %p')
        formatted_time=time_obj.strftime('%H:%M:%S')
        return formatted_time


            

           
        
        
    

        
    