import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../Modelo/Usuario";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
   providedIn: 'root'
 })
 export class UsuarioService {
 
   constructor(private http:HttpClient) { }

   private urlFindUsuarioById = 'http://localhost:8080/usuarios/findById';

   getUsuario(usuario : string) : Observable<Usuario>{
      console.log("getUsuario: "+ usuario);
      const params = new HttpParams().append('usuario', usuario);
      return this.http.get<Usuario>(this.urlFindUsuarioById, { params });
    }
 }