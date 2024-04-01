import { useState, useEffect } from "react";
import TaskManager from "./TaskManager.jsx";
import { useFormContext } from "../FormContext.jsx";
import moment from "moment";

import CustomDateRangePicker from "./CustomeDateRangePicker.jsx";
import { GrPowerReset } from "react-icons/gr";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({
        assigneeName: "",
        priority: "",
        dateRange: {
            startDate: null,
            endDate: null
        }
    });

    const handleReset = () => {
        setFilterCriteria({
            assigneeName: "",
            priority: "",
            dateRange: {
                startDate: null,
                endDate: null
            }
        });
        setSortBy("createDate");
        setSortDirection("asc");
    };

    const [sortBy, setSortBy] = useState("createDate");
    const [sortDirection, setSortDirection] = useState("asc");
    const { setOpenForm ,setReadOnly,setRequired } = useFormContext();

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);

    }, []);

    const handleClick = () => {
        setOpenForm(true);
        setReadOnly(false)
        setRequired(true)
    };

    const handleFilterChange = (value, name) => {
        if (name === "dateRange" && Array.isArray(value)) {
            const [startDate, endDate] = value;
            setFilterCriteria(prevState => ({
                ...prevState,
                dateRange: {
                    startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
                    endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null
                }
            }));
        } else {
            if (value === null) {
                setFilterCriteria(prevState => ({
                    ...prevState,
                    dateRange: {
                        startDate: null,
                        endDate: null
                    }
                }));
            } else {
                setFilterCriteria(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => (prevDirection === "asc" ? "desc" : "asc"));
    };

    const filteredTasks = tasks.filter(task => {
        if (filterCriteria.assigneeName && !task.assignee.includes(filterCriteria.assigneeName)) {
            return false;
        }
        if (filterCriteria.priority && task.priority !== filterCriteria.priority) {
            return false;
        }
        const { startDate, endDate } = filterCriteria.dateRange;
        if (startDate && endDate) {
            const taskDate = moment(task.createDate, "DDMMYYYY").format("YYYY-MM-DD")
            if (taskDate < startDate || taskDate > endDate) {
                return false;
            }
        }
        return true;
    }).sort((a, b) => {
        const fieldA = a[sortBy];
        const fieldB = b[sortBy];
        let comparison = 0;
        if (fieldA > fieldB) {
            comparison = 1;
        } else if (fieldA < fieldB) {
            comparison = -1;
        }
        return sortDirection === "desc" ? comparison * -1 : comparison;
    });

    return (
        <div style={{ position: "relative" }}>
            <div>
                <div className="border-2 border-white rounded-2xl p-4 xl:p-7 md:py-12 mb-20 xl:mx-6 md:mb-44 font-bold">
                    <div className="flex flex-row">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                                <h1 className="pr-3">Filter By:</h1>
                                <div className="flex flex-row gap-2">
                                    <div className="flex flex-row gap-2">
                                        <input
                                            type="text"
                                            className="rounded w-20 lg:w-32 md:h-8 px-1"
                                            placeholder="Assignee"
                                            name="assigneeName"
                                            value={filterCriteria.assigneeName}
                                            onChange={(e) => handleFilterChange(e.target.value, "assigneeName")}
                                        />
                                        <select
                                            className="rounded w-24  md:w-32 md:h-8 px-1"
                                            name="priority"
                                            value={filterCriteria.priority}
                                            onChange={(e) => handleFilterChange(e.target.value, "priority")}
                                        >
                                            <option value="">Priority</option>
                                            <option value="p1">P 1</option>
                                            <option value="p0">P 0</option>
                                            <option value="p2">P 2</option>
                                        </select>
                                    </div>
                                    <CustomDateRangePicker
                                        value={[
                                            filterCriteria.dateRange.startDate ? new Date(filterCriteria.dateRange.startDate) : null,
                                            filterCriteria.dateRange.endDate ? new Date(filterCriteria.dateRange.endDate) : null
                                        ]}
                                        onChange={(value) => handleFilterChange(value, "dateRange")}
                                        format="yyyy-MM-dd"
                                    />
                                </div>

                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="p-1">Sort By:</span>
                                <select
                                    className="rounded px-1"
                                    value={sortBy}
                                    onChange={handleSortChange}
                                >
                                    <option value="createDate">Date</option>
                                    <option value="priority">Priority</option>
                                </select>
                                <button
                                    className={`px-3 text-white py-1 rounded ${sortDirection === "asc" ? "bg-blue-800" : "bg-gray-300"}`}
                                    onClick={toggleSortDirection}
                                >
                                    {sortDirection === "asc" ? "▲" : "▼"}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="px-3 text-white py-1 rounded  bg-blue-800"
                                >
                                    <GrPowerReset/>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center ml-auto">
                            <button
                                className="bg-blue-900 hidden md:flex text-white px-8 py-1 rounded"
                                onClick={handleClick}
                            >
                                Add New Task
                            </button>
                        </div>
                    </div>
                    <div className="overflow-auto mb-20 md:mb-9">

                        <TaskManager tasks={filteredTasks}/>
                    </div>
                    <div>
                        <div
                            className="bg-blue-900 mb-20 bottom-10 left-32 fixed items-center sm:hidden text-white px-8 py-1 rounded"
                        >

                            <button onClick={handleClick}>
                                Add New Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
