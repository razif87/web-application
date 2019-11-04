package com.razif.backend.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.razif.backend.document.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {

  Optional<User> findByUsername(String username);

  boolean existsByUsername(String username);
}
