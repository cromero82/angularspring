package com.bolsadeideas.springboot.backend.apirest.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AutorizationServerConfig  extends AuthorizationServerConfigurerAdapter{
	@Autowired
 private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authenticationManager;

	// Los permisos de nuestras rutas de acceso de OUTH2 
	@Override
	public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
		
		// damos permiso a cualquier usuario ya sea anonimo o no para autenticarse
		security.tokenKeyAccess("permiteAll()")
			// dar el permiso al endPoint para validar el token
			.checkTokenAccess("isAuthenticated()");
	}

	// Se configuran los tipos de clientes, en este caso una app angular, pero si en el futuro quisieramos un cliente movil u otro tipo de cliente,
	// entonces se realiza por inyeccion de dependencias con ese nuevo tipo de cliente
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory().withClient("angularapp")
			.secret(passwordEncoder.encode("12345"))
			// el alcance (scope) leer y escribir datos
			.scopes("read","write")
			// Tipo de consecion, como lo va a accecer, es decir un login (tambien tenemos otros Authorization Code )
			// refresh_token nos permite obtener un token actualizado
			.authorizedGrantTypes("password","refresh_token")
			// Tiempo de caducidad (1 hora : 3600)
			.accessTokenValiditySeconds(3600)
			.refreshTokenValiditySeconds(3600);
	}

	/// configurar el endpoint, se encarga de todo el proceso de autenticacion y tambien validar el token, realiza la autenticacion general el token y entrega al usuario.
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		
		endpoints.authenticationManager(authenticationManager)
		// Encargado de manejar el token. almacenar los datos (claims) en el token.
		// ademas se encarga de codificar (traducir) dichos datos del cliente (claims)
		.tokenStore(tokenStore())
		.accessTokenConverter(accessTokenConverter());
	}	

	@Bean
	public JwtTokenStore tokenStore() {
		return new  JwtTokenStore(accessTokenConverter());
	}

	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter jwtAccessTokenConverter = new JwtAccessTokenConverter();
		jwtAccessTokenConverter.setSigningKey(JwtConfig.LLAVE_SECRETA);
		return jwtAccessTokenConverter;
	}
	
	
 
}
