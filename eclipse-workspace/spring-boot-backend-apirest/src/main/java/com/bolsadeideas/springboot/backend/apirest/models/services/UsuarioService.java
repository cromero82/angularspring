package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bolsadeideas.springboot.backend.apirest.models.dao.IUsuarioDao;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Usuario;

@Service
public class UsuarioService implements UserDetailsService{

	private Logger logger = LoggerFactory.getLogger(UsuarioService.class);
	
	@Autowired
	private IUsuarioDao usuarioDao;
	
	@Override
	@Transactional  
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario usuario = usuarioDao.findByUsername(username);
		
		if(usuario == null) {
			logger.error("Error: No existe el usuario: " + username + " en el sistema.");
			throw new UsernameNotFoundException("Error: No existe el usuario: '" + username + "' en el sistema.");
		}
		
		// Lista de authorities del standar spring que se obtienen de la lista de roles y mapean respectivamente
		List<GrantedAuthority> authorities = usuario.getRoles()
				.stream()
				.map( role -> new SimpleGrantedAuthority(role.getNombre()))
				
				// accedemos a cada authority y mostramos en el log cada uno (una forma de acceder a dicho lisitado (aunque item por item)
				.peek(authority -> logger.info(authority.getAuthority()) )
				.collect(Collectors.toList());
		
		return new User(usuario.getUserName(), usuario.getPassword(), usuario.getEnabled(), true, true, true,authorities);
	}

}
