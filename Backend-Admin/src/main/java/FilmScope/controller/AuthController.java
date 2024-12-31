package FilmScope.controller;

import FilmScope.dto.AuthResponseDto;
import FilmScope.dto.LoginDto;
import FilmScope.dto.RegisterDto;
import FilmScope.entity.Role;
import FilmScope.entity.UserEntity;
import FilmScope.repository.RoleRepository;
import FilmScope.repository.UserRepository;
import FilmScope.security.JWTGenerator;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("auth-filmscope")
@AllArgsConstructor
public class AuthController {
    private AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private JWTGenerator jwtGenerator;

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

    @PostMapping("register-admin-apply")
    public ResponseEntity<String> registerAdmin(@RequestBody RegisterDto registerDto){
        if(userRepository.existsByUsername(registerDto.getUsername())){
            return ResponseEntity.badRequest().body("User is Created");
        }

        UserEntity adminUser=new UserEntity();
        adminUser.setUsername(registerDto.getUsername());
        adminUser.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Role roles=roleRepository.findByRole("PENDING ADMIN").get();

        adminUser.setRoles(Collections.singletonList(roles));

        userRepository.save(adminUser);

        return ResponseEntity.ok("Your application for admin has been received and is awaiting approval");
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginDto loginDto){
        Authentication authentication =authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(),loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token= jwtGenerator.generateToken(authentication);
        return ResponseEntity.ok(new AuthResponseDto(token));
    }
}
