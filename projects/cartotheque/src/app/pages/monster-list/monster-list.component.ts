import { Component, computed, inject, model, signal } from '@angular/core';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { MonsterService } from '../../services/monster.service';
import { Monster } from '../../models/monster.model';

@Component({
  selector: 'mco-monster-list',
  standalone: true,
  imports: [PlayingCardComponent, SearchBarComponent, CommonModule],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.scss'
})
export class MonsterListComponent {
  monsterService = inject(MonsterService);

  monsters = signal<Monster[]>([]);
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters().filter((monster) =>
      monster.name.includes(this.search())
    );
  });

  constructor() {
    this.monsters.set(this.monsterService.getAll());
  }

  addGenericMonster() {
    const monster = new Monster();
    this.monsterService.add(monster);
    this.monsters.set(this.monsterService.getAll());
  }
}
