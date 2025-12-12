export default function trashFilter(videos: any[] | undefined) {
    if (!videos) return [];
    // I didn't want to add a content filter here, feels like 1/4 of all my coding has them.
    // But this one goes out to you Vegas Matt :) Gambling is not gaming.
    // Trailer reactions thrown in for the hell of it.
    return videos.filter((video) => {
        // video has likely been removed, might be other signs besides viewCount to watch for
        if (!video.statistics.viewCount) return false;

        let pass = true;
        const title = video.snippet.title.toLowerCase();
        const channelName = pass && video.snippet.channelTitle.toLowerCase();

        if (title.includes('vegas matt')) {
            pass = false;
        } else if (title.includes('trailer') || title.includes('reveal')) {
            if (title.includes('reaction') || title.includes('reacts') || title.includes('breakdown') || title.includes('break down') || title.includes('things you missed')) {
                pass = false;
            }
        }

        if (channelName.includes('vegas matt')) pass = false;
        return pass;
    });
}
