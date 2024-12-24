import { Suspense, use } from 'react';
import Tournament from '../Tournament/Tournament';
import { getTournaments } from '../../actions/tournaments';

export default function Tournaments() {
  const tournamentsPromise = getTournaments();
  const tournaments = use(tournamentsPromise);
  return (
    <Suspense fallback={<p>loading...</p>}>
      {Object.values(tournaments).map(tournament => <Tournament tournament={tournament} />)}
    </Suspense>
  );
};