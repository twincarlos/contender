export async function GET(req, { params }) {
    const { id } = await params;

    return new Response(
        JSON.stringify({}),
    );
};