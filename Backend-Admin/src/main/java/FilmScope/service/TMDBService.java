package FilmScope.service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;


@Setter
@Getter
@Service
public class TMDBService {

    public String fetchMovieInfo(String title,int year){
        String flaskUrl="http://localhost:5000/fetch-movie-info";

        RestTemplate restTemplate=new RestTemplate();

        // prepare payload (the query)
        String jsonPayload=String.format("{\"film_title\": \"%s\", \"year\": %d}", title, year);

        // prepare header
        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON); // the payload type will be json

        // create HTTP request (payload+header)
        HttpEntity<String> requestEntity=new HttpEntity<>(jsonPayload,headers);

        try{
            ResponseEntity<String> response=restTemplate.postForEntity(flaskUrl,requestEntity,String.class);

            return response.getBody();
        } catch (Exception e){
            return "Error fetching movie info"+e.getMessage();
        }
    }
}
