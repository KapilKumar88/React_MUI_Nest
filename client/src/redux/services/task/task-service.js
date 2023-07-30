import { apiSlice } from "../api-slice"

const taskApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addTask: build.mutation({
            query: (data) => ({
                url: "/task",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['taskLists'],
        }),
        editTask: build.mutation({
            query: (data) => ({
                url: "/task",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['taskLists'],
        }),
        deleteTask: build.mutation({
            query: (id) => ({
                url: `/task/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['taskList'],
        }),
        taskList: build.query({
            query: (data) => ({
                url: '/task',
                params: data,
            }),
            providesTags: ['taskList'],
        }),
    }),
});

export const {
    useTaskListQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
} = taskApi;