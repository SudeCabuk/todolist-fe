import { TodoList } from "./TodoList"

export type AddTodoResponse = {
    message: string,
    success: boolean,
    data: TodoList
}