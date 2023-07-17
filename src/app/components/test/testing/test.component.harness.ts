import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class TestComponentHarness extends ComponentHarness {
  static hostSelector = 'app-test';

  /** Имитирует клик по ряду чекбоксов*/
  public async clickCheckboxes(keys: number[]): Promise<void> {
    for (const key of keys) {
      await this.getCheckboxAndClick(key);
    }
  }

  /** Имитирует клик по радиобаттону*/
  public async clickRadiobutton(key: number): Promise<void> {
    const radiobutton: TestElement = await this.locatorFor('input[id=hero' + key + ']')();
    return await radiobutton.click();
  }

  private async getCheckboxAndClick(key: number): Promise<void> {
    const checkbox: TestElement = await this.locatorFor('input[id=property' + key + ']')();
    await checkbox.click();
  }
}
