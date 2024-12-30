import Swal from "sweetalert2";
import {
  todoInputEl,
  todoListEl,
  todoDeadlineInputEl,
  updateChartData,
  createTodoElement,
  toggleEmptyTodoMsg,
  getTodoFromLocalStorage,
  setTodoInLocalStorage,
  updateDeadlineTime,
} from "./index";

// Helper function to create a new todo object with the necessary properties
function createTodoObject(id, text, currentTime, deadlineTime) {
  return {
    id, // Unique identifier for the todo
    text, // The content or text of the todo
    completed: false, // Status of the todo (false by default)
    createdAt: currentTime, // Timestamp indicating when the todo was created
    deadline: deadlineTime, // Timestamp representing the todo deadline
    elapsedTime: "",
    expired: false,
  };
}

export function addToDo() {
  // Fetch existing todos from local storage
  const existingTodos = getTodoFromLocalStorage() || [];
  // Trim the input text to remove any whitespace
  const todoInput = todoInputEl.value.trim();
  // Get the selected deadline value
  const deadlineInput = todoDeadlineInputEl.value;

  // If the input is empty or no deadline is selected, show a warning
  if (!todoInput || !deadlineInput) {
    Swal.fire({
      icon: "info",
      title: "Oops...",
      text: "Task must be filled and deadline must be selected!",
    });

    return;
  }

  // Create a new todo object with the necessary properties
  const newTodo = createTodoObject(
    existingTodos.length,
    todoInput,
    Date.now(),
    new Date(deadlineInput).getTime()
  );

  // Add the new todo to the existing list and save to local storage
  setTodoInLocalStorage([...existingTodos, newTodo]);

  // Clear the input fields
  todoInputEl.value = "";
  todoDeadlineInputEl.value = "";
  // Append the new todo element to the DOM
  todoListEl.appendChild(createTodoElement(newTodo.id, todoInput, false));

  // Toggle empty message visibility if there are no more todos
  toggleEmptyTodoMsg();
  // Update the chart with the new data
  updateChartData();
  // Update deadlines and expired section visibility
  updateDeadlineTime();
}
