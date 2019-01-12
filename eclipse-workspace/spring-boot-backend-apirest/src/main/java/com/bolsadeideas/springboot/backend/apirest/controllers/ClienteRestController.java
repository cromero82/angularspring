package com.bolsadeideas.springboot.backend.apirest.controllers;

//import java.util.Date;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
import com.bolsadeideas.springboot.backend.apirest.models.services.IClienteService;

@CrossOrigin(origins= {"http://localhost:4200"}) // Configuracion Cors (habilita todos los metodos Get, Post, etc)
@RestController // por ser un controlador API-REST
@RequestMapping("/api")	// Url (Endpoint) general
public class ClienteRestController {
	
	@Autowired // inyeccion
	private IClienteService clienteService;	// Inyecta el services que ya esta en el calificador (como solo tenemos ClienteServiceImple.java) entonces inyecta dicha clase,  si tuviera mas de una se utilizaria un calificador
	
	@GetMapping("/clientes") // URL método actual
	public List<Cliente> index(){
		return clienteService.findAll();
	}

	//	@ResponseStatus(HttpStatus.OK) (Por default es OK) por ellos se omite
	@GetMapping("/clientes/{id}") // URL método actual
	public Cliente show(@PathVariable Long id){
		return clienteService.findById(id);
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/clientes")
	public Cliente create(@RequestBody Cliente cliente) {
		//cliente.setCreateAt(new Date()); // o tambien en el model con el metodo prePersist
		return clienteService.save(cliente);
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PutMapping("/clientes")
	public Cliente put(@RequestBody Cliente cliente, @PathVariable Long id) {
		Cliente clienteActual = clienteService.findById(id);
		clienteActual.setApellido(cliente.getApellido());
		clienteActual.setNombre(cliente.getNombre());
		clienteActual.setEmail(cliente.getEmail());
		return clienteService.save(clienteActual);
	}
	
	@DeleteMapping("/clientes/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id){
		clienteService.delete(id);
	}
}
