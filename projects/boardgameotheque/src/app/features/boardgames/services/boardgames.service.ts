import { HttpClient } from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { catchError, from, Observable } from 'rxjs';
import { Boardgame, Boardgames } from '../models/boardgame';
import { GetAll } from '../../../core/custome-types';
import {
  collectionData,
  Firestore,
  collection,
  addDoc,
  DocumentReference,
  DocumentData,
  orderBy,
  query,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { APP_CONST } from '../../../core/constantes';

export interface GetAllBoardgames extends GetAll<Boardgames> {
  getAll(): Observable<Boardgames>;
}
@Injectable({
  providedIn: 'root',

  useFactory: () =>
    !isDevMode() ? new BoardgamesService() : new BoardgamesService(),
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
    );
  }

  private readonly _firestore = inject(Firestore);
  private readonly _boargameCollection = collection(
    this._firestore,
    APP_CONST.COLLECTION_NAME
  );

  newBoardgame(
    boardgame: Partial<Boardgame>
  ): Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._boargameCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...boardgame,
    });
  }

  getAllBoardGames(): Observable<Boardgames> {
    const queryFn = query(this._boargameCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, { idField: 'id' }) as Observable<Boardgames>;
  }

  async getBoardGameById(id: string): Promise<Boardgame> {
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Boardgame;
  }

  updateBoardGame(id: string, updatedBoardgame: Boardgame): void {
    const docRef = this._getDocRef(id);
    updateDoc(docRef, { ...updatedBoardgame });
  }

  updateItem(id: string, updatedBoardgame: Boardgame): Observable<void> {
    const docRef = this._getDocRef(id);
    return from(updateDoc(docRef, { ...updatedBoardgame }));
  }

  deleteBoardGame(id: string): void {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  deleteItem(id: string): Observable<void> {
    const docRef = this._getDocRef(id);
    return from(deleteDoc(docRef));  
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONST.COLLECTION_NAME, id);
  }
}
