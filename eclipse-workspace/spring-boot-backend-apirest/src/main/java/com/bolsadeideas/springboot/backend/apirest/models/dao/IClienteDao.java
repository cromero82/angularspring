package com.bolsadeideas.springboot.backend.apirest.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

//import org.springframework.data.repository.CrudRepository;

import com.bolsadeideas.springboot.backend.apirest.models.entity.Cliente;
import com.bolsadeideas.springboot.backend.apirest.models.entity.Region;

//public interface IClienteDao extends CrudRepository<Cliente, Long> {
public interface IClienteDao extends JpaRepository<Cliente, Long> {
	@Query("from Region")
	List<Region> findAllRegiones();
}
