import todoStore, { Filters } from '../store/todo.store.js';
import { html } from './app.html.js';
import { renderTodos, renderPending } from './uses-cases';

const ElementsId = {
    TodoList : '.todo-list',
    newTodoIMput: '#new-todo-input',
    ClearCompleted : '.clear-completed',
    todoFilters: '.filtro',
    PendingCountLabel: '#pending-count'
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {
    
    const updatePendingCount = () => {
            renderPending( ElementsId.PendingCountLabel )
    }

     const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementsId.TodoList, todos );
        updatePendingCount();
    }
    
    //Cuando la funcion app se llama
    (() => {
        const app = document.createElement( "div" );
        app.innerHTML = html;
        document.querySelector( elementId ).append( app );
        displayTodos();
    })();
    
   
    //Referencias HTML

    const newDescriptionInput = document.querySelector( ElementsId.newTodoIMput );
    const todoListUl = document.querySelector( ElementsId.TodoList );
    const deleteCompleted = document.querySelector( ElementsId.ClearCompleted );
    const filtersUl = document.querySelectorAll( ElementsId.todoFilters );


    //EventListeners
    newDescriptionInput.addEventListener( 'keyup', ( event )=>{

        if( event.keyCode !== 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();

        event.target.value = '';
    } );

    todoListUl.addEventListener( 'click', (event ) => {
        const elment = event.target.closest('[data-id]');
        todoStore.toggleTodo( elment.getAttribute('data-id') )
        displayTodos();

    });

    todoListUl.addEventListener( 'click', (event ) => {
        if(!event.target.classList.contains( 'destroy' )) return

        const elment = event.target.closest('[data-id]');
        todoStore.deleteTodo( elment.getAttribute( 'data-id' ) )
        displayTodos();
    });


    deleteCompleted.addEventListener( 'click', () =>{
        todoStore.deleteComplete();
        displayTodos();
    } );

    filtersUl.forEach(filter => {
        filter.addEventListener( 'click', ( filter ) =>{
            filtersUl.forEach(el => {
                el.classList.remove( 'selected' )
            });
            filter.target.classList.add( 'selected' );

            switch( filter.target.text ){

                case 'Todos':
                    todoStore.setFilter( Filters.All )
                    break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                    break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                    break;
            }

            displayTodos();

        } )
    });
    
}