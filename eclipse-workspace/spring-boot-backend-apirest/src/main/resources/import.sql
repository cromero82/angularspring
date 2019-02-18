-- IMPORTANTE. Se tiene que llamar de esta forma "import.sql" ya que SpringBoot va a buscar a traves de Hibernate si existe este archivo y lo ejecutara
INSERT INTO regiones (id, nombre) VALUES (1,'Sudamérica');
INSERT INTO regiones (id, nombre) VALUES (2,'Centroamérica');
INSERT INTO regiones (id, nombre) VALUES (3,'Norteamérica');
INSERT INTO regiones (id, nombre) VALUES (4,'Europa');
INSERT INTO regiones (id, nombre) VALUES (5,'Asia');
INSERT INTO regiones (id, nombre) VALUES (6,'Africa');
INSERT INTO regiones (id, nombre) VALUES (7,'Oceanía');
INSERT INTO regiones (id, nombre) VALUES (8,'Antártida');

INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (1,'Andrés','Guzmán','profesor@bolsadeideas.com','2018-01-01');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (2,'Mr. John','Dpe1','john.doe@gmail.com','2018-01-02');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4,'Linus','Trovalds','linus.trovalds@gmail.com','2018-01-03');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4,'Rasmus','Lerdorf','rasmus.lerdorf@gmail.com','2018-01-04');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (4,'Erich','Gamma','erich.gamma@gmail.com','2018-02-01');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3,'Richard','Helm','richard.helm@gmail.com','2018-02-10');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3,'Ralph','Johnson','ralphjohnson@gmail.com','2018-02-18');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3,'John','Vlissides','john.vlissides@gmail.com','2018-02-28');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (3,'Dr. James','Gosling','jamesgosling@gmail.com','2018-03-03');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (5,'Magma','Lee','magma.lee@gmail.gom','2018-03-04');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (6,'Tornado','Roe','tornado.roe@gmail.com','2018-03-05');
INSERT INTO clientes (region_id, nombre, apellido, email, create_at) VALUES (7,'Jade','Doe','jade.doe@gmail.com','2018-03-06');

/**********			Creamos algunos usuarios con sus roles		*********/
-- El password esta encriptado por ese motivo no va en esta semilla
INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES ('andres', '$2a$10$19jWSSA5dzhkrcFKMGoS/uYi96plWSMEzL1DwY.Ncc7JbHquuFrBW', 1,'jhon','guzman','jhonguzman@bolsadeideas');
INSERT INTO usuarios (username, password, CM AKMSÑDKFLASD.,FMASDFAS.DFNSNDFJDSVJZXCCVJZXCLKVXCJVLZKXCVJLKXCNVLKXZCVFASDFJASDJFSDFJSADKLFJASLKDFKASJFASenabled, nombre, apellido, email) VALUES ('admin', '$2a$10$RtxFynsp8lAuwOcUI4K06.Ti/M1z9oXmGbcL15NQUz83UJ0CiFy1K', 1,'jhon','doe','jhondoe@bolsadeideas');

INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,1);

/*			Algunos productos		**/
INSERT INTO productos (nombre, precio, create_at) VALUES ('Panasolic Pantalla LCD', 249990, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('sONY cAMRA DSC-2320B', 123490, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Apple iPod shuffle', 1499990, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Sony Notebook Z110', 37990, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('hEWLETT pACKARD mULTIFUNCIONAL f2280', 69990, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Bianchi Bicicleta Aro 26pulg', 69990, NOW());
INSERT INTO productos (nombre, precio, create_at) VALUES ('Mica Comoda 5 Cajones', 29990, NOW());

/**			Algunas Facturas	 ***/
INSERT INTO facturas (descripcion, observacion, cliente_id, create_at) VALUES ('Factura equipos de oficina', null, 1, NOW());
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (1,1,1);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (2,1,4);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (1,1,5);
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES (1,1,7);

INSERT INTO facturas (descripcion, observacion, cliente_id, create_at) VALUES ('Factura Bicicleta','Alguna nota importante!',1,NOW());
INSERT INTO facturas_items (cantidad, factura_id, producto_id) VALUES(3,2,6);

