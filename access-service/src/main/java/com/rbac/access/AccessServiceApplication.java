package com.rbac.access;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class AccessServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AccessServiceApplication.class, args);
	}

}
