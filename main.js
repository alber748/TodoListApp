import './style.css'
import { App } from './src/to-dos/app'
import todoStore from './src/store/todo.store'


todoStore.initStore();

App( '#app' )
