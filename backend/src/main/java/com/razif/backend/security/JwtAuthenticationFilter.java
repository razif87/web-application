package com.razif.backend.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.razif.backend.constant.SecurityConstant;
import com.razif.backend.service.UserService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired private JwtTokenProvider tokenProvider;

  @Autowired private UserService userService;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (StringUtils.isNotBlank(authHeader)
        && StringUtils.startsWith(authHeader, SecurityConstant.TOKEN_PREFIX)) {
      String authToken = StringUtils.substring(authHeader, SecurityConstant.TOKEN_PREFIX.length());

      if (Boolean.logicalAnd(
          StringUtils.isNotBlank(authToken), tokenProvider.validateToken(authToken))) {
        String username = tokenProvider.getUsernameFromToken(authToken);

        UserDetails userDetails = userService.loadUserByUsername(username);

        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    }
    filterChain.doFilter(request, response);
  }
}
