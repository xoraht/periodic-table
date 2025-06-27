import { Component } from '@angular/core';
import { PeriodicTable } from './components/periodic-table/periodic-table';

@Component({
  selector: 'app-root',
  imports: [PeriodicTable],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'TABELA';
}