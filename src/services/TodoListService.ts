import { AddTodoResponse } from "@/types/AddTodoResponse";
import { TodoList } from "@/types/TodoList";
import axios, { AxiosResponse } from "axios";

export const getTodoListByUserId = async (userId:number):Promise<AxiosResponse<TodoList[], any>> => {
    return axios.get(`http://localhost:8080/api/todolist/findByUserId?userId=${userId}`)
}

export const addTodo = async (userId: number, name: string):Promise<AxiosResponse<AddTodoResponse,any>> => {
    return axios.post("http://localhost:8080/api/todolist",{name,userId})
}