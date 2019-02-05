package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bolsadeideas.springboot.backend.apirest.models.dao.IClienteDao;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Region;

@Service		// declaramos esta clase como un componente de servicio de spring (en el contexto), es un estereotipo de component, para que sea un componente del framework
public class ClienteServiceImpl implements IClienteService {

	@Autowired		// Inyecta el cliente dao y queda guardada en el contenedor de Spring (en el contexto)
	private IClienteDao clienteDao;
	
	@Override
	@Transactional(readOnly=true)
	public Page<Cliente> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return clienteDao.findAll(pageable);
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<Cliente> findAll() {		
		return (List<Cliente>) clienteDao.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Cliente findById(Long id) {		
		return  clienteDao.findById(id).orElse(null);	// si no lo encuentra retorna null
	}

	@Override
	@Transactional
	public Cliente save(Cliente cliente) {		
		return clienteDao.save(cliente);
	}

	@Override
	@Transactional
	public void delete(Long id) {
		clienteDao.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly=true)
	public List<Region> findAllRegiones() {
		return clienteDao.findAllRegiones();
	}	

}
