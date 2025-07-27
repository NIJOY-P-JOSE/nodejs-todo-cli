const args = process.argv;
const command = args[2];
const fs = require("fs");

function showHelp() {
  console.log(`Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`);
}

const readTask = (path) =>
  fs.existsSync(path) ? fs.readFileSync(path, "utf8").trim().split("\n") : []; //if file exists then read it else return empty array

switch (command) {
  case "help":
    showHelp();
    break;

    
  case "add":
    const priority = args[3];
    const task = args.slice(4).join(" ");

    if (isNaN(priority) || task === "") {
      //Error if priority is not a number or task is empty
      console.log("Error: Missing tasks string. Nothing added!");
      break;
    }

    let data = readTask("task.txt");
    let tasks = data.map((x) => {
      let p = parseInt(x.split(" ")[0]);
      let d = x.split(" ").slice(1).join(" ");
      return { priority: p, desc: d };
    });

    const dupli = tasks.filter((x)=> x.priority == priority);
    const newTasks = tasks.map( (x)=>{
      if(x.priority == priority){
        
      }
    })
    if(dupli.length>0){
      console.log(`Error: No duplication`);
      break;
    }

    tasks.push({ priority: priority, desc: task });
    tasks.sort((a, b) => a.priority - b.priority); //sort tasks by smallest to largest priority (a-b=-ve then a first OR a-b=+ve then b first OR a-b=0 then they are in same order) )
    data = tasks.map((x) => `${x.priority} ${x.desc}`).join("\n");
    fs.writeFileSync("task.txt", `${data}\n`);
    console.log(`Added task: "${task}" with priority ${priority}`);
    break;

    
  case "ls":
    const list = readTask("task.txt");
    if (list.length === 0) {
      console.log("There are no pending tasks!");
      break;
    }

    list.forEach((x, i) => {
      // List the pending tasks in this format: index. task [priority]
      let p = x.split(" ")[0];
      let d = x.split(" ").slice(1).join(" ");
      console.log(`${i + 1}. ${d} [${p}]`);
    });
    break;

    
  case "del":
    const index = parseInt(args[3]); //index of task

    if (isNaN(index) || args.slice(4).length > 0) {
      //Error if index is not a number
      console.log("Error: Missing NUMBER for deleting tasks.");
      break;
    }

    const data1 = readTask("task.txt");
    if (data1.length === 0) {
      console.log("There are no pending tasks!");
      break;
    }

    if (index > data1.length || index < 1) {
      //Error if index is out of range
      console.log(
        `Error: task with index #${index} does not exist. Nothing deleted.`
      );
      break;
    }

    data1.splice(index - 1, 1);
    fs.writeFileSync("task.txt", `${data1.join("\n")}\n`);
    if (data1.length === 0) fs.unlinkSync("task.txt"); //Delete task.txt if the file is empty
    console.log(`Deleted task #${index}`);
    break;

    
  case "done":
    let data2 = readTask("task.txt");
    const index2 = parseInt(args[3]);
    if (isNaN(index2) || args.slice(4).length > 0) {
      console.log("Error: Missing NUMBER for marking tasks as done.");
      break;
    }
    if (data2.length === 0) {
      console.log("There are no pending tasks!");
      break;
    }
    if (index2 > data2.length || index2 < 1) {
      console.log(`Error: no incomplete item with index #${index2} exists.`);
      break;
    }
    
    let doneTask = data2[index2 - 1].split(" ").slice(1).join(" "); //take the done task
    let doneList = readTask("completed.txt");
    doneList.push(doneTask); //push the done task

    fs.writeFileSync("completed.txt", doneList.join("\n"));

    data2.splice(index2 - 1, 1); //remove the done task
    fs.writeFileSync("task.txt", `${data2.join("\n")}\n`);
    if (data2.length === 0) fs.unlinkSync("task.txt"); //Delete task.txt if the file is empty
    console.log(`Marked item as done.`);
    break;

    
  case "report":
    let completed = readTask("completed.txt");
    let pending = readTask("task.txt");
    if (pending.length === 0 && completed.length === 0) {
      console.log("Pending : 0\n\nCompleted : 0");
      break;
    }
    const pendingTasks = pending.map((x) => {
      //map the pending tasks as {priority, desc}
      let p = x.split(" ")[0];
      let d = x.split(" ").slice(1).join(" ");
      return { priority: p, desc: d };
    });

    console.log(`Pending : ${pending.length}`);
    pendingTasks.forEach((x, i) =>
      console.log(`${i + 1}. ${x.desc} [${x.priority}]`)
    );

    console.log(`\nCompleted : ${completed.length}`);
    completed.forEach((x, i) => console.log(`${i + 1}. ${x}`));
    break;

  default:
    showHelp();
    break;
}
