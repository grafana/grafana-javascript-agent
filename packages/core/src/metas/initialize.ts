import type { Config } from '../config';
import type { Metas, MetasMap } from './types';

export function initializeMetas(config: Config): Metas {
  const map: MetasMap = new Map();

  const add: Metas['add'] = (key, getter) => {
    if (!map.has(key)) {
      map.set(key, getter);
    }
  };

  const remove: Metas['remove'] = (key) => {
    map.delete(key);
  };

  add('sdk', () => ({
    name: '@grafana/javascript-agent-core',
    version: '0.0.1', // TODO: set correct version here
  }));

  config.metas.forEach((meta) => {
    Object.entries(meta()).forEach(([key, getter]) => {
      add(key, getter);
    });
  });

  return {
    add,
    map,
    remove,
    get value() {
      return Object.fromEntries(Array.from(map.entries()).map(([key, valueGetter]) => [key, valueGetter()]));
    },
  };
}