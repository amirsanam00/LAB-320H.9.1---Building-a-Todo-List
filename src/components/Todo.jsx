



function Todo({ todo, onEdit, onDelete, onToggle }) {
    console.log(todo);
    const { title, completed, id } = todo;
  
    return (
      <div style={styles}>
        <input 
        type="checkbox" 
        checked={completed} 
        onChange={() => onToggle(id)}
        />
        <h2>{title}</h2>
        <button onClick={() => onEdit(id)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    );
  }
  
  const styles = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    // backgroundColor: 'grey'
  };
  
  export default Todo;