import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNum, setTaskNum] = useState(0);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            setTasks(tasks);
        }
    }, [])
    

    const onNewTaskChange = (event) => {
        setNewTask(event.target.value);
    }

    const pushTasks = (tasks) => {
        setTasks(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const onAddTask = () => {
        const taskToAdd = {
            completed: false,
            text: newTask
        }

        pushTasks([...tasks, taskToAdd]);

        setNewTask('');
        
    }

    const onChangeTaskStatus = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;

        pushTasks(newTasks);
    }

    const onDeleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);

        pushTasks(newTasks);
    }

    const onEditTask = (index) => {
        setNewTask(tasks[index].text);
        setIsEditing(true);
        setTaskNum(index);
    }

    const onEditTaskCompleted = () => {
        const newTasks = [...tasks];
        newTasks[taskNum].text = newTask;

        pushTasks(newTasks);
        setNewTask('');
        setIsEditing(false);
    }


    return (
        <div className="App">
            <h1>Lista de tareas</h1>
            <p className='form__label'>Tarea Nueva</p>
            <input 
                type="text" 
                value={newTask} 
                onChange={onNewTaskChange} 
                className='form__input'
            
            />
            <button 
                onClick={isEditing ? onEditTaskCompleted : onAddTask}
                className='form__btn'
            >{
                isEditing ? 'Editar tarea' : 'Agregar tarea'
            }
            </button>
            <ul>
                {tasks.map((task, index) => {
                    return <div className='flex margins'>
                            <input type="checkbox" checked={task.completed} onChange={() => onChangeTaskStatus(index)} />
                            <p 
                                key={index}
                                className='form__label'
                            >
                                {task.text}
                            </p>
                            <button 
                                type='button' onClick={() => onDeleteTask(index)}
                                className='form__btn'
                            >
                                Eliminar
                            </button>
                            <button 
                                type='button' onClick={() => onEditTask(index)}
                                className='form__btn'
                            >
                                Editar
                            </button>
                        </div>
                })}
            </ul>
        </div>
    );
}

export default App;
