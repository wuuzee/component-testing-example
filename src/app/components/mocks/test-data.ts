export function getProperties(): Map<number, string> {
  const properties: Map<number, string> = new Map<number, string>();
  properties.set(0, 'сирота');
  properties.set(1, 'носит черное');
  properties.set(2, 'супер-сила');

  return properties;
}

export function getHeroes(): Map<number, string> {
  const heroes: Map<number, string> = new Map<number, string>();
  heroes.set(0, 'Бэтмен');
  heroes.set(1, 'Гарри Поттер');
  heroes.set(2, 'Блэйд');
  heroes.set(3, 'Дарт Вейдер');

  return heroes;
}

export function getHeroesProperties(): Map<number, number[]> {
  const data: Map<number, number[]> = new Map<number, number[]>();
  data.set(0, [0, 1]);
  data.set(1, [0, 2]);
  data.set(2, [1, 2]);
  data.set(3, [0, 1, 2]);

  return data;
}

