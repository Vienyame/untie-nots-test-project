import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../../../shared';
import {EnvironmentService} from '../../../environment.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  constructor(private http: HttpClient, private environment: EnvironmentService) {
  }

  /**
   * Get all movies
   */
  public getAllMovies() {
    return this.http.get<Movie[]>(this.environment.backendURL.allMovies);
  }
}
