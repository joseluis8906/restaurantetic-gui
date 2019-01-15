import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConfigService {

  mediaHost: string = "http://localhost:1337/media";
  images: string = this.mediaHost + "/images";
  videos: string = this.mediaHost + "/videos";

  constructor() { }

  getImages(): string {
    return this.images;
  }

  getVideos(): string {
    return this.videos;
  }
}
