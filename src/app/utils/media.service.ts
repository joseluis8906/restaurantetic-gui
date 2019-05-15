import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "src/app/utils/config.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MediaService {

  private endpoint: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.endpoint = `${environment.MEDIA_HOST}/media`;
    this.headers = new HttpHeaders({
      "x-access-key": "lkaj981783jdalsadui1@@!+++*",
    });
  }

  upload(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    this.headers.set("Content-Type", "multipart/form-data");
    this.headers.set("Accept", "text/plain");

    return this.http.post<string>(
      `${this.endpoint}/`,
      formData,
      {
        responseType: "text" as "json",
        headers: this.headers,
      },
    );
  }

  list(): Observable<string[]> {
    this.headers.set("Content-Type", "application/json");
    this.headers.set("Accept", "application/json");

    return this.http.get<string[]>(`${this.endpoint}`);
  }

  remove(filename: string): Observable<string> {
    this.headers.set("Content-Type", "application/json");
    this.headers.set("Accept", "text/plain");

    return this.http.delete<string>(
      `${this.endpoint}/${filename}`,
      { responseType: "text" as "json" },
    );
  }
}
