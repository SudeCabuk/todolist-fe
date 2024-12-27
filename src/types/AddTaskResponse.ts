import { Task } from "./Task"

export type AddTaskResponse = {
    message: string,
    success: boolean,
    data: Task
}