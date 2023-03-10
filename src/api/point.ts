import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPoint, IPointCreateRequest, IPointState, IPointType} from "../view/point";

export const pointApi = createApi({
    reducerPath: 'easyPoint/point',
    baseQuery: fetchBaseQuery({
        credentials: 'include'
    }),
    tagTypes: ['Points'],
    refetchOnFocus: true,
    endpoints: build => ({
        searchPoints: build.query<IPoint[], void>({
            query: () => ({
                url: '/point'
            }),
            providesTags: ['Points']
        }),
        createPoint: build.mutation<IPoint, IPointCreateRequest>({
            query(body) {
                return {
                    url: `/point`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{type: 'Points'}]
        }),
        deletePoint: build.mutation<void, number>({
            query(pointId) {
                return {
                    url: `/point/${pointId}`,
                    method: 'POST'
                }
            },
            invalidatesTags: [{type: 'Points'}]
        })
    })
});


export const {useCreatePointMutation, useSearchPointsQuery, useDeletePointMutation} = pointApi;


export const pointTypeApi = createApi({
    reducerPath: 'easyPoint/pointTypes',
    baseQuery: fetchBaseQuery({
        credentials: 'include'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchPointTypes: build.query<IPointType[], void>({
            query: () => ({
                url: '/point-type'
            }),
        })
    })
});
export const {useSearchPointTypesQuery} = pointTypeApi;
export const pointStateApi = createApi({
    reducerPath: 'easyPoint/pointStates',
    baseQuery: fetchBaseQuery({
        credentials: 'include'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchPointStates: build.query<IPointState[], void>({
            query: () => ({
                url: '/point-state'
            }),
        })
    })
})
export const {useSearchPointStatesQuery} = pointStateApi;

