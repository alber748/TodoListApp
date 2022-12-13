import { Todo } from "../to-dos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    new Todo("Piedra del Alma"),
    new Todo("Piedra del Infinito"),
    new Todo("Piedra del Tiempo"),
    new Todo("Piedra del Poder"),
    new Todo("Piedra del Realidad"),
  ],

  filter: Filters.All,
};

const initStore = () => {
  loadStore();
};

const loadStore = () => {
  
    if( !localStorage.getItem( 'state' ) ) return;

    const {todos = [], filter = Filters.All} = JSON.parse( localStorage.getItem( 'state' ))
    state.todos = todos;
    state.filter = filter;
};

const saveStateToLocalStorage = () => {

    localStorage.setItem( 'state', JSON.stringify( state ) )

}

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`Option ${filter} is not valid`);
  }
};

/**
 *
 * @param {String} description
 */

const addTodo = (description) => {
  if (!description) throw new Error("Descripcion es requerida");

  state.todos.push(new Todo(description));
  saveStateToLocalStorage();

};

const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.done = !todo.done;
    }

    return todo;
  });
  saveStateToLocalStorage();
};

const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocalStorage();
};

const deleteComplete = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
};

const setFilter = (newFilters = Filters.All) => {
  state.filter = newFilters;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  loadStore,
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteComplete,
  setFilter,
  getCurrentFilter,
};
