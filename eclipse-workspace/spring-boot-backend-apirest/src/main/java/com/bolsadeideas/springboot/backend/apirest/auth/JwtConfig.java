package com.bolsadeideas.springboot.backend.apirest.auth;

public class JwtConfig {
	public static final String LLAVE_SECRETA ="alguna.clave.secreta.12345678";
	public static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\r\n" + 
			"MIIEowIBAAKCAQEAutWemrk+6MPzV1lZwsjZA7Te4Ep+GVXCdSErMaWUFSah74/j\r\n" + 
			"UQnJNgByliVkeEfOX83LBTd+Jb8kikXwdMalpClYqZYsf/4ZC6FnxQgWD2OhxUBA\r\n" + 
			"3gJcI3H/a1iPQoGklgJVoRvnIE8iCHmP8CRG7cWJpCK/wcOOxW7qzYaVuGqrFRl9\r\n" + 
			"O66g7DQpdcL7ZHjlrRwXaQp0/vG5xKFBfRxoNLjyl2BL9U2EBr84dGAh32oCpZ8e\r\n" + 
			"X8UrEA+8qMZA5i4T3TenSabBuJoDnnpx3TOgpUVFrCjiueE86YYdvekz3dPoASwF\r\n" + 
			"CyUD7uBrHOuj59sx9zI9y7H35vTxuHxSha8XYwIDAQABAoIBAQC2JRSfGwItwvs1\r\n" + 
			"qTJNJ6oKZwbx+y28XVNbBZ8qo5YemK8+8jRXCQdU0lLj9khgywBzfhnzWApvmk1x\r\n" + 
			"UIYAErnhtT1u960iiwK3x/92o09+aU+JEf8rcXmKRNUSPiBMYj+mz1fT3XQSl5NC\r\n" + 
			"V+Dv6S4NGIv7rLTtnk1ORbg77n2AbzGgXYsDNy9f/NvEX9ukglYvmqgeushQ4Ulg\r\n" + 
			"shyNbcIRyyJLi+O4uX1Wbwu3YjT2k4dtnDQkvplbuEakqynLXaxGfeIFJmh2hDoI\r\n" + 
			"hxsuXgFpEpyWie9xEMUsiufxnVZlZVkXg5f74VPvoVgbtFs6zhsmujm5SGY7ah1y\r\n" + 
			"OEIEXKLBAoGBAO5hH9gr74kgZaS/fU8u72DmeUtCDX+yzGUDi9lnA/+i81cbw3pD\r\n" + 
			"fCEVoVD5RW9oYZCZWWzEmRV6BUbamCU6TZWCrCZszIg1fKoiGNT2IRoRL6wYR4eE\r\n" + 
			"AuGHLIrPsnxptmQ++fe1eGvC0aZEkR59uxrZSU/7KWohfzisNNXLgHcbAoGBAMil\r\n" + 
			"GvvH426R4lATAZLecDN+uB1S3+OSqI0tccwpOO3qjpHzuf3EOmdJFnWE0zL3eMVi\r\n" + 
			"TpDTuH0kwVG9ogmx570+P6EY0u0HA7Q+dtmTOuosmP++1rTWcVUACihx2tFHOXzp\r\n" + 
			"XOT28vhMaUI4cyzN66A9q4Lyvh49Z6XMUxLl8P1ZAoGAP5SYMchGM4T4l2Cbw6r5\r\n" + 
			"Hhda8r/DafP+oFK50lqvrleAIBO/p7SoPwrN5BMYegaVP0QnneMyEZBiJ+vV+Nf8\r\n" + 
			"KYyY7gbG5u2dOqOti9+6JIHA/V3cdkC3o/+x2bRcHuLzSvmhIni8jcGAuaBANKnE\r\n" + 
			"ZfzemP6cpToZ/Luxu/RzZ1ECgYBxWdUEqMgzjvbrhdE9x6xbaxtYdZlGV3QhTasc\r\n" + 
			"S619uyUQD0DjvBfCgefOPFuUT3pLCF6aMwHmsP0F0LvZ/keNAb2wpPWEMpJFIYTD\r\n" + 
			"JgoCgW9uC8IAJ6We/4a9kpSr5jD0AGIad+iLnZ9ZacqnZS3YOP7L25bMPqRvZh8I\r\n" + 
			"bh7XAQKBgHtPz4Dm9e2Ybif4+F0RD8QroFExtoTd9JF9JfkqF9MhPGzjBylQaP26\r\n" + 
			"LRux62iP5Wd8Nz9Zhlt323Rk88Jc35a3y1IKq5bqgO+zzO9XCV5mH/cCcvtJ1R/q\r\n" + 
			"Vn/X7OzbF+0CUbH4rpPUwlDL2/HRYChdkm22dz0kr1ADq+gk4prR\r\n" + 
			"-----END RSA PRIVATE KEY-----";
	public static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\r\n" + 
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAutWemrk+6MPzV1lZwsjZ\r\n" + 
			"A7Te4Ep+GVXCdSErMaWUFSah74/jUQnJNgByliVkeEfOX83LBTd+Jb8kikXwdMal\r\n" + 
			"pClYqZYsf/4ZC6FnxQgWD2OhxUBA3gJcI3H/a1iPQoGklgJVoRvnIE8iCHmP8CRG\r\n" + 
			"7cWJpCK/wcOOxW7qzYaVuGqrFRl9O66g7DQpdcL7ZHjlrRwXaQp0/vG5xKFBfRxo\r\n" + 
			"NLjyl2BL9U2EBr84dGAh32oCpZ8eX8UrEA+8qMZA5i4T3TenSabBuJoDnnpx3TOg\r\n" + 
			"pUVFrCjiueE86YYdvekz3dPoASwFCyUD7uBrHOuj59sx9zI9y7H35vTxuHxSha8X\r\n" + 
			"YwIDAQAB\r\n" + 
			"-----END PUBLIC KEY-----";
}
