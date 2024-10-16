import scrapy
from scrapy_playwright.page import PageMethod


class TiffFilmSpider(scrapy.Spider):
    name = "tiff_film"
    allowed_domains = ["www.tiff.net"]
    start_urls = ["https://www.tiff.net/calendar"]

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


    def parse(self, response):

        # extract links for each movie titles
        film_url=response.css("h3[class*=style__cardTitle] a::attr(href)").getall()
        unique_film_url=set(film_url)

        for link in unique_film_url:
            yield scrapy.Request(
                url=response.urljoin(link),
                callback=self.parse_movie_info,
                meta=dict(
                    playwright=True,
                )
            )

    def parse_movie_info(self,response):
        title=response.css("div[class*=style__title]::text").get()
        print(title)

        
