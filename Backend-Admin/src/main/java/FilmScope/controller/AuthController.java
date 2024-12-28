package FilmScope.controller;

import FilmScope.dto.RegisterDto;
import FilmScope.entity.Role;
import FilmScope.entity.UserEntity;
import FilmScope.repository.RoleRepository;
import FilmScope.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("auth-filmscope")
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        if (userRepository.existsByUsername(registerDto.getUsername())){
            return new ResponseEntity<>("Username is taken", HttpStatus.BAD_REQUEST);
        }

        UserEntity user=new UserEntity();
        user.setUsername(registerDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword())); // password need to encode

        Role roles=roleRepository.findByRole("USER").get();
        user.setRoles(Collections.singletonList(roles));

        userRepository.save(user);

        return ResponseEntity.ok("User Register Success");
    }

    @PostMapping("register-admin")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterDto registerDto){
        if(userRepository.existsByUsername(registerDto.getUsername())){
            return ResponseEntity.badRequest().body("User is Created");
        }

        UserEntity adminUser=new UserEntity();
        adminUser.setUsername(registerDto.getUsername());
        adminUser.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles=roleRepository.findByRole("ADMIN").get();

        adminUser.setRoles(Collections.singletonList(roles));

        userRepository.save(adminUser);

        return ResponseEntity.ok("Admin Registered Successfully");

    }
}
