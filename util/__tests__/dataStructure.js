import { expect, test } from '@jest/globals';

const videosWithComments = [
  {
    videoId: 1,
    title: 'Volley',
    tags: ['backhand', 'volley'],
    firstName: 'Oriol',
    lastName: 'Gallach',
    comments: [{ commentUser: 'Come on' }, { commentUser: 'let goo' }],
    profilePictureUrl: 'acps1mwix4ni42movpnd',
  },
  {
    videoId: 4,
    title: 'Serve and volley',
    tags: ['serve', 'foot-work'],
    firstName: 'Albert',
    lastName: 'Freixa',
    comments: [{ commentUser: 'Come on' }],
    profilePictureUrl: 'g4dvhy6zcgflcagopepq',
  },
];

function sortVideosByComments(videosWithComments) {
  // Create a shallow copy to avoid mutating the original array
  return (
    videosWithComments
      .slice()
      // Sort by comment length in descending order
      .sort((a, b) => b.comments.length - a.comments.length)
  );
}

test('Sort videos by the number of comments in descending order', () => {
  const sortedVideos = sortVideosByComments(videosWithComments);

  // Check if the sorted array has the correct order
  expect(sortedVideos).toEqual([
    {
      videoId: 1,
      title: 'Volley',
      tags: ['backhand', 'volley'],
      firstName: 'Oriol',
      lastName: 'Gallach',
      comments: [{ commentUser: 'Come on' }, { commentUser: 'let goo' }],
      profilePictureUrl: 'acps1mwix4ni42movpnd',
    },
    {
      videoId: 4,
      title: 'Serve and volley',
      tags: ['serve', 'foot-work'],
      firstName: 'Albert',
      lastName: 'Freixa',
      comments: [{ commentUser: 'Come on' }],
      profilePictureUrl: 'g4dvhy6zcgflcagopepq',
    },
  ]);
});
