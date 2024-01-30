import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse, Unit } from "../models/unit";
import { environment } from "src/environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UnitsService {

  private url = environment.api;

  constructor(private httpClient: HttpClient) { }

  getUnits(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.url);
  }
}