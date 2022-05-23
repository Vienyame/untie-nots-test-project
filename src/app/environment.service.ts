import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  // private property to store all backend URLs
  public backendURL: any;

  constructor(private _http: HttpClient) {
    this.backendURL = {};
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    // @ts-ignore
    Object.keys(environment.backend.endpoints).forEach(k => this.backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

}
