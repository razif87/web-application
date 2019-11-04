package com.razif.backend.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {

  private String accessToken;
  private String tokenType;
}
