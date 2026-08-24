const STORAGE_KEY = "taskflow_data";

const initialData = {
  boards: [
    {
      id: "1",
      name: "React Project",
      color: "blue",
    },
    {
      id: "2",
      name: "Next.js Learning",
      color: "green",
    },
    {
      id: "3",
      name: "CSS Skills Improvement",
      color: "purple",
    },
  ],
  tasks: [
    {
      id: "1",
      title: "Build Task Management Dashboard",
      description:
        "Create the main dashboard layout and task management interface.",
      status: "todo",
      boardId: "1",
      priority: "high",
      dueDate: "",
      tags: ["feature", "react"],
      comments: [],
    },
    {
      id: "2",
      title: "Implement Drag & Drop",
      description:
        "Add drag and drop functionality for moving tasks between columns.",
      status: "in-progress",
      boardId: "1",
      priority: "high",
      dueDate: "",
      tags: ["feature", "react"],
      comments: [],
    },
    {
      id: "3",
      title: "Improve Responsive Design",
      description:
        "Improve the layout and responsiveness across different screen sizes.",
      status: "todo",
      boardId: "1",
      priority: "medium",
      dueDate: "",
      tags: ["design", "responsive"],
      comments: [],
    },
  ],
  activities: [],
};

const getData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return structuredClone(initialData);
  }

  return JSON.parse(saved);
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const generateId = () => {
  return crypto.randomUUID();
};

const api = {
  get: async (url) => {
    const data = getData();

    if (url === "/boards") {
      return { data: data.boards };
    }

    if (url.startsWith("/tasks?boardId=")) {
      const boardId = url.split("boardId=")[1];

      return {
        data: data.tasks.filter(
          (task) => String(task.boardId) === String(boardId),
        ),
      };
    }
    if (url === "/tasks") {
      return { data: data.tasks };
    }

    if (url === "/activities") {
      return { data: data.activities };
    }

    if (url.startsWith("/boards/")) {
      const boardId = url.split("/")[2];

      const board = data.boards.find(
        (board) => String(board.id) === String(boardId),
      );

      if (!board) {
        throw new Error("Board not found");
      }

      return { data: board };
    }

    throw new Error(`GET endpoint not found: ${url}`);
  },

  post: async (url, body) => {
    const data = getData();

    if (url === "/boards") {
      const newBoard = {
        ...body,
        id: body.id || generateId(),
      };

      data.boards.push(newBoard);
      saveData(data);

      return { data: newBoard };
    }
    if (url === "/activities") {
      const newActivity = {
        ...body,
        id: body.id || generateId(),
      };

      data.activities.push(newActivity);
      saveData(data);

      return { data: newActivity };
    }
    if (url === "/tasks") {
      const newTask = {
        ...body,
        id: body.id || generateId(),
      };

      data.tasks.push(newTask);
      saveData(data);

      return { data: newTask };
    }

    throw new Error(`POST endpoint not found: ${url}`);
  },

  put: async (url, body) => {
    const data = getData();

    if (url.startsWith("/boards/")) {
      const boardId = url.split("/")[2];

      const index = data.boards.findIndex(
        (board) => String(board.id) === String(boardId),
      );

      if (index === -1) {
        throw new Error("Board not found");
      }

      data.boards[index] = {
        ...data.boards[index],
        ...body,
      };

      saveData(data);

      return { data: data.boards[index] };
    }

    throw new Error(`PUT endpoint not found: ${url}`);
  },

  patch: async (url, body) => {
    const data = getData();

    if (url.startsWith("/tasks/")) {
      const taskId = url.split("/")[2];

      const index = data.tasks.findIndex(
        (task) => String(task.id) === String(taskId),
      );

      if (index === -1) {
        throw new Error("Task not found");
      }

      data.tasks[index] = {
        ...data.tasks[index],
        ...body,
      };

      saveData(data);

      return { data: data.tasks[index] };
    }

    throw new Error(`PATCH endpoint not found: ${url}`);
  },

  delete: async (url) => {
    const data = getData();

    if (url.startsWith("/boards/")) {
      const boardId = url.split("/")[2];

      data.boards = data.boards.filter(
        (board) => String(board.id) !== String(boardId),
      );

      data.tasks = data.tasks.filter(
        (task) => String(task.boardId) !== String(boardId),
      );

      saveData(data);

      return { data: null };
    }

    if (url.startsWith("/tasks/")) {
      const taskId = url.split("/")[2];

      data.tasks = data.tasks.filter(
        (task) => String(task.id) !== String(taskId),
      );

      saveData(data);

      return { data: null };
    }

    throw new Error(`DELETE endpoint not found: ${url}`);
  },
};

export default api;
