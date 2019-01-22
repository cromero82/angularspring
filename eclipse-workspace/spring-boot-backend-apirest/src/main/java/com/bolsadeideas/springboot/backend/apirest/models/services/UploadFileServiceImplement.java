package com.bolsadeideas.springboot.backend.apirest.models.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadFileServiceImplement implements IUploadFileService {
	// Implementa un log para ver como se muestra la ruta de archivos
	private final Logger log = LoggerFactory.getLogger(UploadFileServiceImplement.class);
	private final static String DIRECTORIO_UPLOAD = "uploads"; // "C://spring5//uploads" ;

	@Override
	public Resource cargar(String nombreFoto) throws MalformedURLException {
		Path rutaArchivo = this.getPath(nombreFoto);
		log.info(rutaArchivo.toString());

		Resource recurso = null;

		recurso = new UrlResource(rutaArchivo.toUri());

		if (!recurso.exists() && !recurso.isReadable()) {
			rutaArchivo = Paths.get("src/main/resources/static/images").resolve("no-usuario.png").toAbsolutePath();
			recurso = new UrlResource(rutaArchivo.toUri());
			// log.error("No se pudo cargar la imagaen " + nombreFoto);
		}
		return recurso;
	}

	@Override
	public String copiar(MultipartFile archivo) throws IOException {
		String nombreArchivo = UUID.randomUUID() + "_" + archivo.getOriginalFilename();
		Path rutaArchivo = Paths.get(DIRECTORIO_UPLOAD).resolve(nombreArchivo).toAbsolutePath();
		log.info(rutaArchivo.toString());

		Files.copy(archivo.getInputStream(), rutaArchivo);

		return nombreArchivo;
	}

	@Override
	public boolean eliminar(String nombreFoto) {
		if(nombreFoto != null && nombreFoto.length() > 0) {
			Path rutaFoto = Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto).toAbsolutePath();
			File archivoFoto = rutaFoto.toFile();
			if(archivoFoto.exists() && archivoFoto.canRead()) {
				archivoFoto.delete();
				return true;
			}
		}		
		return false;
	}

	@Override
	public Path getPath(String nombreFoto) {
		return Paths.get(DIRECTORIO_UPLOAD).resolve(nombreFoto).toAbsolutePath();
	}

}
