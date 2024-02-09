package com.best.sell.bestsell2.repositories;

import com.best.sell.bestsell2.model.client.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Integer> {
}
