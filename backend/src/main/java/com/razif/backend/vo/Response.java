package com.razif.backend.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Response<T> {

  private Boolean success;
  private String message;

  private T data;
}
