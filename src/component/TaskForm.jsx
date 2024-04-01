import {  useState, useEffect } from 'react';
import { useFormContext } from '../FormContext.jsx';

const TaskForm = () => {
    const { initialTask, setInitialTask, required, setOpenForm, readOnly } = useFormContext();
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}${month}${year}`;
    };
    const id = Date.now().toString();

    const [task, setTask] = useState(() => {
        if (initialTask) {
            return initialTask;
        } else {
            return {
                id,
                title: '',
                description: '',
                team: '',
                assignee: '',
                priority: 'p1',
                status: 'pending',
                createDate: formatDate(new Date()),
                endDate: '',
            };
        }
    });

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (required) {
            if (!task.title.trim()) {
                errors.title = 'Title is required';
            }
            if (!task.description.trim()) {
                errors.description = 'Description is required';
            }
            if (!task.team.trim()) {
                errors.team = 'Team is required';
            }
            if (!task.assignee.trim()) {
                errors.assignee = 'Assignee is required';
            }
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {

            if (initialTask) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const updatedTasks = storedTasks.map((t) => {
                    if (t.id === initialTask.id) {
                        return task;
                    }
                    return t;
                });

                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            } else {
                const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
                const newTask = { ...task, id: Date.now().toString() };
                const updatedTasks = [...storedTasks, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
            setOpenForm(false);
            setInitialTask(null);
            window.location.reload();
        } else {
            setFormErrors(errors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="w-72" style={{ background: 'linear-gradient(122deg, rgba(244,219,249,1) 32%, rgba(226,219,252,1) 53%)' }}>
            <div className="flex px-3 p-2 flex-row bg-white">
                <h1 className="mr-auto text-xl font-bold">{initialTask ? 'Edit Task' : 'Add Task'}</h1>
                <button
                    onClick={() => {
                        setOpenForm(false);
                        setInitialTask(null);
                    }}
                    className="rounded-full text-center px-2 border-2 border-black"
                >
                    x
                </button>
            </div>

            <div className="px-3 py-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col py-3">
                        <label htmlFor="title" className="mr-auto">
                            Title
                        </label>
                        <input
                            type="text"
                            className="bg-zinc-300 px-2"
                            placeholder="Enter title"
                            name="title"
                            value={task.title}
                            readOnly={readOnly}
                            onChange={handleChange}
                        />
                        {formErrors.title && <span className="text-red-500">{formErrors.title}</span>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label htmlFor="description" className="mr-auto">
                            Description
                        </label>
                        <textarea
                            readOnly={readOnly}
                            className="bg-zinc-300 px-2"
                            placeholder="Enter description"
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                        ></textarea>
                        {formErrors.description && <span className="text-red-500">{formErrors.description}</span>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label htmlFor="team" className="mr-auto">
                            Team
                        </label>
                        <input
                            type="text"
                            readOnly={readOnly}
                            className="bg-zinc-300 px-2"
                            placeholder="Enter team"
                            name="team"
                            value={task.team}
                            onChange={handleChange}
                        />
                        {formErrors.team && <span className="text-red-500">{formErrors.team}</span>}
                    </div>
                    <div className="flex flex-col py-3">
                        <label htmlFor="assignee" className="mr-auto">
                            Assignee
                        </label>
                        <input
                            type="text"
                            readOnly={readOnly}
                            className="bg-zinc-300 px-2"
                            placeholder="Enter assignee"
                            name="assignee"
                            value={task.assignee}
                            onChange={handleChange}
                        />
                        {formErrors.assignee && <span className="text-red-500">{formErrors.assignee}</span>}
                    </div>
                    <div className="flex flex-row">
                        <div className="pt-3 py-3">
                            <label htmlFor="priority" className="mr-12">
                                Priority
                            </label>
                            <select
                                className={`${initialTask ? 'bg-white' : 'bg-zinc-300'} px-2`}
                                value={task.priority}
                                onChange={handleChange}
                                name="priority"
                            >
                                <option value="p1">P 1</option>
                                <option value="p0">P 0</option>
                                <option value="p2">P 2</option>
                            </select>
                        </div>
                        {initialTask && (
                            <div className="pt-3 py-3 ">
                                <label htmlFor="status" className="mr-12">
                                    Status
                                </label>
                                <select
                                    className={`${initialTask ? 'bg-white' : 'bg-zinc-300'} px-2`}
                                    value={task.status}
                                    onChange={handleChange}
                                    name="status"
                                >
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="deployed">Deployed</option>
                                    <option value="defined">Defined</option>
                                    <option value="In Progress">In Progress</option>
                                </select>
                            </div>
                        )}
                    </div>
                </form>
            </div>
            <div className="px-3 py-3 bg-white flex justify-end">
                <button onClick={handleSubmit} className="bg-blue-800 text-white px-4 py-2 rounded">
                    {initialTask ? 'Update' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default TaskForm;
