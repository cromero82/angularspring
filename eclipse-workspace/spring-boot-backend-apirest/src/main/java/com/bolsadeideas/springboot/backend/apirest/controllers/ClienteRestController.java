package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
import com.bolsadeideas.springboot.backend.apirest.models.services.IClienteService;

@RestController // por ser un controlador API-REST
@RequestMapping("/api")	// Url (Endpoint) general
public class ClienteRestController {
	
	@Autowired // inyeccion
	private IClienteService clienteService;	// Inyecta el services que ya esta en el calificador (como solo tenemos ClienteServiceImple.java) entonces inyecta dicha clase,  si tuviera mas de una se utilizaria un calificador
	
	@GetMapping("/clientes") // URL método actual
	public List<Cliente> index(){
		return clienteService.findAll();
	}

}
