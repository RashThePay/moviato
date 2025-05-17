'use server'
import { DiscoverResults } from './types';
export default async function getTMDB(path: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDdlN2UwMmE5YzYzZmRhYmE2YTBkYTBkM2VlYjMzMCIsIm5iZiI6MTc0NzA0MzIzMC4wNDksInN1YiI6IjY4MjFjMzllNDNjMTRlMjllODVhMmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TFDiVn6oYcBw3j5KNheYnt4mf8Z2xJ9mV3EBFJuFoeY'
    }
  };
  const res = await fetch('https://api.themoviedb.org/3' + path, options);
  const json = await res.json();
  return json;
}

export async function getTMDBWithPage(path: string, page: number) {
  return getTMDB(path + "?page=" + page)
}


const BASE_URL = 'https://api.themoviedb.org/3';

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  return response.json();
};

export const discoverMovies = async (
  params: Record<string, string | number | undefined>
): Promise<DiscoverResults> => {
  const url = new URL(`${BASE_URL}/discover/movie`);
  url.searchParams.set('language', 'en-US');

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, value.toString());
    }
  });
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDdlN2UwMmE5YzYzZmRhYmE2YTBkYTBkM2VlYjMzMCIsIm5iZiI6MTc0NzA0MzIzMC4wNDksInN1YiI6IjY4MjFjMzllNDNjMTRlMjllODVhMmFhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TFDiVn6oYcBw3j5KNheYnt4mf8Z2xJ9mV3EBFJuFoeY'
    }
  };
  const response = await fetch(url.toString(), options);
  return handleResponse<DiscoverResults>(response);
};
