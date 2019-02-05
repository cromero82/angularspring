package com.bolsadeideas.springboot.backend.apirest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
/* se va a ejecutar un bloque antes de arrancar la solucion (CommandLineRunner)*/ 
public class SpringBootBackendApirestApplication implements CommandLineRunner 
{
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public static void main(String[] args) {
		SpringApplication.run(SpringBootBackendApirestApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// A modo de prueba se van a generar las contraseñas, para registrarlas en las semillas de usuarios
		String password = "12345";		
		for(int i=0; i < 4; i++){
			String passworBcryp = passwordEncoder.encode(password);
			System.out.println(passworBcryp);
		}
	}

}

