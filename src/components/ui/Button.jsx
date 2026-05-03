function Button({ type }) {
  if (type === "create") {
    return (
      <button className="flex justify-center items-center rounded-xl bg-cyan-600 py-2 px-6">
        + Create New Board
      </button>
    );
  }
  if (type === "addTask") {
    return (
      <button className="flex justify-center items-center rounded-xl bg-cyan-600 py-2 px-6">
        + Add Task
      </button>
    );
  }
  if (type === "cancel") {
    return (
      <button className="flex justify-center items-center rounded-xl bg-red-600 py-2 px-6">
        Cancel
      </button>
    );
  }
}

export default Button;
