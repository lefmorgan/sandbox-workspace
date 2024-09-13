import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { catchError, from, Observable } from 'rxjs';
import { Boardgames } from '../models/boardgame';
import { GetAll } from '../../../core/custome-types';
import { collectionData, Firestore, collection, addDoc } from '@angular/fire/firestore';



export interface GetAllBoardgames extends GetAll<Boardgames> {
  getAll(): Observable<Boardgames>;
}
@Injectable({
  providedIn: 'root',
  
  useFactory: () =>
    !isDevMode()
      ? new BoardgamesService()
      : new BoardgamesService()
})
export class BoardgamesService implements GetAllBoardgames {
  private readonly httpClient = inject(HttpClient);

	  private readonly apiUrl = 'https://bgg-json.azurewebsites.net/hot';

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des données :', error);
        throw error;
      })
    )
  }


private readonly firestore = inject(Firestore);
testCollection = collection(this.firestore, 'tutu')

getAllT(): Observable<any> {
  return collectionData(this.testCollection, {
    id:'id'
  }) as Observable<any[]>
}

add(text: string): Observable<string> {
  const create = { text, isCompleted: false};
  const promise = addDoc(this.testCollection, create).then(
    (response) => response.id
  );
  return from(promise);
}
}
