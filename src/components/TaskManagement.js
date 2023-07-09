import React, { useState,useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './TaskManagement.css'; // Import custom CSS file

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isActionVisible, setIsActionVisible] = useState(false);

  useEffect(() => {
    // Retrieve tasks from local storage if available
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskPriorityChange = (event) => {
    setTaskPriority(event.target.value);
  };

  const handleTaskDueDateChange = (event) => {
    setTaskDueDate(event.target.value);
  };

  const handleTaskStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    // Create a new task object with the provided details
    const newTask = {
      id: Date.now(),
      name: taskName,
      priority: taskPriority,
      dueDate: taskDueDate,
      status: taskStatus,
      // Add other task properties as needed
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    console.log(updatedTasks);
    // Save the updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // Clear the task inputs after submission
    setTaskName('');
    setTaskPriority('');
    setTaskDueDate('');
    setTaskStatus('');
    setIsVisible(false)
  };

  const handleTaskDelete = (taskId) => {
    // Filter out the task with the provided taskId
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    // Update the tasks array with the filtered tasks
    setTasks(updatedTasks);
    setIsActionVisible(!isActionVisible)
  };

  const handleTaskUpdateStatus = (taskId, newStatus) => {
    // Find the task with the provided taskId
   
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });

    // Update the tasks array with the updated task
    setTasks(updatedTasks);
    setIsActionVisible(!isActionVisible)
  };

  const handleSort = (column) => {
    setSortColumn(column);
  };

  const handleFilter = (event) => {
    setFilterStatus(event.target.value);
  };

  let filteredTasks = tasks;
  if (filterStatus !== '') {
    filteredTasks = tasks.filter((task) => task.status === filterStatus);
  }

  if (sortColumn) {
    filteredTasks.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return -1;
      if (a[sortColumn] > b[sortColumn]) return 1;
      return 0;
    });
  }

  return (
    <div>
      <h2>Task Management</h2>

     { isVisible && (<Form onSubmit={handleTaskSubmit} className="custom-form">
        <Form.Group controlId="taskName">
          <Form.Label>Task Name:</Form.Label>
          <Form.Control
            type="text"
            value={taskName}
            onChange={handleTaskNameChange}
          />
        </Form.Group>

        <Form.Group controlId="taskPriority">
          <Form.Label>Priority:</Form.Label>
          <Form.Control
            as="select"
            value={taskPriority}
            onChange={handleTaskPriorityChange}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="taskDueDate">
          <Form.Label>Due Date:</Form.Label>
          <Form.Control
            type="date"
            value={taskDueDate}
            onChange={handleTaskDueDateChange}
          />
        </Form.Group>

        <Form.Group controlId="taskStatus">
          <Form.Label>Status:</Form.Label>
          <Form.Control
            as="select"
            value={taskStatus}
            onChange={handleTaskStatusChange}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ margin: '10px' }} 
        >
          Add Task
        </Button>
      </Form>)}

      <div className="table-filters">
        <Form.Group controlId="filterStatus">
          <Form.Label>Filter by Status:</Form.Label>
          <Form.Control
            as="select"
            value={filterStatus}
            onChange={handleFilter}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
          </Form.Control>
        </Form.Group>

        <Button className='button' variant="primary" onClick={() => handleSort('name')}>
          Sort by Name
        </Button>
        <Button className='button' variant="primary" onClick={() => handleSort('priority')}>
          Sort by Priority
        </Button>
        <Button  className='button' variant="primary" onClick={() => handleSort('dueDate')}>
          Sort by Due Date
        </Button>
        <Button  className='button' variant="primary" onClick={() => setIsVisible(true)}>
          Add Task
        </Button>
      </div>

      <h3>Tasks:</h3>
      {filteredTasks.length === 0 ? (
        <p>No tasks matching the filter criteria.</p>
      ) : (
        <Table striped bordered hover className="tasks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
               
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{task.dueDate}</td>
                <td>
                  <span className={`status-${task.status.toLowerCase()}` }>
                    {task.status}
                  </span>
                </td>
                <td>
                    
                <Button className='button1'
                    variant="primary"
                    onClick={() => setIsActionVisible(!isActionVisible)}>
                    <span>Update</span>
                  </Button>
                  {isActionVisible && ( <><Button className='button1'
                    variant="danger"
                    onClick={() => handleTaskDelete(task.id)}
                  >
                   <span className='trash'> <FontAwesomeIcon icon={faTrash} /></span>
                  </Button>
                  <Button className='button1'
                    variant="info   "
                    onClick={() => handleTaskUpdateStatus(task.id, 'Pending')}
                    disabled={task.status === 'Pending'}
                  >
                    <span>Pending</span>
                  </Button>
                  <Button className='button1'
                    variant="warning"
                    onClick={() => handleTaskUpdateStatus(task.id, 'Review')}
                    disabled={task.status === 'Review'}
                  >
                    <span>Review</span>
                  </Button>
                  <Button className='button1'
                    variant="success"
                    onClick={() => handleTaskUpdateStatus(task.id, 'Completed')}
                    disabled={task.status === 'Completed'}
                  >
                    <span>Completed</span>
                  </Button></>)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TaskManagement;
