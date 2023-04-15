import { Component } from '@angular/core';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {}

// export class MovieSelector {
// 	private readonly _movies: Movie[] = [
// 		{ title: 'Fight Club', year: 1999, genre: ['drama', 'criminal', 'thriller'], rating: 8.7 },
// 		{ title: 'Pulp Fiction', year: 1994, genre: ['criminal', 'criminal'], rating: 8.6 },
// 		{ title: 'The Shawshank Redemption', year: 1994, genre: ['drama'], rating: 9.1 },
// 		{ title: 'The Mask', year: 1994, genre: ['fantasy', 'drama', 'comedy'], rating: 8.7 },
// 		{ title: "Knockin' on Heaven's Door", year: 1994, genre: ['drama', 'criminal', 'comedy'], rating: 8.6 }
// 	];
//
// 	constructor() {
// 		of(this._movies).pipe(
// 			filter((movies: Movie[]) => movies.length >= 4),
// 			map((movies: Movie[]) => this._sortMovies(movies).slice(0, 4)),
// 			map((movies: Movie[]) => this._getDrama(movies)),
// 			map((movies: Movie[]) => this._getShort(movies)),
// 			map((movies: Movie[]) => (movies.length > 0 ? `${movies[0].title}, this is my choice` : `Nothing not found`)),
// 			tap(console.log)
// 		);
// 	}
//
// 	private sortMovies(movies: Movie[]): Movie[] {
// 		return movies.sort((a: Movie, b: movie) => (b.rating === a.rating ? b.year - a.year : b.rating - a.rating));
// 	}
//
// 	private getDrama(movies: Movie[]): Movie[] {
// 		return movies.filter((movie: Movie) => movie.genre.includes('drama'));
// 	}
//
// 	private _getShort(movies: Movie[]): Movie[] {
// 		return movies.filter((movie: Movie) => movie.title.split(' ').length < 3);
// 	}
// }
