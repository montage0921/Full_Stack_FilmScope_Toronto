package FilmScope.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

import static FilmScope.security.SecurityConstants.JWT_SECRET;

@Component
public class JWTGenerator {
    final SecretKey secretKey = Keys.hmacShaKeyFor(SecurityConstants.JWT_SECRET.getBytes());

    public String generateToken(Authentication authentication){
        String username=authentication.getName();
        Date currentDate=new Date();
        Date expireDate=new Date(currentDate.getTime()+1500*60*1000);


        // Build the JWT using the new, secure API

        return Jwts.builder()
                .claim("sub", username) // Add subject as a claim
                .claim("iat", currentDate) // Issued at in seconds
                .claim("exp", expireDate) // Expiration in seconds
                .signWith(secretKey) // Use the Key object for signing
                .compact();

    }

    public String getUserNameFromJWT(String token){
        Claims claims=Jwts.parser()
                .verifyWith(secretKey)
                .build().parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            // Parse and validate the token
            Claims claims = Jwts.parser()
                    .verifyWith(secretKey) // Verify the signature
                    .build()
                    .parseSignedClaims(token) // Parse the token
                    .getPayload(); // Extract the claims (payload)

            // Validate expiration
            Date expiration = claims.get("exp", Date.class);
            if (expiration.before(new Date())) {
                System.out.println("Token is expired");
                return false;
            }

            // You can validate other claims here, e.g., "sub" (subject)
            String username = claims.get("sub", String.class);
            if (username == null || username.isEmpty()) {
                System.out.println("Invalid subject");
                return false;
            }

            // If all checks pass, the token is valid
            return true;

        } catch (Exception e) {
            // Handle invalid tokens (e.g., bad signature, malformed, expired)
            System.out.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }
}
