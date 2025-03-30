import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Convocatoria } from '../Modelo/Convocatoria';
import { map, Observable } from 'rxjs';
import { TipoConvocatoria } from '../Modelo/TipoConvocatoria';
import { FiltrosBuscador } from '../Modelo/FiltrosBuscador';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import { EstadoConvocatoria } from '../Modelo/EstadoConvocatoria';
import { OpcionPublicable } from '../Modelo/OpcionesPublicable';
import { UnidadAdministrativa } from '../Modelo/UnidadAdministrativa';
import { SubtipoConvocatoria } from '../Modelo/SubtipoConvocatoria';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  urlConvocatorias = 'http://localhost:8080/convocatorias';

  urlFindConvocatoriaById = 'http://localhost:8080/convocatorias';

  urlFiltrarConvocatorias = 'http://localhost:8080/convocatorias';

  urlTiposConvocatoria = 'http://localhost:8080/tiposConvocatoria';

  urlSubtiposConvocatoria = 'http://localhost:8080/subtiposConvocatoria/findPorTipoConv';
  
  urlEstadosConvocatoria = 'http://localhost:8080/estadosConvocatoria';

  urlUnidadesAdministrativas = 'http://localhost:8080/unidadesAdministrativas';

  getConvocatorias() : Observable<Convocatoria[]> {
    console.log("getConvocatorias");

    let obs = this.http.get<Convocatoria[]>(this.urlConvocatorias);

    obs.forEach(conv => console.log(conv));

    // return this.http.get<Convocatoria[]>(this.urlConvocatorias);
    return obs;
  }

  getConvocatoria(conIde : number) {
    const params = new HttpParams().append('conIde', conIde);
    return this.http.get<Convocatoria>(this.urlFindConvocatoriaById, { params });
  }

  getTiposConvocatoria() : Observable<TipoConvocatoria[]> {
    return this.http.get<any[]>(this.urlTiposConvocatoria).pipe(
      map(data => 
        data.map(item => ({
          valor: item.tcoIde,
          nombre: item.tcoDes
        }))
      )
    );
  }

  getSubtiposConvocatoria(tcoIde : string) : Observable<SubtipoConvocatoria[]> {
    return this.http.post<SubtipoConvocatoria[]>(this.urlSubtiposConvocatoria, {tcoIde});
  }

  getConvocatoriasByCriteria(filtro : FiltrosBuscador) : Observable<Convocatoria[]>{
    let filtroBuscadorToString = this.filtroBuscadorToString(filtro);

    return this.http.post<Convocatoria[]>(this.urlFiltrarConvocatorias, { filtroBuscadorToString });
  }

  getEstadosConvocatoria() : Observable<EstadoConvocatoria[]> {
    return this.http.get<EstadoConvocatoria[]>(this.urlEstadosConvocatoria);
  }

  getUnidadesAdministrativas() : Observable<UnidadAdministrativa[]> {
    return this.http.get<UnidadAdministrativa[]>(this.urlUnidadesAdministrativas);
  }

  filtroBuscadorToString(filtro : FiltrosBuscador) : string {
    let result : string = "";

    result += (filtro.anyoExpediente ? "expAnyo:" + filtro.anyoExpediente as string + ";": '') + 
              (filtro.tipoExpediente ? "expTipo:" + filtro.tipoExpediente as string + ";": '') + 
              (filtro.numeroExpediente ? "expNumero:" + filtro.numeroExpediente as string + ";": '') + 
              (filtro.unidadAdministrativa ? "expUnidadAdministrativa:" + filtro.unidadAdministrativa as string + ";": '') + 
              (filtro.tituloConvocatoria ? "conTitulo:" + filtro.tituloConvocatoria as string + ";": '') + 
              (filtro.tipoConvocatoria ? "conTipo:" + filtro.tipoConvocatoria as string + ";": '') + 
              (filtro.subtipoConvocatoria ? "conSubtipo:" + filtro.subtipoConvocatoria as string + ";": '') + 
              (filtro.estadoConvocatoria ? "conEstado:" + filtro.estadoConvocatoria as string + ";": '') + 
              (filtro.publicable ? "conPublicable:" + filtro.publicable as string + ";": '') + 
              (filtro.idConvocatoria ? "conIde:" + filtro.idConvocatoria as string + ";": '') +
              (filtro.idConvocatoriaBDNS ? "conIdeBdns:" + filtro.idConvocatoriaBDNS as string + ";": '') +
              (filtro.fechaCreacionDesde ? "conFechaCreacionDesde:" + this.dateToString(filtro.fechaCreacionDesde) + ";": '') +
              (filtro.fechaCreacionHasta ? "conFechaCreacionHasta:" + this.dateToString(filtro.fechaCreacionHasta) + ";": '') +
              (filtro.fechaModificacionDesde ? "conFechaModificacionDesde:" + this.dateToString(filtro.fechaModificacionDesde) + ";": '') +
              (filtro.fechaModificacionHasta ? "conFechaModificacionHasta:" + this.dateToString(filtro.fechaModificacionHasta) + ";": '')
              ;
    
    result = result.slice(0, result.length-1);

    console.log(result);

    return result;
  }

  dateToString(date : Date | undefined) : string {
    if (date) {
      let fecha = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
      console.log(fecha);
      // return date.getDay + "-" + date.getMonth + "-" + date.getFullYear;
      return fecha;
    }

      return "";
  }
}
