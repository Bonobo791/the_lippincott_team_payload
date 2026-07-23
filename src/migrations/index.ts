import * as migration_20260409_155721_initial from './20260409_155721_initial';
import * as migration_20260723_194427_reskin from './20260723_194427_reskin';

export const migrations = [
  {
    up: migration_20260409_155721_initial.up,
    down: migration_20260409_155721_initial.down,
    name: '20260409_155721_initial',
  },
  {
    up: migration_20260723_194427_reskin.up,
    down: migration_20260723_194427_reskin.down,
    name: '20260723_194427_reskin'
  },
];
