import { inject, Injectable } from '@angular/core';
import { Monster } from '../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IMonster } from '../interfaces/monster.interface';


@Injectable({
  providedIn: 'root',
})
export class MonsterService {

	private BASE_URL = 'http://localhost:8000/monsters/';
	private http = inject(HttpClient);

	getAll(): Observable<Monster[]> {
		return this.http.get<IMonster[]>(this.BASE_URL).pipe(
			map(monsterJsonArray => {
				return monsterJsonArray.map<Monster>(
					monsterJson => Monster.fromJson(monsterJson)
				)
			})
		);
	}

	get(id: number): Observable<Monster> {
		return this.http.get<IMonster>(this.BASE_URL + id + '/').pipe(
			map(monsterJson => Monster.fromJson(monsterJson))
		);
	}

	add(monster: Monster): Observable<Monster> {
		return this.http.post<IMonster>(this.BASE_URL, monster.toJson()).pipe(
			map(monsterJson => Monster.fromJson(monsterJson))
		);
	}

	update(monster: Monster): Observable<Monster> {
		return this.http.put<IMonster>(this.BASE_URL + monster.id + '/', monster.toJson()).pipe(
			map(monsterJson => Monster.fromJson(monsterJson))
		);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(this.BASE_URL + id + '/');
	}


  // monsters: Monster[] = [];
  // currentId: number = 1;

  // constructor() {
  //   this.load();
  // }

  // private save() {
  //   localStorage.setItem('monsters', JSON.stringify(this.monsters));
  // }

  // private load() {
  //   const monstersData = localStorage.getItem('monsters');
  //   if (monstersData) {
  //     this.monsters = JSON.parse(monstersData).map((monsterJson: any) =>
  //       Object.assign(new Monster(), monsterJson)
  //     );
  //     this.currentId =
  //       Math.max(...this.monsters.map((monster) => monster.id)) + 1;
  //   } else {
  //     this.init();
  //     this.save();
  //   }
  // }

  // private init() {
  //   this.monsters = [];

  //   const monster1 = new Monster();
  //   monster1.id = this.currentId++;
  //   monster1.name = 'Pik';
  //   monster1.hp = 40;
  //   monster1.figureCaption = 'N°001 Pik';
  //   this.monsters.push(monster1);

  //   const monster2 = new Monster();
  //   monster2.id = this.currentId++;
  //   monster2.name = 'Cara';
  //   monster2.image = 'assets/img/pokemon/cara.png';
  //   monster2.type = MonsterType.WATER;
  //   monster2.hp = 60;
  //   monster2.figureCaption = 'N°002 Cara';
  //   this.monsters.push(monster2);

  //   const monster3 = new Monster();
  //   monster3.id = this.currentId++;
  //   monster3.name = 'Bulb';
  //   monster3.image = 'assets/img/pokemon/bulby.png';
  //   monster3.type = MonsterType.PLANT;
  //   monster3.hp = 60;
  //   monster3.figureCaption = 'N°003 Bulb';
  //   this.monsters.push(monster3);

  //   const monster4 = new Monster();
  //   monster4.id = this.currentId++;
  //   monster4.name = 'Sala';
  //   monster4.image = 'assets/img/pokemon/sala.png';
  //   monster4.type = MonsterType.FIRE;
  //   monster4.hp = 60;
  //   monster4.figureCaption = 'N°004 Sala';
  //   this.monsters.push(monster4);
  // }

  // getAll() {
  //   return this.monsters.map((monster) => monster.copy());
  // }

  // get(id: number): Monster | undefined {
  //   const monster = this.monsters.find((monster) => monster.id === id);
  //   return monster ? monster.copy() : undefined;
  // }

  // add(monster: Monster): Monster {
  //   const monsterCopy = monster.copy();

  //   monsterCopy.id = this.currentId;
  //   this.monsters.push(monsterCopy.copy());
  //   this.currentId++;
	// this.save();
	
	// return monsterCopy;
  // }

  // update(monster: Monster): Monster {
  //   const monsterCopy = monster.copy();

  //   const monsterIndex = this.monsters.findIndex(
  //     (monster) => monster.id === monsterCopy.id
  //   );
  //   if (monsterIndex !== -1) {
  //     this.monsters[monsterIndex] = monsterCopy.copy();
	//   this.save();
  //   }

  //   return monsterCopy;
  // }

  // delete(id: number) {
  //   const monsterIndex = this.monsters.findIndex(
  //     (monster) => monster.id === id
  //   );
  //   if (monsterIndex !== -1) {
  //     this.monsters.splice(monsterIndex, 1);
	//   this.save();
  //   }
  // }
}
