export const prerender = false;
import type { APIRoute } from "astro";
import { youtube } from '@googleapis/youtube';

const getTrendingVideos = async (regionCode: string) => {
    const youtubeClass = youtube({
        version: 'v3',
        auth: import.meta.env.GOOGLE_API_KEY,
    });

    try {
        const response = await youtubeClass.videos.list({
            part: ['snippet', 'statistics'],
            chart: 'mostPopular',
            regionCode,
            maxResults: 50, // may need to tune down if we hit api limits
        });

        return response.data.items;
    } catch (error) {
        console.error('Error fetching trending videos:', error);
    }
};

export const GET:APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const region = url.searchParams.get('region') || 'US';

    try {
        const videos = await getTrendingVideos(region);

        return Response.json(JSON.stringify({ videos }));
    } catch (err) {
        console.error('500 error in get', err);
        return new Response(null, {
            status: 500,
        });
    }
}
