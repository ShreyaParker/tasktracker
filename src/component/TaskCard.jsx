
import Task from "./Task.jsx";

const TaskCard = ({ tasks, status, color }) => {

    const filteredTasks = tasks.filter(task => task.status === status);

    return (
        <div className="rounded-lg mx-1  bg-white min-h-96 min-w-52 xl:min-w-60 flex flex-col my-12 md:my-28 lg:my-11 xl:my-7">
            <h2
                className="text-center capitalize  text-white rounded-t-lg"
                style={{
                    background: color
                }}
            >{status}</h2>
            <div className="flex  flex-col">
                {filteredTasks.map((task, index) => (
                    <Task key={index} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskCard;
