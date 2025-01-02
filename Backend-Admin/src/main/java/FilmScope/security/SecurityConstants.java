package FilmScope.security;

import lombok.Getter;

@Getter
public class SecurityConstants {
    public static final long JWT_EXPIRATION=36000000;
    public static final String JWT_SECRET="YourSecureRandomSecretKeyForJWT123";
}
