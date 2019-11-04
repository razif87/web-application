package com.razif.backend.config;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;

import lombok.Data;

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "spring.jjwt")
public class JjwtConfig {

  @NotEmpty private String secret;

  @NotNull private Integer iteration;

  @NotNull private Integer keyLength;

  @NotNull private Long expirationTime;
}
