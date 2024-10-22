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
        print(len(unique_film_url))
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

        # show name
        main_title=response.css("div[class*=style__title]::text").get()
        film_info["show_title"]=main_title

        # schedule
        dates=response.css("div[class*=style__scheduleItemBlock]")
        showtimes=[]
        for d in dates:
            showtime=[]
            date=d.css("div[class*=style__scheduleItemDate]::text").get()
            time=d.css("span[class*=style__scheduleItemDisplayTime]::text").get()
            link=d.css("div[class*=style__scheduleItemDiv] a::attr(href)").get()
            showtime.extend([date,time,link]) # use extend() to add all 3 elements in one line
            showtimes.append(showtime)
        
        film_info["showtimes"]=showtimes
        
        # for some page, one show contains mutiple shorts/movies
        if response.css("div[class*=style__childEventsHeader]"):
           info_container=response.css("div[class*=style__childInfo]")
           for c in info_container:
               title_eng=c.css("div[class*=style__childTitle]::text").get()

               # english movie doesn't have title in antoher language displayed
            
               title_original=c.css("div[class*=style__childTitleSecond]::text").get()
               
        
               director=c.css("div[class*=style__childDirector] span::text").get()

               credits=c.css("div[class*=style__childCredits] span::text").getall() # countries, year, length, language 

               cleaned_credits=[c.strip().replace('|','').strip() for c in credits]

               pitch=c.css("div[class*=style__childPitch] p *::text").getall() # select every textcontent inside p tag
               full_description=" ".join(pitch)
               
               film_info["english_title"]=title_eng
               film_info["original_title"]=title_original
               film_info["director"]=director
               film_info["credits"]=cleaned_credits
               film_info["description"]=full_description
               film_info["genre"]=""

               yield film_info
            
        else:
            director=response.css("div[class*=style__director] span::text").getall()

            credits=response.css("div[class*=style__runtimeSection] span[class*=charlie]::text").get()
            print(credits)
           
            notes=response.css("div[class*=style__note] p *::text").getall()
            full_notes=" ".join(notes)

            genre=response.css("div[class*=style__tag] a::text").getall()


            film_info["english_title"]=main_title
            film_info["original_title"]=""
            film_info["director"]=director
            film_info["credits"]=credits
            film_info["description"]=full_notes
            film_info["genre"]=genre


            yield film_info
    

        
        

        
