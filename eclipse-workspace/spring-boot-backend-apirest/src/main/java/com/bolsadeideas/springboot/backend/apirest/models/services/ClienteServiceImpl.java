package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bolsadeideas.springboot.backend.apirest.models.dao.IClienteDao;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;

@Service		// declaramos esta clase como un componente de servicio de spring (en el contexto), es un estereotipo de component, para que sea un componente del framework
public class ClienteServiceImpl implements IClienteService {

	@Autowired		// Inyecta el cliente dao y queda guardada en el contenedor de Spring (en el contexto)
	private IClienteDao clienteDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Cliente> findAll() {		
		return (List<Cliente>) clienteDao.findAll();
	}

}
