import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ModuleType} from "../types/module.type";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  constructor(
   private http: HttpClient,
) {}

  moduleData: any


  getModules(): Observable<ModuleType[]> {
    this.moduleData = this.http.get<ModuleType[]>("http://localhost:8080/modules/getAll")
      .pipe(
        map((response) => response) // Extrai o corpo da resposta
      );
    return this.moduleData;
  }


  getChilds(id: number): Observable<ModuleType[]> {
    this.moduleData = this.http.get<ModuleType[]>("http://localhost:8080/modules/getChildren" + "?id=" + id)
      .pipe(
        map((response) => response) // Extrai o corpo da resposta
      );
    return this.moduleData;
  }

  getByParentId(id: number): Observable<number> {
    this.moduleData = this.http.get<number>("http://localhost:8080/modules/getByParentId" + "?parentId=" + id)
      .pipe(
        map((response) => response)

    );
    return this.moduleData;
  }
}
