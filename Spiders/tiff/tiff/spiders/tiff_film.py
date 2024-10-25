import scrapy
from scrapy_playwright.page import PageMethod


import re


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

        film_info["theatre"]="TIFF Lightbox"

        # show name
        main_title=response.css("div[class*=style__title]::text").get()
        film_info["show_title"]=main_title

        # schedule
        dates=response.css("div[class*=style__scheduleItemBlock]")
        showtimes=[]
        for d in dates:
            showtime={}
            date=d.css("div[class*=style__scheduleItemDate]::text").get()
            time=d.css("span[class*=style__scheduleItemDisplayTime]::text").get()
            link=d.css("div[class*=style__scheduleItemDiv] a::attr(href)").get()

            # convert to date object
            
            showtime["date"]=date.strip()
            showtime["time"]=time
            showtime["link"]=link
            showtimes.append(showtime)
        
        film_info["showtimes"]=showtimes
        
        # for some page, one show contains mutiple shorts/movies
        if response.css("div[class*=style__childEventsHeader]"):
           info_container=response.css("div[class*=style__childInfo]")
           for c in info_container:
               title_eng=c.css("div[class*=style__childTitle]::text").get()

               director=c.css("div[class*=style__childDirector] span *::text").get()

               year=self.get_year_page_type1(c)

               film_info["english_title"]=title_eng
               film_info["director"]=director
               film_info["year"]=year

               yield film_info
            
        else:
            director=response.css("div[class*=style__director] span::text").getall()
            year=self.get_year_page_type2(response)

            film_info["english_title"]=main_title
            film_info["director"]=director
            film_info["year"]=year
        
            yield film_info
                 
    # get year from credits info
    def get_year_page_type1(self,c):
        year=''

        credits=c.css("div[class*=style__childCredits] span::text").getall() # countries, year, length, language 

        cleaned_credits=[c.strip().replace('|','').strip() for c in credits]
        
        if not cleaned_credits:
            return year
        
        year_pattern = re.compile(r'^\d{4}$')  # 4-digit year
        
        for c in cleaned_credits:
            if year_pattern.match(c):
                year=c

        return year

    def get_year_page_type2(self,response):
        year=""
        credits=response.css("div[class*=style__runtimeSection] span[class*=charlie]::text").get()

        if not credits:
            return year
            
        if credits:
            credits_list=credits.split("|")
            credits=[c.strip().replace("|","").strip() for c in credits_list]
        
        year_pattern = re.compile(r'^\d{4}$')  # 4-digit year
        
        for c in credits:
            if year_pattern.match(c):
                year=c

        return year
            

           
        
        
    

        
        

        
