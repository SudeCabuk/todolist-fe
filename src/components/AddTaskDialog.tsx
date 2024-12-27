import { addTask } from "@/services/TaskService";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AddTaskDialog({
  setAddTaskDialogOpen,
  todolistId,
  getTasks,
}: {
  setAddTaskDialogOpen: Function;
  getTasks: Function;
  todolistId: number;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSave = () => {
    addTask({ title, description, todolistId }).then((response) => {
      getTasks();
      setAddTaskDialogOpen(false);
      Swal.fire({
        icon: "success",
        text: response.data.message,
        confirmButtonText: "Tamam",
      });
    });
  };
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Görev Ekle</h2>
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div style={{ marginTop: "15px" }}>
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <Button
          variant="outlined"
          style={{ marginRight: "10px" }}
          onClick={() => setAddTaskDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={title.length === 0 && description.length === 0}
          variant="contained"
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
