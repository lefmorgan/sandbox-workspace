import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Boardgames } from '../models/boardgame';
import { GetAll } from '../../../core/custome-types';

export interface GetAllBoardgames extends GetAll<Boardgames> {
  getAll(): Observable<Boardgames>;
}
@Injectable({
  providedIn: 'root',
  // useValue: fakeInMemoryGetAllVideoGamesService
  // https://api.geekdo.com/api/hotness?geeksite=boardgame&nosession=1&objecttype=thing&showcount=30

  useFactory: () =>
    !isDevMode()
      ? new BoardgamesService()
      : new BoardgamesService()
})
export class BoardgamesService implements GetAllBoardgames {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = '/api/game/2536';

  getAll(): Observable<Boardgames> {
    return this.httpClient.get<Boardgames>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
      })
    )
  }
}
