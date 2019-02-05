package com.bolsadeideas.springboot.backend.apirest.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsService usuarioService;
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	@Autowired
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(this.usuarioService).passwordEncoder(passwordEncoder());
	}

	@Override
	@Bean("authenticationManager")
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}
	
	// Reglas por el lado de SPRING
	@Override
	public void configure(HttpSecurity http) throws Exception {
		// vamor a dar acceso a ApiClientes (permiso a todos)
		http.authorizeRequests()
			// se quita porque el acceso a las rutas se manejara en ResourceServerConfig.java
			//.antMatchers(HttpMethod.GET,"/api/clientes").permitAll()  
			.anyRequest().authenticated()
			// en angular no se necesita la protección CSRF: Cross-site request Forgery o falsificacion de peticion en sitios cruzados.
			// para volver a la seguridad del httpSecurity
			.and().csrf().disable()
			// autenticacion sin estado (sin sesiones, no es una app MVC por ejemplo)
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}
	
}
