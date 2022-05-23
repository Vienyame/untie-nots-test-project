import {Component, OnInit} from '@angular/core';
import {MoviesService} from './services';
import {Movie} from '../../shared';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  // List of movies
  public movies: Movie[] = [];
  // Allow to display no result message
  public noResult = true;

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.moviesService.getAllMovies()
      .pipe()
      .subscribe((resp: Movie[]) => {
        console.log(resp);
        if (resp.length) {
          this.noResult = false;
          this.movies = resp;
        }

      });
  }

}
