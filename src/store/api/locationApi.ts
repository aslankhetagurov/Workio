import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_GEOLOCATION_API_KEY;

export interface ILocationItem {
    display_address: string;
    display_place: string;
    place_id: string;
}

export type TLocationApiResponse = ILocationItem[];

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.locationiq.com/v1/',
    }),
    endpoints: (builder) => ({
        getLocations: builder.query<TLocationApiResponse, string>({
            query: (searchValue) =>
                `autocomplete?tag=place%3Acity%2Cplace%3Atown%2Cplace%3Avillage&key=${API_KEY}&q=${searchValue}&type=city&limit=5&dedupe=1&accept-language=en&normalizecity=1`,
        }),
    }),
});

export const { useGetLocationsQuery } = locationApi;
