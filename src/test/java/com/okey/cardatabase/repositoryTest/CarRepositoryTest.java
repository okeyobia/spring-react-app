package com.okey.cardatabase.repositoryTest;

import com.okey.cardatabase.domain.Car;
import com.okey.cardatabase.repository.CarRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@RunWith(SpringRunner.class)
public class CarRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CarRepository repository;

    @Test
    public void saveCarShouldNotbeNull() {
        Car car = new Car("Tesla", "Model X", "Shade of Blue",
                "ABC-1243", 2018, 4023);
        entityManager.persistAndFlush(car);
        assertThat(car.getId()).isNotNull();
    }

    @Test
   public void deleteCarShouldShowEmptyList() {
        entityManager.persistAndFlush(new Car("Tesla", "Model X", "White",
                "ABC-1234", 2017, 86000));
        entityManager.persistAndFlush(new Car("Mini", "Cooper", "Yellow",
                "BWS-3007", 2015, 24500));

        repository.deleteAll();
        assertThat(repository.findAll()).isEmpty();
    }
}
