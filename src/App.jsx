import './App.css'
import Navbar from "./component/Navbar.jsx";
import Dashboard from "./component/Dashboard.jsx";
import TaskForm from "./component/TaskForm.jsx";
import { useFormContext} from "./FormContext.jsx";

function App() {
    const { openForm, setOpenForm, initialTask ,setInitialTask } = useFormContext();


    return (
        <div className="relative">
            <Navbar/>
            <Dashboard />


            {/*form for create new task*/}
            {openForm && !initialTask && (
                <div>
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-50"
                        onClick={() => setOpenForm(false)}
                    ></div>
                    <div style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 51
                    }}>
                        <TaskForm setOpenForm={setOpenForm} />
                    </div>
                </div>
            )}
            {/*form for edit task*/}
            {openForm && initialTask && (
                <div>
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-50"
                        onClick={() => {
                            setOpenForm(false)
                            setInitialTask(null)
                        }}
                    ></div>
                    <div style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 51
                    }}>
                        <TaskForm initialTask={initialTask} setOpenForm={setOpenForm} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
