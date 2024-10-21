import scrapy
from scrapy_playwright.page import PageMethod


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
        main_title=response.css("div[class*=style__title]::text").get()
        # for some page, movie info contains after a header "Playing as part of this programme:"
        # in this case, it may screen more than one film at each screening
        if response.css("div[class*=style__childEventsHeader]"):
           info_container=response.css("div[class*=style__childInfo]")
           for c in info_container:
               title_eng=c.css("div[class*=style__childTitle]::text").get()
               print(title_eng)
           
           """
          
           title_eng=response.css("div[class*=style__childTitle]::text").getall()

           director=response.css("div[class*=style__childDirector] span::text").get()
    
           credits=response.css("div[class*=style__childCredits] span::text").getall()

           description=response.css("div[class*=style__childPitch] p::text").getall()

           
           for i in range(len(title_eng)):
               film_info["main_title"]=main_title
               film_info["title_eng"]=title_eng[i]
               film_info["director"]=director
               film_info["countries"]=credits[0].strip().replace("|","")
               film_info["year"]=credits[1].strip().replace("|","")
               film_info["length"]=credits[2].strip().replace("|","")
               film_info["language"]=credits[3].strip().replace("|","")
               film_info["description"]=description[i]
               
               yield film_info
            """
               
        else:
            print("no, it doesnt have it")
        
        

        
