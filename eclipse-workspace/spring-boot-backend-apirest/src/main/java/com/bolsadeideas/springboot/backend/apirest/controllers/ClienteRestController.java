package com.bolsadeideas.springboot.backend.apirest.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap; 
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.validation.Valid;
//import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	@GetMapping("/clientes/page/{page}") // URL método actual
	public Page<Cliente> index(@PathVariable Integer page){
		Pageable pageable = PageRequest.of(page, 4);
		Page<Cliente> resultado = clienteService.findAll(pageable);
		//localeResolver.setDefaultLocale(new Locale("zh", "HK"));
		return resultado;
	}

	//	@ResponseStatus(HttpStatus.OK) (Por default es OK) por ellos se omite
	@GetMapping("/clientes/{id}") // URL método actual
	public ResponseEntity<?> show(@PathVariable Long id){
		
		Cliente cliente= null;
		
		Map<String, Object> response = new HashMap<>();
		try {
			cliente= clienteService.findById(id);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar la consulta en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}	
		
		if(cliente== null){
			response.put("mensaje", "El cliente ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
	}
	
	@ResponseStatus(HttpStatus.CREATED)
	@PostMapping("/clientes")
	// @Valid: Un interceptor que valida cada parametro del modelo y en caso de error lo asigna a 'result'
	public ResponseEntity<?> create(@Valid @RequestBody Cliente cliente, BindingResult result) {
		Cliente clienteNew = null;
		//cliente.setCreateAt(new Date()); // o tambien en el model con el metodo prePersist
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()){
			// Forma anterior al JDK 8
//			List<String> errors = new ArrayList<>();
//			for(FieldError err: result.getFieldErrors() ) {
//				errors.add("El campo" + err.getField() +" "+ err.getDefaultMessage());
//			}
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err ->  "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
					
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		try {
			clienteNew = clienteService.save(cliente);
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al realizar el insert en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El cliente ha sido creado con éxito");	
		response.put("cliente",clienteNew);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}

	@ResponseStatus(HttpStatus.CREATED)
	@PutMapping("/clientes/{id}")
	public  ResponseEntity<?> update(@Valid @RequestBody Cliente cliente, @PathVariable Long id, BindingResult result) {
		Map<String, Object> response = new HashMap<>();
		
		if(result.hasErrors()){
			// Forma anterior al JDK 8
//			List<String> errors = new ArrayList<>();
//			for(FieldError err: result.getFieldErrors() ) {
//				errors.add("El campo" + err.getField() +" "+ err.getDefaultMessage());
//			}
			List<String> errors = result.getFieldErrors()
					.stream()
					.map(err ->  "El campo '" + err.getField() +"' "+ err.getDefaultMessage())
					.collect(Collectors.toList());
					
			response.put("errors", errors);
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		}
		
		Cliente clienteActual = clienteService.findById(id);
		Cliente clienteUpdated = null;
		//cliente.setCreateAt(new Date()); // o tambien en el model con el metodo prePersist		
		
		if(clienteActual == null){
			response.put("mensaje", "Error: no se pudo editar, el cliente ID: ".concat(id.toString().concat(" no existe en la base de datos")));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
		}
		
		try {
			clienteActual.setApellido(cliente.getApellido());
			clienteActual.setNombre(cliente.getNombre());
			clienteActual.setEmail(cliente.getEmail());
			clienteActual.setCreateAt(cliente.getCreateAt());
			
			clienteUpdated = clienteService.save(clienteActual);
			
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al actualizar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El cliente ha sido actualizado con éxito");		
		response.put("cliente", clienteUpdated);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
	}
	
	@DeleteMapping("/clientes/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<?> delete(@PathVariable Long id){
		Map<String, Object> response = new HashMap<>();
		try {
			clienteService.delete(id);	
		} catch (DataAccessException e) {
			response.put("mensaje", "Error al eliminar en la base de datos");
			response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}		
		response.put("mensaje", "El cliente ha sido eliminado con éxito");		
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
	
	@PostMapping("/clientes/upload")
	public ResponseEntity<?> upload(@RequestParam("archivo") MultipartFile archivo, @RequestParam("id") Long id){
		Map<String, Object> response = new HashMap<>();
		Cliente cliente = clienteService.findById(id);
		
		if(!archivo.isEmpty()) {
			String nombreArchivo = UUID.randomUUID() +"_"+ archivo.getOriginalFilename();
			Path rutaArchivo = Paths.get("C://spring5//uploads").resolve(nombreArchivo).toAbsolutePath();
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo);				
			} catch (Exception e) {
				response.put("mensaje", "Error al subir la imagen del cliente "+ nombreArchivo);
				response.put("error", e.getMessage().concat(": ").concat(e.getCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			
			cliente.setFoto(nombreArchivo);
			clienteService.save(cliente);
			
			response.put("cliente", cliente);	
			response.put("mensaje", "Has subido correctamente la imagen "+ nombreArchivo);	
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		}
		response.put("mensaje", "Archivo vacio ");
		response.put("error", "Archivo es requerido ");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CHECKPOINT);
	}
}
