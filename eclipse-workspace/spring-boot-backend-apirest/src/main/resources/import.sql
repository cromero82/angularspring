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
--INSERT INTO clientes (nombre, apellido, email, create_at) VALUES ('','','','');