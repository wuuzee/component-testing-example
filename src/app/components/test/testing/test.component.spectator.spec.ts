import { fakeAsync } from '@angular/core/testing';
import { TestComponent } from '../test.component';
import { getHeroes, getHeroesProperties, getProperties } from '../../mocks/test-data';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('[Spectator] TestComponent', () => {
  let spectator: Spectator<TestComponent>;
  const createComponent = createComponentFactory(TestComponent);

  beforeEach(() => spectator = createComponent({
      props: {
        radioItems: getHeroes(),
        checkboxItems: getProperties(),
        itemsMapping: getHeroesProperties()
      }
  }));

  it('должен быть создан', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('названия героев должны соответствовать переданным в инпут', () => {
    for (let i: number = 0; i < 4; i++) {
      expect(spectator.query('label[for=hero' + i + ']')).toHaveText(getHeroes().get(i) || '');
    }
  });

  it('должен выбраться герой, если выбраны все его свойства', fakeAsync(async() => {
    getHeroesProperties().get(0)?.forEach(item => {
      const checkbox = spectator.query('input[id=property' + item + ']') as HTMLInputElement;
      checkbox?.click();
    });
    spectator.tick(10);
    const hero: HTMLInputElement = spectator.query('input[id=hero0]') as HTMLInputElement;
    expect(hero?.checked).toBeTruthy();
  }));

  it('должны выбраться все свойства героя, если он выбран', fakeAsync(async() => {
    const hero: HTMLInputElement = spectator.query('input[id=hero0]') as HTMLInputElement;
    hero?.click();
    spectator.tick(10);
    getHeroesProperties().get(0)?.forEach(item => {
      const checkbox = spectator.query('input[id=property' + item + ']') as HTMLInputElement;
      expect(checkbox.checked).toBeTruthy();
    });
  }));
});
