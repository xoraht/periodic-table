import { Injectable, computed, signal } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.interface';

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Injectable({
  providedIn: 'root'
})
export class PeriodicElementsStore {
  private elements = signal<PeriodicElement[]>([]);
  private filter = signal<string>('');
  private loading = signal<boolean>(false);

  filteredElements = computed(() => {
    const filterValue = this.filter().toLowerCase();
    if (!filterValue) {
      return this.elements();
    }
    return this.elements().filter(element =>
      element.name.toLowerCase().includes(filterValue) ||
      element.symbol.toLowerCase().includes(filterValue) ||
      element.position.toString().includes(filterValue) ||
      element.weight.toString().includes(filterValue)
    );
  });

  readonly loading$ = this.loading.asReadonly();

  loadElements(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.elements.set(ELEMENT_DATA);
      this.loading.set(false);
    }, 1000);
  }

  updateFilter(filter: string): void {
    this.filter.set(filter);
  }

  updateElement(updatedElement: PeriodicElement): void {
    const currentElements = this.elements();
    const updatedElements = currentElements.map(element =>
      element.position === updatedElement.position ? updatedElement : element
    );
    this.elements.set(updatedElements);
  }

  isLoading() {
    return this.loading$();
  }
}
