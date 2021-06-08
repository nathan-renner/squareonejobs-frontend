import React from "react";
import { MdDone } from "react-icons/md";

import { Badge, Card } from "../../common";

const tasks = [
  {
    completed: false,
    task: "Fill out your portfolio",
    points: 2000,
  },
  {
    completed: false,
    task: "Apply to 3 day jobs",
    points: 5000,
  },
  {
    completed: true,
    task: "Create your account",
    points: 1000,
  },
];

function Tasks(props) {
  const renderTasks = () => {
    return tasks.map((task, index) => {
      return (
        <div className="task" key={index}>
          <div className="box">
            {task.completed ? <MdDone size={30} color={"#51cc8e"} /> : null}
          </div>
          <p>{task.task}</p>
          <Badge text={`+ ${task.points}`} />
        </div>
      );
    });
  };

  return (
    <Card className="tasks-card" {...props}>
      <h2>Tasks</h2>
      {renderTasks()}
    </Card>
  );
}

export default Tasks;
