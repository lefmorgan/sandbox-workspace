import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'mco-monster',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PlayingCardComponent,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss',
})
export class MonsterComponent {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private router = inject(Router);
  private readonly dialog = inject(MatDialog);

  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;
  private saveSubscription: Subscription | null = null;
  private deleteSubscription: Subscription | null = null;


  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [
      0,
      [Validators.required, Validators.min(1), Validators.max(200)],
    ],
    attackDescription: ['', [Validators.required]],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterTypes = Object.values(MonsterType);
  monsterId = -1;

  ngOnInit(): void {
    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(
      (data) => {
        this.monster = Object.assign(new Monster(), data);
      }
    );
    this.routeSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.monsterId = parseInt(params['id']);
            return this.monsterService.get(this.monsterId);
          }
          return of(null);
        })
      )
      .subscribe((monster) => {
        if (monster) {
          this.monster = monster;
          this.formGroup.patchValue(this.monster);
        }
      });
  }

  ngOnDestroy(): void {
    this.formValuesSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
    this.saveSubscription?.unsubscribe();
  }

  submit(event: Event) {
    event.preventDefault();
    let saveObservable = null;
    if (this.monsterId === -1) {
      saveObservable = this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      saveObservable = this.monsterService.update(this.monster);
    }
    this.saveSubscription = saveObservable.subscribe(_ => {
      this.navigateBack();
    })
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }

  deleteMonster() {
    const dialogRef = this.dialog.open(
      DeleteMonsterConfirmationDialogComponent
    );
    dialogRef.afterClosed().pipe(
      filter(confirmation => confirmation),
      switchMap(_ => this.monsterService.delete(this.monsterId))
    ).subscribe((confirmation) => {
        this.navigateBack();
    });
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }
}
