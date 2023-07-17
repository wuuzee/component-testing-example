import { Component } from '@angular/core';
import { getHeroes, getHeroesProperties, getProperties } from './components/mocks/test-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public checkboxItems: Map<number, string> = getProperties();
  public radioItems: Map<number, string> = getHeroes();
  public itemsMapping: Map<number, number[]> = getHeroesProperties();
}
