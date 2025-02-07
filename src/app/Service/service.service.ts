import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Convocatoria } from '../Modelo/Convocatoria';
import { Observable } from 'rxjs';
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

  urlListarConvocatorias = 'http://localhost:8080/convocatorias';

  urlFindConvocatoriaById = 'http://localhost:8080/convocatorias';

  urlFiltrarConvocatorias = 'http://localhost:8080/convocatorias';

  urlListarTiposConvocatoria = 'http://localhost:8080/tiposConvocatoria/listar';

  urlListarSubtiposConvocatoria = 'http://localhost:8080/subtiposConvocatoria/findPorTipoConv';
  
  urlListarEstadosConvocatoria = 'http://localhost:8080/estadosConvocatoria/listar';

  urlListarUnidadesAdministrativas = 'http://localhost:8080/unidadesAdministrativas/listar';

  getConvocatorias() : Observable<Convocatoria[]> {
    console.log("getConvocatorias");

    let obs = this.http.get<Convocatoria[]>(this.urlListarConvocatorias);

    obs.forEach(conv => console.log(conv));

    // return this.http.get<Convocatoria[]>(this.urlListarConvocatorias);
    return obs;
  }

  getConvocatoria(conIde : number) {
    const params = new HttpParams().append('conIde', conIde);
    return this.http.get<Convocatoria>(this.urlFindConvocatoriaById, { params });
  }

  getTiposConvocatoria() : Observable<TipoConvocatoria[]> {
    let tiposConvocatoria : Observable<TipoConvocatoria[]>;
    tiposConvocatoria = this.http.get<TipoConvocatoria[]>(this.urlListarTiposConvocatoria);
    tiposConvocatoria.forEach(tipoConvocatoria => console.log(tipoConvocatoria));
    return tiposConvocatoria;
    // return this.http.get<TipoConvocatoria[]>(this.urlListarTiposConvocatoria);
  }

  getSubtiposConvocatoria(tcoIde : string) : Observable<SubtipoConvocatoria[]> {
    // let tipoConva = tipoConv;
    return this.http.post<SubtipoConvocatoria[]>(this.urlListarSubtiposConvocatoria, {tcoIde});
  }

  // getConvocatoriasByCriteria(filtro : Map<string, object>) : Observable<Convocatoria[]>{
  getConvocatoriasByCriteria(filtro : FiltrosBuscador) : Observable<Convocatoria[]>{
    console.log("getConvocatoriasByCriteria");
    // getConvoiltrarConvocatorias, { filtro });
    let filtroBuscadorToString = this.filtroBuscadorToString(filtro);
    // console.log(filtroBuscadorToString);

    return this.http.post<Convocatoria[]>(this.urlFiltrarConvocatorias, { filtroBuscadorToString });
  }

  getEstadosConvocatoria() : Observable<EstadoConvocatoria[]> {
    return this.http.get<EstadoConvocatoria[]>(this.urlListarEstadosConvocatoria);
  }

  getUnidadesAdministrativas() : Observable<UnidadAdministrativa[]> {
    return this.http.get<UnidadAdministrativa[]>(this.urlListarUnidadesAdministrativas);
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
