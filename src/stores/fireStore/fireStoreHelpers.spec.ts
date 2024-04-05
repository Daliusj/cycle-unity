import { describe, it, expect } from 'vitest';
import {
  filterNullPosts,
  filterHiddenPosts,
  filterPrivatePosts,
  filterSavedPosts,
  filterCreatedPosts,
} from '@/stores/fireStore/fireStoreHelpers';
import {
  mockPostsWithNull,
  mockPosts,
  postsFilteredOutOfNulls,
  postsFilteredForCreatedByUser,
  postsFilteredForSaved,
  postsFilteredOutPrivate,
  postsFilteredOutOfHiddenPosts,
} from './mocks/posts';

describe('Post Filters', () => {
  it('filters out null posts', () => {
    const result = filterNullPosts(mockPostsWithNull);
    expect(result).toEqual(postsFilteredOutOfNulls);
  });

  it('filters out hidden posts', () => {
    const hiddenPosts = ['1'];
    const result = filterHiddenPosts(mockPosts, hiddenPosts);
    expect(result).toEqual(postsFilteredOutOfHiddenPosts);
  });

  it('filters out private posts not authored by the user', () => {
    const userId = 'user1';
    const result = filterPrivatePosts(mockPosts, userId);
    expect(result).toEqual(postsFilteredOutPrivate);
  });

  it('filters for saved posts', () => {
    const savedPosts = ['2'];
    const result = filterSavedPosts(mockPosts, savedPosts);
    expect(result).toEqual(postsFilteredForSaved);
  });

  it('filters for posts created by the user', () => {
    const userId = 'user1';
    const result = filterCreatedPosts(mockPosts, userId);
    expect(result).toEqual(postsFilteredForCreatedByUser);
  });
});
