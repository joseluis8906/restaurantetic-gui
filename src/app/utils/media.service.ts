import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "src/app/utils/config.service";

@Injectable({
  providedIn: "root",
})
export class MediaService {

  private host: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.host = "https://media.restaurantetic.com";
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
      `${this.host}/`,
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

    return this.http.get<string[]>(`${this.host}`);
  }

  remove(filename: string): Observable<string> {
    this.headers.set("Content-Type", "application/json");
    this.headers.set("Accept", "text/plain");

    return this.http.delete<string>(
      `${this.host}/${filename}`,
      { responseType: "text" as "json" },
    );
  }
}
