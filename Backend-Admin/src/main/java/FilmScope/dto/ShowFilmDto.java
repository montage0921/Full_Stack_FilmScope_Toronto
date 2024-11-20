package FilmScope.dto;
import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;
import FilmScope.entity.Film;

public class ShowFilmDto {
    private String theatre;
    private List<LocalDate> showDates;
    private List<LocalTime> showTimes;
    private List<String> films;
    private List<String> links;
    private List<Integer> filmIDs;
    private Boolean published;
    private List<Film> filmInfo;
}
