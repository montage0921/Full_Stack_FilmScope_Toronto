package FilmScope.controller;

import FilmScope.entity.Role;
import FilmScope.entity.UserEntity;
import FilmScope.repository.RoleRepository;
import FilmScope.repository.UserRepository;
import FilmScope.service.UserService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/admin-filmscope")
public class UserController {

    private final UserService userService;

    @PostMapping("approve-admin-application")
    public ResponseEntity<String> reviewAdminApplication(@RequestParam String username){
        System.out.println(username);
        String message=userService.approve(username);
        System.out.println(message);
        return ResponseEntity.ok(message);
    }

    @PostMapping("reject-admin-application")
    public ResponseEntity<String> rejectAdminApplication(@RequestParam String username){
        return ResponseEntity.ok("Your admin registration application is rejected");
    }


}
