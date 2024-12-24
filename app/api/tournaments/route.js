export async function GET(req, { params }) {
    return new Response(JSON.stringify({
        1: {
            id: 1,
            name: 'Tournament 1',
            date: '12-24-2024',
            leaderboard: true,
            status: 'Upcoming'
        },
        2: {
            id: 2,
            name: 'Tournament 2',
            date: '12-24-2024',
            leaderboard: true,
            status: 'Upcoming'
        },
        3: {
            id: 3,
            name: 'Tournament 3',
            date: '12-24-2024',
            leaderboard: true,
            status: 'Upcoming'
        },
        4: {
            id: 4,
            name: 'Tournament 4',
            date: '12-24-2024',
            leaderboard: true,
            status: 'Upcoming'
        }
    }));
};