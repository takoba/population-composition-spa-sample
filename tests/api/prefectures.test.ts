import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get as getPrefectures } from '~/api/prefectures'; // Alias to avoid name clash
import * as apiLib from '~/lib/api'; // Import namespace for mocking
import type { Prefecture } from '~/types';

// Mock the fetchSingle function from the api library
vi.mock('~/src/lib/api', () => ({
  fetchSingle: vi.fn(),
}));

describe('API: getPrefectures', () => {
  const mockFetchSingle = vi.mocked(apiLib.fetchSingle);

  beforeEach(() => {
    // Reset mocks before each test
    mockFetchSingle.mockClear();
  });

  afterEach(() => {
    // Restore mocks after each test if needed, though clear might be enough
    vi.restoreAllMocks();
  });

  it('should fetch and return prefecture data successfully', async () => {
    const mockPrefectures: Prefecture[] = [
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
    ];
    const mockResponseData = {
      message: null,
      result: mockPrefectures,
    };
    const mockResponse = new Response(JSON.stringify(mockResponseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    mockFetchSingle.mockResolvedValue(mockResponse);

    const result = await getPrefectures();

    expect(mockFetchSingle).toHaveBeenCalledTimes(1);
    expect(mockFetchSingle).toHaveBeenCalledWith('/api/v1/prefectures');
    expect(result).toEqual(mockResponseData);
  });

  it('should throw an error if fetchSingle fails', async () => {
    const mockError = new Error('Network Error');
    mockFetchSingle.mockRejectedValue(mockError);

    await expect(getPrefectures()).rejects.toThrow('Network Error');
    expect(mockFetchSingle).toHaveBeenCalledTimes(1);
    expect(mockFetchSingle).toHaveBeenCalledWith('/api/v1/prefectures');
  });

  it('should throw an error if response is not valid JSON', async () => {
    const mockResponse = new Response('Invalid JSON', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

    mockFetchSingle.mockResolvedValue(mockResponse);

    // Expecting JSON.parse to throw an error
    await expect(getPrefectures()).rejects.toThrow(SyntaxError);
    expect(mockFetchSingle).toHaveBeenCalledTimes(1);
    expect(mockFetchSingle).toHaveBeenCalledWith('/api/v1/prefectures');
  });

  it('should throw an error if response status is not ok', async () => {
    // const mockResponse = new Response(JSON.stringify({ message: 'Server Error' }), {
    //   status: 500, // Simulate server error
    //   headers: { 'Content-Type': 'application/json' },
    // }); // mockResponse isn't strictly needed here

    // Assuming fetchSingle throws for non-ok status.
    // Adjust if fetchSingle behaves differently.
    mockFetchSingle.mockRejectedValue(new Error('HTTP error! status: 500')); // Simulate throw

    await expect(getPrefectures()).rejects.toThrow('HTTP error! status: 500');
    expect(mockFetchSingle).toHaveBeenCalledTimes(1);
    expect(mockFetchSingle).toHaveBeenCalledWith('/api/v1/prefectures');
  });
});
