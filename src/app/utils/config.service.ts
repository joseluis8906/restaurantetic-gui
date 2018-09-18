import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  mediaHost: String = 'http://localhost:1337/media';
  images: String = this.mediaHost + '/images';
  videos: String = this.mediaHost + '/videos';

  constructor() { }

  getImages (): String {
    return this.images;
  }

  getVideos (): String {
    return this.videos;
  }
}
