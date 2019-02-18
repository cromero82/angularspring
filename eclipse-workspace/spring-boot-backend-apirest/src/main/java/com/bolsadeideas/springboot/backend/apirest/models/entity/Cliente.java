package com.bolsadeideas.springboot.backend.apirest.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity 
@Table(name="clientes")
public class Cliente implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="no puede estar vacio")
	@Size(min= 4, max=12, message="el tamaño tiene que estar entre 4 y 12 caracteres")
	@Column(nullable=false)
	private String nombre;
	
	@NotEmpty(message="no puede estar vacio")
//	@Size(min= 4, max=12, message="el tamaño tiene que estar entre 4 y 12 caracteres")
//	@Column(nullable=false)
	private String apellido;
	
	@NotEmpty(message="no puede estar vacio")
	@Email(message="no es una dirección de correo bien formada")
	@Column(nullable=false, unique=true)
	private String email;
	
	@NotNull(message="no puede estar vacio")
//	@JsonFormat(shape = JsonFormat.Shape.STRING, locale = "es-CO", timezone = "America/Bogota")
	@Column(name="create_at")
	@Temporal(TemporalType.DATE)
	private Date createAt;
	
	
	private String foto;
	
	@NotNull(message= "la región no puede ser vacia")
	// Porque son muchos clientes en una region
	// Con lazy genera unos proxy 
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="region_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
	private Region region;
	
	// mappedBy "cliente" en la clase factura.
	// cacade: cada vez que eliminemos un cliente, eliminara o insertara en cascada
	@JsonIgnoreProperties({"cliente", "hibernateLazyInitializer","handler"})
	@OneToMany(fetch=FetchType.LAZY, mappedBy="cliente", cascade= CascadeType.ALL)
	private List<Factura> facturas;
	
	
	
//	 Antes de persistir (anters de crear) se ejecutara esta funcion
//	@PrePersist
//	public void prePersist() {
//		createAt = new Date();
//	}
	
	public Cliente() {
		this.facturas = new ArrayList<Factura>();
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}
	
	public Long getId() {
		return id;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}
	
	
	
	public List<Factura> getFacturas() {
		return facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}



	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
