import { apiSlice } from "../api-slice"

const taskApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addTask: build.mutation({
            query: (data) => ({
                url: "/task",
                method: "POST",
                body: data,
            }),
        }),
        editTask: build.mutation({
            query: (data) => ({
                url: "/task",
                method: "PATCH",
                body: data,
            }),
        }),
        deleteTask: build.mutation({
            query: (data) => ({
                url: "/task",
                method: "DELETE",
                body: data,
            }),
        }),
        taskList: build.query({
            query: () => 'test',
        }),
    }),
});

export const {
    useTaskListQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useDeleteTaskMutation
} = taskApi;