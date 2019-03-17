import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MediaService {

  private host: string = "https://media.restaurantetic.com";
  private headers: HttpHeaders = new HttpHeaders({
    "x-access-key": "lkaj981783jdalsadui1@@!+++*",
  });

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    this.headers.append("Content-Type", "multipart/form-data");
    this.headers.append("Accept", "text/plain");

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
    return this.http.get<string[]>(`${this.host}`);
  }

  remove(filename: string): Observable<string> {
    return this.http.delete<string>(
      `${this.host}/`,
      { responseType: "text" as "json" },
    );
  }
}
