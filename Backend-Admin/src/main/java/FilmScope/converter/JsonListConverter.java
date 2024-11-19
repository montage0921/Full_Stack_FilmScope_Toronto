package FilmScope.converter;

// A Jackson exception class
import com.fasterxml.jackson.core.JsonProcessingException;
// A utility class from Jackson to convert between Java objects and JSON
import com.fasterxml.jackson.databind.ObjectMapper;

// JPA interface that allows me to convert between db column and java entity
import jakarta.persistence.AttributeConverter;
// Annotation to make a class JPA converter
import jakarta.persistence.Converter;
import java.util.List;
import java.util.ArrayList;

@Converter // make this class a custom converter used by JPA
public class JsonListConverter implements AttributeConverter<List<String>,String>{
    private final ObjectMapper objectMapper=new ObjectMapper();

    // convert a java list to json string
    @Override
    public String convertToDatabaseColumn(List<String> attribute){
        if (attribute==null||attribute.isEmpty()){
            return "[]";
        }
        try{
            return objectMapper.writeValueAsString(attribute);
            // writeValueAsString() converts List<String> to Json String
        } catch (JsonProcessingException e){
            throw new IllegalArgumentException("Error converting list to JSON string",e);
        }
    }

    // convert a json string to java list
    @Override
    public List<String> convertToEntityAttribute(String dbData){
        if(dbData==null||dbData.isEmpty()){
            return new ArrayList<>();
        }

        try{
            return objectMapper.readValue(dbData,
                    objectMapper.getTypeFactory().constructCollectionType(List.class,String.class));
        } catch(JsonProcessingException e){
            throw new IllegalArgumentException("Error converting Json String to list",e);
        }

    }


}
