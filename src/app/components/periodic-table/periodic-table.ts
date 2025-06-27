import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { PeriodicElementsStore } from '../../store/periodic-elements.store';
import { PeriodicElement } from '../../models/periodic-element.interface';
import { EditElementDialogComponent } from '../edit-element-dialog/edit-element-dialog';

@Component({
  selector: 'app-periodic-table',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.scss'
})
export class PeriodicTable implements OnInit {
  store = inject(PeriodicElementsStore);
  dialog = inject(MatDialog);
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  filterInput = signal('');
  private filterTimeout: any;

  constructor() {
    // Debounce filter input
    effect(() => {
      const filter = this.filterInput();
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(() => {
        this.store.updateFilter(filter);
      }, 2000);
    });
  }

  ngOnInit(): void {
    this.store.loadElements();
  }

  onFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filterInput.set(target.value);
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.updateElement(result);
      }
    });
  }
}
