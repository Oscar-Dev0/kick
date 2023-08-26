import axios, { AxiosInstance } from 'axios';
import { BASE_URL, REFERER } from './const';

/** Clase que representa un cliente REST */
export class RESTClient {
    /** Instancia de Axios para realizar solicitudes HTTP */
    fetcher: AxiosInstance; 
    /** Token de autenticación */
    token: string;

    /**
     * Constructor de la clase RESTClient
     * @param xsrfToken - Token XSRF para la autenticación
     * @param cookie - Valor de la cookie
     */
    constructor(xsrfToken: string, cookie: string) {
        // Crea una instancia de Axios con configuraciones predefinidas
        this.fetcher = axios.create({
            baseURL: BASE_URL,
            headers: {
                "Referer": REFERER,
                "Accept-Encoding": "application/json",
                "Content-Type": "application/json, text/plain, */*",
                "Cookie": cookie,
                "X-XSRF-TOKEN": xsrfToken
            },
            decompress: false
        });

        this.token = ""; 
    }

    /**
     * Método para establecer el token de autenticación
     * @param token - Token de autenticación
     */
    setToken(token: string) {
        this.token = token; 
        this.fetcher.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
    }
};
