import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
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

interface PeriodicElementsState {
  elements: PeriodicElement[];
  filter: string;
  loading: boolean;
}

const initialState: PeriodicElementsState = {
  elements: [],
  filter: '',
  loading: false
};

export const PeriodicElementsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ elements, filter }) => ({
    filteredElements: computed(() => {
      const filterValue = filter().toLowerCase();
      if (!filterValue) {
        return elements();
      }
      return elements().filter(element =>
        element.name.toLowerCase().includes(filterValue) ||
        element.symbol.toLowerCase().includes(filterValue) ||
        element.position.toString().includes(filterValue) ||
        element.weight.toString().includes(filterValue)
      );
    })
  })),
  withMethods((store) => ({
    loadElements(): void {
      patchState(store, { loading: true });
      setTimeout(() => {
        patchState(store, { elements: ELEMENT_DATA, loading: false });
      }, 1000);
    },
    
    updateFilter(filter: string): void {
      patchState(store, { filter });
    },
    
    updateElement(updatedElement: PeriodicElement): void {
      const currentElements = store.elements();
      const updatedElements = currentElements.map(element =>
        element.position === updatedElement.position ? updatedElement : element
      );
      patchState(store, { elements: updatedElements });
    },
    
    isLoading(): boolean {
      return store.loading();
    }
  }))
);
