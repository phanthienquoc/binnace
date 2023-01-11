import { writeBatch, doc } from 'firebase/firestore';

/**
 *
 * Docs https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
 * @param database
 */

const batchTemplate = async (database: any) => {
  // Get a new write batch
  const batch = writeBatch(database);

  // Set the value of 'NYC'
  const nycRef = doc(database, 'cities', 'NYC');
  batch.set(nycRef, { name: 'New York City' });

  // Update the population of 'SF'
  const sfRef = doc(database, 'cities', 'SF');
  batch.update(sfRef, { population: 1000000 });

  // Delete the city 'LA'
  const laRef = doc(database, 'cities', 'LA');
  batch.delete(laRef);

  // Commit the batch
  await batch.commit();
};

// batchTemplate();
