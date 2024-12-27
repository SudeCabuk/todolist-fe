import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addTodo } from "@/services/TodoListService";
import Swal from "sweetalert2";

export default function AddTodoDialog({
  setAddTodoDialogOpen,
  getData,
}: {
  setAddTodoDialogOpen: Function;
  getData: Function;
}) {
  const [name, setName] = useState<string>("");
  const handleSubmit = () => {
    addTodo(JSON.parse(localStorage.getItem("user") || "").id, name).then(
      (response) => {
        getData();
        setAddTodoDialogOpen(false);
        Swal.fire({
          icon: "success",
          text: response.data.message,
          confirmButtonText: "Tamam",
        });
      }
    );
  };
  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Görev Ekle</h2>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <Button
          variant="outlined"
          style={{ marginRight: "10px" }}
          onClick={() => setAddTodoDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={name.length === 0}
          variant="contained"
          onClick={() => handleSubmit()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
