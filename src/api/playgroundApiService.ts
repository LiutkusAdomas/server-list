import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthData } from '../model/AuthData.type';
import { Credentials } from '../model/Credentials.type';
import { RootState } from '../store';
import { Server } from '../model/Server.type';
import { transformResponse } from '../helpers/Utilities';
import { ServerResponse } from '../model/ServerResponse.type';


export const playgroundApi = createApi({
    reducerPath: 'playgroundApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://playground.tesonet.lt/v1',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getToken: builder.mutation<AuthData, Credentials>({
            query: (credentials) => ({ url: 'tokens', method: 'POST', body: credentials }),
        }),
        getServerList: builder.query<Server[], void>({
            query: () => 'servers',
            transformResponse: (response: ServerResponse[]) => transformResponse(response)
        }),
    })
})

export const { useGetTokenMutation, useGetServerListQuery } = playgroundApi;