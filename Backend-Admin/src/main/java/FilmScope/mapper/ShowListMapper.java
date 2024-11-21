package FilmScope.mapper;

import FilmScope.dto.ShowListDto;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ShowListMapper {

    public static ShowListDto mapShowListToDto(Object[] show){

        return new ShowListDto(
                (Integer) show[0],
                (String) show[1],
                (String) show[2]
        );
    }

    public static Object[] mapDtoToShowList(ShowListDto showListDto){
        Object[] show=new Object[3];
        show[0]=showListDto.getId();
        show[1]=showListDto.getTheatre();
        show[2]=showListDto.getShowTitle();

        return show;
    }
}
