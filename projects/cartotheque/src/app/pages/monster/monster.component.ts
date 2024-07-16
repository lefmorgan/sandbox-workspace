import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mco-monster',
  standalone: true,
  imports: [],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss',
})
export class MonsterComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  routeSubscription: Subscription | null = null;
  monsterId = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  next() {
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['monster/' + nextId]);
  }
}
