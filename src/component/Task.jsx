import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";

import { useFormContext } from "../FormContext.jsx";

const Task = ({ task }) => {
    const [toggle, setToggle] = useState(false);
    const { setInitialTask,setReadOnly, setOpenForm } = useFormContext();

    const handleMenu = () => {
        setToggle(!toggle);
    };
    const handleEdit = (task) => {
        setOpenForm(true);
        console.log(task);
        setInitialTask(task);
        setReadOnly(true)
    };
    const handleDelete = (task) => {
        const taskId = task.id;

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log(tasks);

        const updatedTasks = tasks.filter((t) => t.id !== taskId);

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        window.location.reload();
    };
    const { title, priority, description, assignee, status } = task;
    return (
        <div className="bg-zinc-100 m-2 px-2 py-3 flex h-44 flex-col gap-3">
            <div className="border-b-2 justify-center border-neutral-400 flex flex-row">
                <h1 className="text-2xl">{title}</h1>
                <h1 className="ml-auto uppercase bg-blue-800 text-xs p-1 text-white m-1">
                    {priority}
                </h1>
            </div>
            <p className="text-xs">{description}</p>
            <div className="flex flex-row items-center">
                <h1 className="text-xl">@{assignee}</h1>
                <button className="ml-auto" onClick={handleMenu}>
                    <BiDotsVerticalRounded className="bg-blue-800 m-1 w-5 h-4  text-white" />
                </button>
            </div>

            <div>
                <button className="bg-blue-800 capitalize text-white px-3 py-1 rounded">
                    {status}
                </button>

                {toggle && (
                    <div className="relative bottom-6 left-20 w-full lg:max-w-sm">
                        <div className="absolute left-28 md:left-24 lg:left-32 bg-zinc-300 p-2 rounded">
                            <div className="flex flex-col text-zinc-500">
                                <button className="border-b border-white pb-2" onClick={() => handleEdit(task)}>
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(task)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Task;
