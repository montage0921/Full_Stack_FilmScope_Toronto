package FilmScope.converter;

// A Jackson exception class

import com.fasterxml.jackson.core.JsonProcessingException;
// A utility class from Jackson to convert between Java objects and JSON
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

// JPA interface that allows me to convert between db column and java entity
import jakarta.persistence.AttributeConverter;
// Annotation to make a class JPA converter
import jakarta.persistence.Converter;

import java.util.List;
import java.util.Map;


@Converter
public class JsonShowTimeConverter implements AttributeConverter<Map<String, List<List<String>>>, String> {
    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String,List<List<String>>> showtimes){
        if(showtimes==null){
            return null;
        }

        try{
            return objectMapper.writeValueAsString(showtimes);
        } catch(JsonProcessingException e){

            throw new IllegalArgumentException("Error converting Json string to showtimes");
        }
    }

    @Override
    public Map<String,List<List<String>>> convertToEntityAttribute(String showtimesJson){
        if (showtimesJson == null || showtimesJson.isEmpty()) {
            return null;
        }

        try{
            return objectMapper.readValue(showtimesJson, new TypeReference<Map<String,List<List<String>>>>() {});
        } catch(JsonProcessingException e){

            throw new IllegalArgumentException("Error converting Json string to showtimes");
        }
    }


}
