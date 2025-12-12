import { expect, test } from 'vitest';
import trashFilter from '../src/utils/trash-filter';

test('good videos pass the filter', () => {
    const passingVideos = [
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'Trip to Vegas',
                channelTitle: 'TravelVlog',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'React Tutorial - Part 800',
                channelTitle: 'Code Stuff Made Here',
            },
        },
    ];
    const filteredVideos = trashFilter(passingVideos);

    expect(filteredVideos.length).toBe(passingVideos.length);
});

test('videos with no views are filtered', () => {
    const failingVideos = [
        {
            statistics: { },
            snippet: {
                title: '',
                channelTitle: '',
            },
        },
        {
            statistics: { viewCount: 0 },
            snippet: {
                title: '',
                channelTitle: '',
            },
        },
    ];
    const filteredVideos = trashFilter(failingVideos);

    expect(filteredVideos.length).toBe(0);
});

test('vagas matt vids or mentions are filtered', () => {
    const failingVideos = [
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'Vegas Matt Gambles!!!!!!',
                channelTitle: 'VGs Friends',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'VegaS MATT!',
                channelTitle: 'VGs Friends',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: ':)',
                channelTitle: 'Vegas Matt',
            },
        },
    ];
    const filteredVideos = trashFilter(failingVideos);

    expect(filteredVideos.length).toBe(0);
});

test('trailer reactions are filtered', () => {
    const failingVideos = [
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'pokemon 34 trailer reaction!!!!',
                channelTitle: '',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'zomg pokemon trailer out now, mike reacts',
                channelTitle: '',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'pokemon trailer, 10 things you missed!!!!',
                channelTitle: '',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'we break down the details of the new pokemon trailer',
                channelTitle: '',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'trailer breakdown',
                channelTitle: '',
            },
        },
    ];
    const passingVideos = [
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'Dave reacts to real news',
                channelTitle: '',
            },
        },
    ];
    const allVideos = failingVideos.concat(passingVideos);
    const filteredVideos = trashFilter(allVideos);

    expect(filteredVideos.length).toBe(passingVideos.length);
});

test('reveal reactions are filtered', () => {
    const failingVideos = [
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'MCUs 10 big reveals, bob reacts',
                channelTitle: '',
            },
        },
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'MCUs next movie revealed, 101 things you missed!',
                channelTitle: '',
            },
        },
    ];
    const passingVideos = [
        {
            statistics: { viewCount: 1000 },
            snippet: {
                title: 'magic secrets revealed',
                channelTitle: '',
            },
        },
    ];
    const allVideos = failingVideos.concat(passingVideos);
    const filteredVideos = trashFilter(allVideos);

    expect(filteredVideos.length).toBe(passingVideos.length);
});
