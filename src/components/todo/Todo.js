
import React,{useState} from "react";
export default function Todo(props){
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    function handleChange(e) {
        setNewName(e.target.value);
      }
      
      function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
      }
      
    const editingTemplate = (
        <form className="stack-small" >
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input id={props.id} className="todo-text" value={props.name} type="text" onChange={handleChange} data-testid={props.id +"tasknewname"}/>
          </div>
          <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            data-testid={props.id+"canceledit"}
            onClick={() => setEditing(false)}
            >
            Cancel
        <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit" data-testid={props.id+"savebutton"} onClick={handleSubmit}>
        Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              <input
                data-testid={props.id + "checkbox"}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              />
              <label className="todo-label" htmlFor={props.id} data-testid={props.name}>
                {props.name}
              </label>
            </div>
            <div className="btn-group">
            <button type="button" className="btn" data-testid={"editbutton"+props.id} onClick={() => setEditing(true)}>
                Edit <span className="visually-hidden">{props.name}</span>
                </button>

              <button
                data-testid={"deletebutton"+props.id}
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}
              >
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
            </div>
        </div>
      );
      
      return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}