package com.best.sell.bestsell2.model.sales;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "contracts")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String contractNumber;
    private LocalDateTime createdAt;
    private LocalDateTime validTill;
    @Enumerated(EnumType.STRING)
    private ContractStatus contractStatus;
    @ManyToOne
    private ContractType contractType;
    @ManyToOne
    private VatType vatType;
    private


    enum ContractStatus {
       VALID, EXPIRED
    }
}
