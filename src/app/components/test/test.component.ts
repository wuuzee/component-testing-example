import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  @Input() checkboxItems: Map<number, string> = new Map<number, string>();
  @Input() radioItems: Map<number, string> = new Map<number, string>();
  @Input() itemsMapping: Map<number, number[]> = new Map<number, number[]>();

  @Output() radioSelected: EventEmitter<[number, string]> = new EventEmitter<[number, string]>();

  public selectedProperties: number[] = [];
  public selectedHero: number | undefined;

  public heroToggle(hero: KeyValue<number, string>) {
    this.selectedHero = hero.key;
    this.selectedProperties = this.itemsMapping.get(this.selectedHero) || [];
  }

  public propertyToggle(property: KeyValue<number, string>) {
    if (this.selectedProperties.includes(property.key)) {
      this.selectedProperties = this.selectedProperties.filter(x => x !== property.key);
    } else {
      this.selectedProperties.push(property.key);
    }

    if (this.selectedProperties.length < 2) {
      this.selectedHero = undefined;
    } else {
      this.itemsMapping.forEach((properties, hero ) => {
        if (this.compare(properties, this.selectedProperties)) {
          this.selectedHero = hero;
        }
      });
    }
  }

  private compare(arr1: number[], arr2: number[]): boolean {
    return arr1.sort().join(',') == arr2.sort().join(',');
  }
}
