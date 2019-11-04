package com.razif.backend.security;

import java.io.Serializable;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.razif.backend.config.JjwtConfig;
import com.razif.backend.document.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;

@Component
public class JwtTokenProvider implements Serializable {

  private static final long serialVersionUID = 1L;

  @Autowired private JjwtConfig jjwtConfig;

  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  public Date getExpirationDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  public String generateToken(User user) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", user.getRoles());
    return doGenerateToken(claims, user.getUsername());
  }

  private String doGenerateToken(Map<String, Object> claims, String username) {
    Long expirationTime = jjwtConfig.getExpirationTime(); // in second

    final Date createdDate = new Date();
    final Date expirationDate = new Date(createdDate.getTime() + expirationTime * 1000);
    byte[] secretKeyBytes =
        Decoders.BASE64.decode(
            Base64.getEncoder().encodeToString(jjwtConfig.getSecret().getBytes()));
    SecretKey key = new SecretKeySpec(secretKeyBytes, SignatureAlgorithm.HS512.getJcaName());
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(username)
        .setIssuedAt(createdDate)
        .setExpiration(expirationDate)
        .signWith(key, SignatureAlgorithm.HS512)
        .compact();
  }

  public Boolean validateToken(String token) {
    return !isTokenExpired(token);
  }

  private Boolean isTokenExpired(String token) {
    final Date expiration = getExpirationDateFromToken(token);
    return expiration.before(new Date());
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims);
  }

  public Claims getAllClaimsFromToken(String token) {
    return Jwts.parser()
        .setSigningKey(Base64.getEncoder().encodeToString(jjwtConfig.getSecret().getBytes()))
        .parseClaimsJws(token)
        .getBody();
  }
}
