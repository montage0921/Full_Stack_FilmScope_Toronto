package FilmScope.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private  String accessToken;
    private String tokenType="Bearer";

    public AuthResponseDto(String accessToken){
        this.accessToken=accessToken;
    }

}
