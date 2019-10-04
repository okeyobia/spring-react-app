package com.okey.cardatabase;

import com.okey.cardatabase.domain.Car;
import com.okey.cardatabase.domain.Owner;
import com.okey.cardatabase.domain.User;
import com.okey.cardatabase.repository.CarRepository;
import com.okey.cardatabase.repository.OwnerRepository;
import com.okey.cardatabase.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CardatabaseApplication {
	private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);

	private CarRepository carRepository;
	private OwnerRepository ownerRepository;
	private UserRepository userRepository;

	public CardatabaseApplication(CarRepository carRepository, OwnerRepository ownerRepository, UserRepository userRepository) {
		this.carRepository = carRepository;
		this.ownerRepository = ownerRepository;
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
		logger.info("Hello Spring Boot!!");
	}

	@Bean
	CommandLineRunner runner() {
		return args -> {
			Owner owner1 = new Owner("John" , "Doe");
			Owner owner2 = new Owner("Mary" , "Johnson");
			Owner owner3 = new Owner("Okey" , "Obia");
			ownerRepository.save(owner1);
			ownerRepository.save(owner2);
			ownerRepository.save(owner3);
			carRepository.save(new Car("Ford", "Mustang", "Red",
					"ADF-1121", 2017, 59000, owner1));
			carRepository.save(new Car("Nissan", "Leaf", "White",
					"SSJ-3002", 2014, 29000, owner2));
			carRepository.save(new Car("Toyota", "Corolla", "Blue",
					"WKO-4512", 2013, 28000, owner3));

			carRepository.save(new Car("Toyota", "Camry", "Black",
					"KKO-2312", 2012, 22000, owner3));
			carRepository.save(new Car("Nissan", "Murano", "Silver",
					"KKO-0212", 2019, 41000, owner3));


			// username: user password: user
			userRepository.save(new User("user",
					"$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi",
					"USER"));
			// username: admin password: admin
			userRepository.save(new User("admin",
					"$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG",
					"ADMIN"));
		};
	}

}
