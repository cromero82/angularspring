package com.bolsadeideas.springboot.backend.apirest.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

// Servidor de recursos

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	// REGLAS POR EL LADO DE OAuth
	@Override
	public void configure(HttpSecurity http) throws Exception {
		// vamor a dar acceso a ApiClientes (permiso a todos)
		http.authorizeRequests().antMatchers(HttpMethod.GET,"/api/clientes","/api/clientes/page/**","/api/uploads/img/*").permitAll()
		
		// ROLE_USER is converted on USER.
		/*.antMatchers(HttpMethod.GET, "/api/clientes/{id}").hasAnyRole("USER","ADMIN")
		
		// Para upload de fotos
		.antMatchers(HttpMethod.POST,"/api/clientes/upload").hasAnyRole("USER","ADMIN")
		
		.antMatchers(HttpMethod.POST, "/api/clientes").hasRole("ADMIN")
		
		// aplica para todos los metodos y de clientes en adelante en la url (ejemplo CRUD) y regiones
		.antMatchers("/api/clientes/**").hasRole("ADMIN")*/
		
			.anyRequest().authenticated();
	}
	
}
