package FilmScope.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    public UserEntity(String username,String password,List<Roles> roles){
        this.username=username;
        this.password=password;
        this.roles=roles;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private String password;

    @ManyToMany(fetch=FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinTable(name="user_roles",joinColumns = @JoinColumn(name="user_id",referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name="role_id",referencedColumnName = "id"))
    private List<Roles> roles=new ArrayList<>();

}
