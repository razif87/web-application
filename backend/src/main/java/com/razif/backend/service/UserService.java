package com.razif.backend.service;

import java.util.Collections;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mongodb.MongoException;
import com.razif.backend.document.User;
import com.razif.backend.document.UserRole;
import com.razif.backend.repository.UserRepository;
import com.razif.backend.security.JwtTokenProvider;
import com.razif.backend.vo.SigninRequest;
import com.razif.backend.vo.SignupRequest;

@Service
public class UserService implements UserDetailsService {

  @Autowired private AuthenticationManager authenticationManager;

  @Autowired private PasswordEncoder passwordEncoder;

  @Autowired private UserRepository userRepository;

  @Autowired private JwtTokenProvider tokenProvider;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository
        .findByUsername(username)
        .orElseThrow(() -> new MongoException(String.format("Username %s is not found", username)));
  }

  public User saveUser(User user) {
    return userRepository.save(user);
  }

  public String authenticateUser(SigninRequest request) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    return tokenProvider.generateToken((User) authentication.getPrincipal());
  }

  public User registerUser(SignupRequest request) {
    if (userRepository.existsByUsername(request.getUsername())) {
      throw new RuntimeException(String.format("Username %s already taken", request.getUsername()));
    }

    User user = new User();
    BeanUtils.copyProperties(request, user);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRoles(Collections.singleton(UserRole.ROLE_USER));

    return userRepository.save(user);
  }
}
