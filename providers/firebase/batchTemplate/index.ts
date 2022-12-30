import { writeBatch, doc } from 'firebase/firestore';

/**
 *
 * Docs https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
 * @param db
 */

const batchTemplate = async (db: any) => {
  // Get a new write batch
  const batch = writeBatch(db);

  // Set the value of 'NYC'
  const nycRef = doc(db, 'cities', 'NYC');
  batch.set(nycRef, { name: 'New York City' });

  // Update the population of 'SF'
  const sfRef = doc(db, 'cities', 'SF');
  batch.update(sfRef, { population: 1000000 });

  // Delete the city 'LA'
  const laRef = doc(db, 'cities', 'LA');
  batch.delete(laRef);

  // Commit the batch
  await batch.commit();
};

// batchTemplate();
