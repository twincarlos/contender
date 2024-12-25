export async function GET(req, { params }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return new Response(JSON.stringify({
        1: {
            id: 1,
            name: 'Tournament 1',
            date: '12-24-2024',
            ranking: true,
            status: 'Upcoming'
        },
        2: {
            id: 2,
            name: 'Tournament 2',
            date: '12-24-2024',
            ranking: true,
            status: 'In Progress'
        },
        3: {
            id: 3,
            name: 'Tournament 3',
            date: '12-24-2024',
            ranking: true,
            status: 'Finished'
        },
        4: {
            id: 4,
            name: 'Tournament 4',
            date: '12-24-2024',
            ranking: true,
            status: 'Upcoming'
        }
    }));
};
