import Dexie from 'dexie';

const db = new Dexie('Lagune');

db.version(1).stores({
  credential: '&url, token',
});

export default db;
