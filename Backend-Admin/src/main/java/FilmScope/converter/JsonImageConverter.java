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

public class JsonImageConverter implements AttributeConverter<List<Map<String,Object>>, String> {
    private final ObjectMapper objectMapper=new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Map<String,Object>> images){
        if(images==null){
            return null;
        }

        try{
            return objectMapper.writeValueAsString(images);
        } catch(JsonProcessingException e){

            throw new IllegalArgumentException("Error converting Json string to showtimes");
        }
    }

    @Override
    public List<Map<String,Object>> convertToEntityAttribute(String imageJson){
        if (imageJson == null || imageJson.isEmpty()) {
            return null;
        }

        try{
            return objectMapper.readValue(imageJson, new TypeReference<List<Map<String,Object>>>() {});
        } catch(JsonProcessingException e){

            throw new IllegalArgumentException("Error converting Json string to showtimes");
        }
    }

}
