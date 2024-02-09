package com.best.sell.bestsell2.model.client;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "clients")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Size(min = 3)
    private String abbName;
    private String fullName;
    private String ipn;
    private String telephoneNumber;
    @ManyToOne
    private Address clientAddress;
    @Enumerated(EnumType.STRING)
    private ClientStatus clientStatus;
    @Enumerated(EnumType.STRING)
    private ClientType clientType;
    private LocalDateTime createdAt;
}
