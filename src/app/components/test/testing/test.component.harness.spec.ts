import { fakeAsync } from '@angular/core/testing';
import { TestComponent } from '../test.component';
import { getHeroes, getHeroesProperties, getProperties } from '../../mocks/test-data';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestComponentHarness } from './test.component.harness';
import { Component } from '@angular/core';

@Component({ template: '' })
class TestHostComponent {
  public checkboxItems: Map<number, string> | undefined;
  public radioItems: Map<number, string> | undefined;
  public itemsMapping: Map<number, number[]> | undefined;
}

const createHost = createHostFactory({
  component: TestComponent,
  host: TestHostComponent,
  template: `
    <app-test
        [checkboxItems]="checkboxItems"
        [radioItems]="radioItems"
        [itemsMapping]="itemsMapping"
    ></app-test>
  `
});
async function getHarness(spectator: SpectatorHost<TestComponent, TestHostComponent>) {
  const harnessLoader = TestbedHarnessEnvironment.loader(spectator.hostFixture);
  return await harnessLoader.getHarness(TestComponentHarness);
}
describe('[Harness + Spectator] TestComponent', () => {
  let spectator: SpectatorHost<TestComponent, TestHostComponent>;
  let componentHarness: TestComponentHarness;

  beforeEach(() => spectator = createHost(undefined, {
    hostProps: {
      radioItems: getHeroes(),
      checkboxItems: getProperties(),
      itemsMapping: getHeroesProperties()
    }
  }));

  beforeEach(async () => {
    componentHarness = await getHarness(spectator);
  });

  it('должен быть создан', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('названия героев должны соответствовать переданным в инпут', async () => {
    for (let i: number = 0; i < 4; i++) {
      expect(spectator.query('label[for=hero' + i + ']')).toHaveText(getHeroes().get(i) || '');
    }
  });

  it('должен выбраться герой, если выбраны все его свойства',async() => {
    await componentHarness.clickCheckboxes(getHeroesProperties().get(0) || []);
    const hero: HTMLInputElement = spectator.query('input[id=hero0]') as HTMLInputElement;
    expect(hero?.checked).toBeTruthy();
  });

  it('должны выбраться все свойства героя, если он выбран',async() => {
    await componentHarness.clickRadiobutton(0);
    getHeroesProperties().get(0)?.forEach(item => {
      const checkbox = spectator.query('input[id=property' + item + ']') as HTMLInputElement;
      expect(checkbox.checked).toBeTruthy();
    });
  });
});
