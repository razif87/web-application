package com.razif.backend.vo;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SignupRequest {

  @NotBlank
  @Size(max = 40)
  @Email
  private String username;

  @NotBlank
  @Size(min = 6, max = 20)
  private String password;

  @NotBlank
  @Size(min = 4, max = 40)
  private String name;
}
