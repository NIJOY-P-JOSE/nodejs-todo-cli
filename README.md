# 📝 CLI To-Do List App

This is a simple **Command-Line To-Do List** application built using **Node.js**. It lets you manage tasks with priorities, mark them as done, and view reports — all from the terminal.

## 📌 Features

- ✅ Add tasks with priority
- 📋 View pending tasks (sorted by priority)
- ❌ Delete a specific task
- ✔️ Mark a task as completed
- 📊 View pending and completed task report
- 🛠️ Runs via CLI (`task.js`, `task.sh`, or `task.bat`)

## 🚀 Usage

You can run the program with the following commands:

```bash
# Add a new task
$ node task.js add 2 "Buy groceries"

# List all pending tasks
$ node task.js ls

# Delete a task by index
$ node task.js del 1

# Mark a task as completed
$ node task.js done 1

# Show report of pending and completed tasks
$ node task.js report

# Show help instructions
$ node task.js help
```

##📁 File Structure

| File                | Description                                |
| ------------------- | ------------------------------------------ |
| `task.js`           | Main application logic                     |
| `task.test.js`      | Test cases (if any)                        |
| `task.sh`           | Shell script to run commands (Linux/macOS) |
| `task.bat`          | Batch script to run commands (Windows)     |
| `package.json`      | Node.js project metadata                   |
| `package-lock.json` | Locks the exact versions of dependencies   |

## 🧠 How It Works

- 🗂️ Pending tasks are saved in `task.txt`
- ✅ Completed tasks are saved in `completed.txt`
- 🔒 Uses **synchronous file operations** (`fs.readFileSync`, `fs.writeFileSync`) for consistency
- 🔢 Tasks are **sorted by priority (ascending)** — lower number = higher priority


