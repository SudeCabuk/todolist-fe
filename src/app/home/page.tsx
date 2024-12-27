"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button, Card, CircularProgress, Dialog, Grid2 } from "@mui/material";
import { TodoList } from "@/types/TodoList";
import { getTodoListByUserId } from "@/services/TodoListService";
import AddTodoDialog from "@/components/AddTodoDialog";
import { getTaskByTodoListId } from "@/services/TaskService";
import { Task } from "@/types/Task";
import AddTaskDialog from "@/components/AddTaskDialog";

export default function Home() {
  const router = useRouter();
  const [todolist, setTodoList] = useState<TodoList[]>([]);
  const [task, setTask] = useState<Task[]>([]);
  const [userName, setUserName] = useState<String>("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [addTodoDialogOpen, setAddTodoDialogOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoList>();
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    getTodoListByUserId(JSON.parse(localStorage.getItem("user") || "").id).then(
      (response) => {
        setTodoList(response.data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setUserName(JSON.parse(user).name || "");
    }
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");

    router.push("/login");
  };

  const handleClickTodoList = (todo: TodoList) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    getTasks();
  }, [selectedTodo]);

  const getTasks = () => {
    getTaskByTodoListId(selectedTodo?.id || 0).then((response) => {
      setTask(response.data);
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {userName ? userName.charAt(0).toUpperCase() : "?"}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            {loading && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
              </div>
            )}
            {todolist.map((todoItem) => (
              <Card
                key={todoItem.id}
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  border: "1px solid #dddddd",
                  padding: "7px",
                  cursor: "pointer",
                }}
              >
                <div onClick={() => handleClickTodoList(todoItem)}>
                  <Typography variant="h5" component="div">
                    {todoItem.name}
                  </Typography>
                </div>
              </Card>
            ))}
            <Card
              sx={{
                width: "100%",
                marginTop: "10px",
                border: "1px solid #dddddd",
                padding: "7px",
                cursor: "pointer",
              }}
            >
              <div onClick={() => setAddTodoDialogOpen(true)}>
                <Typography
                  style={{ textAlign: "center", fontWeight: "600" }}
                  variant="h5"
                  component="div"
                >
                  Ekle
                </Typography>
              </div>
            </Card>
          </Grid2>
          <Grid2 size={6}>
            <h2 style={{ textAlign: "center" }}>{selectedTodo?.name}</h2>
            {task.map((taskItem) => (
              <Card
                key={taskItem.id}
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  border: "1px solid #dddddd",
                  padding: "7px",
                  cursor: "pointer",
                }}
              >
                <div>
                  <Typography variant="h5" component="div">
                    {taskItem.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {taskItem.description}
                  </Typography>
                </div>
              </Card>
            ))}
            {selectedTodo && (
              <Card
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  border: "1px solid #dddddd",
                  padding: "7px",
                  cursor: "pointer",
                }}
              >
                <div onClick={() => setAddTaskDialogOpen(true)}>
                  <Typography
                    style={{ textAlign: "center", fontWeight: "600" }}
                    variant="h5"
                    component="div"
                  >
                    Ekle
                  </Typography>
                </div>
              </Card>
            )}
          </Grid2>
        </Grid2>
      </Container>
      <Dialog
        onClose={() => setAddTodoDialogOpen(false)}
        open={addTodoDialogOpen}
      >
        <AddTodoDialog
          setAddTodoDialogOpen={setAddTodoDialogOpen}
          getData={getData}
        />
      </Dialog>
      <Dialog
        onClose={() => setAddTaskDialogOpen(false)}
        open={addTaskDialogOpen}
      >
        <AddTaskDialog
          setAddTaskDialogOpen={setAddTaskDialogOpen}
          todolistId={selectedTodo?.id || 0}
          getTasks={getTasks}
        />
      </Dialog>
    </div>
  );
}
