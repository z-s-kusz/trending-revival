export default function trashFilter(videos: any[] | undefined) {
    if (!videos) return [];
    // I didn't want to add a content filter here, feels like 1/4 of all my coding has them.
    // But this one goes out to you Vegas Matt :) Gambling is not gaming.
    // Trailer reactions thrown in for the hell of it.
    const trash = [
        'vegas matt',
        'trailer breakdown',
        'trailer reaction',
    ];
    return videos.filter((video) => {
        let pass = true;
        trash.forEach((trashContent) => {
            if (video.snippet.title.toLowerCase().includes(trashContent)) pass = false;
            if (pass && video.snippet.channelTitle.toLowerCase().includes(trashContent)) pass = false;
        });
        return pass;
    });
}
