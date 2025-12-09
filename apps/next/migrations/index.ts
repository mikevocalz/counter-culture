import * as migration_20251130_020914_initial from './20251130_020914_initial';
import * as migration_20251130_021653_add_media_access from './20251130_021653_add_media_access';

export const migrations = [
  {
    up: migration_20251130_020914_initial.up,
    down: migration_20251130_020914_initial.down,
    name: '20251130_020914_initial',
  },
  {
    up: migration_20251130_021653_add_media_access.up,
    down: migration_20251130_021653_add_media_access.down,
    name: '20251130_021653_add_media_access'
  },
];
