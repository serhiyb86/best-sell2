package com.best.sell.bestsell2.model.client;

import com.best.sell.bestsell2.model.client.City;
import com.best.sell.bestsell2.model.client.Street;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String postal;
    @ManyToOne
    private Region region;
    @ManyToOne
    private City city;
    @ManyToOne
    private Street street;
    private String build;
    private String subBuild;
    private String apartment;

}
