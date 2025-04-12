import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getByPrefectures } from '~/api/populationComposition'; // Alias to avoid name clash
import * as apiLib from '~/lib/api'; // Import namespace for mocking
import type { Prefecture, PopulationCompositionPerYearResponse } from '~/types';

// Mock the fetchAll function from the api library
vi.mock('~/src/lib/api', () => ({
  fetchAll: vi.fn(),
}));

describe('API: getByPrefectures', () => {
  const mockFetchAll = vi.mocked(apiLib.fetchAll);

  beforeEach(() => {
    mockFetchAll.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京都' },
  ];

  const mockPopulationData1: PopulationCompositionPerYearResponse = {
    message: null,
    result: {
      boundaryYear: 2020,
      data: [
        { label: '総人口', data: [{ year: 2015, value: 5381733 }, { year: 2020, value: 5224615 }] },
        // ... other categories
      ],
    },
  };

  const mockPopulationData13: PopulationCompositionPerYearResponse = {
    message: null,
    result: {
      boundaryYear: 2020,
      data: [
        { label: '総人口', data: [{ year: 2015, value: 13515271 }, { year: 2020, value: 13951636 }] },
        // ... other categories
      ],
    },
  };

  it('should fetch and return population data for multiple prefectures', async () => {
    const mockResponse1 = new Response(JSON.stringify(mockPopulationData1), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/v1/population/composition/perYear?prefCode=1',
      ok: true, // Add missing properties
      statusText: 'OK',
      type: 'basic',
      redirected: false,
      // Add other methods/properties if needed by the code under test
      clone: () => mockResponse1,
      json: async () => mockPopulationData1,
      text: async () => JSON.stringify(mockPopulationData1),
      // Add other methods like arrayBuffer, blob, formData if necessary
    } as unknown as Response); // Use unknown first for safer casting

    const mockResponse13 = new Response(JSON.stringify(mockPopulationData13), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/v1/population/composition/perYear?prefCode=13',
      ok: true,
      statusText: 'OK',
      type: 'basic',
      redirected: false,
      clone: () => mockResponse13,
      json: async () => mockPopulationData13,
      text: async () => JSON.stringify(mockPopulationData13),
    } as unknown as Response);

    mockFetchAll.mockResolvedValue([mockResponse1, mockResponse13]);

    const result = await getByPrefectures(mockPrefectures);

    expect(mockFetchAll).toHaveBeenCalledTimes(1);
    expect(mockFetchAll).toHaveBeenCalledWith([
      '/api/v1/population/composition/perYear?prefCode=1',
      '/api/v1/population/composition/perYear?prefCode=13',
    ]);
    expect(result).toEqual([
      [1, mockPopulationData1],
      [13, mockPopulationData13],
    ]);
  });

  it('should fetch and return population data for a single prefecture', async () => {
    const singlePrefecture = [mockPrefectures[0]]; // Just Hokkaido
    const mockResponse1 = new Response(JSON.stringify(mockPopulationData1), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/v1/population/composition/perYear?prefCode=1',
      ok: true,
      statusText: 'OK',
      type: 'basic',
      redirected: false,
      clone: () => mockResponse1,
      json: async () => mockPopulationData1,
      text: async () => JSON.stringify(mockPopulationData1),
    } as unknown as Response);

    mockFetchAll.mockResolvedValue([mockResponse1]);

    const result = await getByPrefectures(singlePrefecture);

    expect(mockFetchAll).toHaveBeenCalledTimes(1);
    expect(mockFetchAll).toHaveBeenCalledWith([
      '/api/v1/population/composition/perYear?prefCode=1',
    ]);
    expect(result).toEqual([
      [1, mockPopulationData1],
    ]);
  });


  it('should throw an error if fetchAll fails', async () => {
    const mockError = new Error('Network Error');
    mockFetchAll.mockRejectedValue(mockError);

    await expect(getByPrefectures(mockPrefectures)).rejects.toThrow('Network Error');
    expect(mockFetchAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if one of the responses is not valid JSON', async () => {
    const mockResponse1 = new Response(JSON.stringify(mockPopulationData1), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/v1/population/composition/perYear?prefCode=1',
      ok: true,
      statusText: 'OK',
      type: 'basic',
      redirected: false,
      clone: () => mockResponse1,
      json: async () => mockPopulationData1,
      text: async () => JSON.stringify(mockPopulationData1),
    } as unknown as Response);
    const mockInvalidResponse = new Response('Invalid JSON', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
      url: 'http://test.com/api/v1/population/composition/perYear?prefCode=13',
      ok: true,
      statusText: 'OK',
      type: 'basic',
      redirected: false,
      clone: () => mockInvalidResponse,
      json: async () => { throw new SyntaxError('Unexpected token I in JSON at position 0'); },
      text: async () => 'Invalid JSON',
    } as unknown as Response);

    mockFetchAll.mockResolvedValue([mockResponse1, mockInvalidResponse]);

    // Expecting JSON.parse to throw for the second response
    await expect(getByPrefectures(mockPrefectures)).rejects.toThrow(SyntaxError);
    expect(mockFetchAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if URL does not contain prefCode (unexpected case)', async () => {
    const mockResponseMalformedUrl = new Response(JSON.stringify(mockPopulationData1), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      url: 'http://test.com/api/v1/population/composition/perYear?cityCode=1', // Missing prefCode
      ok: true,
      statusText: 'OK',
      type: 'basic',
      redirected: false,
      clone: () => mockResponseMalformedUrl,
      json: async () => mockPopulationData1,
      text: async () => JSON.stringify(mockPopulationData1),
    } as unknown as Response);

    mockFetchAll.mockResolvedValue([mockResponseMalformedUrl]);

    await expect(getByPrefectures([mockPrefectures[0]])).rejects.toThrow(
      'Unexpected Error: cannot resolve prefCode from url.'
    );
    expect(mockFetchAll).toHaveBeenCalledTimes(1);
  });
});
