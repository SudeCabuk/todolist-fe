import { AddTaskRequest } from "@/types/AddTaskRequest"
import { AddTaskResponse } from "@/types/AddTaskResponse"
import { Task } from "@/types/Task"
import axios, { AxiosResponse } from "axios"

export const getTaskByTodoListId = async (todoListId:number):Promise<AxiosResponse<Task[], any>> => {
    return axios.get(`http://localhost:8080/api/tasks/findBytodolistId?todolistId=${todoListId}`)
}

export const addTask = async (task:AddTaskRequest):Promise<AxiosResponse<AddTaskResponse,any>> => {
    return axios.post("http://localhost:8080/api/tasks",task);
}