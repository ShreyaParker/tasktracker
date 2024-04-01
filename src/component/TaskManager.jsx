import TaskCard from "./TaskCard.jsx";

const TaskManager = ({ tasks }) => {
    return (
        <div className="flex flex-row gap-7 ">
            <TaskCard tasks={tasks} status="pending" color="#8C8B90"/>
            <TaskCard tasks={tasks} status="In Progress" color="#E89924"/>
            <TaskCard tasks={tasks} status="completed" color="#44A822"/>
            <TaskCard tasks={tasks} status="deployed" color="#2D3266" />
            <TaskCard tasks={tasks} status="defined" color="#F68871"/>
        </div>
    );
};

export default TaskManager;
