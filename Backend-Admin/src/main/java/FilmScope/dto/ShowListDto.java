package FilmScope.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ShowListDto {
    private Integer id;
    private String theatre;
    private String showName;
    private String filmName;
    private Set<String> showDate;
}
