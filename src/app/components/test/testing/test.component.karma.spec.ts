import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponent } from '../test.component';
import { getHeroes, getHeroesProperties, getProperties } from '../../mocks/test-data';
import { By } from '@angular/platform-browser';

describe('[Karma] TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    component.checkboxItems = getProperties();
    component.radioItems = getHeroes();
    component.itemsMapping = getHeroesProperties();

    fixture.detectChanges();
  });

  it('должен быть создан', () => {
    expect(component).toBeTruthy();
  });

  it('названия героев должны соответствовать переданным в инпут', () => {
    for (let i: number = 0; i < 4; i++) {
      const label = fixture.debugElement.query(By.css('label[for=hero' + i + ']'));
      expect(label.nativeElement.textContent).toBe(getHeroes().get(i));
    }
  });

  it('должен выбраться герой, если выбраны все его свойства', (done) => {
    getHeroesProperties().get(0)?.forEach(item => {
      const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[id=property' + item + ']');
      let event = new MouseEvent('click');
      checkbox.dispatchEvent(event);
      fixture.detectChanges();
    });

    fixture.whenStable().then(() => {
      const hero: HTMLInputElement = fixture.nativeElement.querySelector('input[id=hero0]');
      expect(hero.checked).toBeTruthy();
      done();
    });
  });

  it('должны выбраться все свойства героя, если он выбран', (done) => {
    const hero: HTMLInputElement = fixture.nativeElement.querySelector('input[id=hero0]');
    let event = new MouseEvent('click');
    hero.dispatchEvent(event);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      getHeroesProperties().get(0)?.forEach(item => {
        const checkbox: HTMLInputElement = fixture.nativeElement.querySelector('input[id=property' + item + ']');
        expect(checkbox.checked).toBeTruthy();
      });
      done();
    });
  });
});
