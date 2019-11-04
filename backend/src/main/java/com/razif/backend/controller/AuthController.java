package com.razif.backend.controller;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.razif.backend.document.User;
import com.razif.backend.service.UserService;
import com.razif.backend.vo.AuthResponse;
import com.razif.backend.vo.Response;
import com.razif.backend.vo.SigninRequest;
import com.razif.backend.vo.SignupRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired private UserService userService;

  @PostMapping("/signin")
  public ResponseEntity<AuthResponse> authenticateUser(@Valid @RequestBody SigninRequest request) {

    String jwt = userService.authenticateUser(request);

    return ResponseEntity.ok(AuthResponse.builder().tokenType("Bearer").accessToken(jwt).build());
  }

  @PostMapping("/signup")
  public ResponseEntity<Response<User>> registerUser(@Valid @RequestBody SignupRequest request) {

    User user = userService.registerUser(request);

    URI location =
        ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/users/{username}")
            .buildAndExpand(user.getUsername())
            .toUri();

    return ResponseEntity.created(location)
        .body(
            Response.<User>builder()
                .success(true)
                .message("User registered successfully")
                .data(user)
                .build());
  }
}
