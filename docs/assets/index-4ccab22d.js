(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();let y;const C=new Uint8Array(16);function v(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function S(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:E};function P(e,t,s){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const i=e.random||(e.rng||v)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){s=s||0;for(let o=0;o<16;++o)t[s+o]=i[o];return t}return S(i)}class h{constructor(t){this.id=P(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},d={todos:[new h("Piedra del Alma"),new h("Piedra del Infinito"),new h("Piedra del Tiempo"),new h("Piedra del Poder"),new h("Piedra del Realidad")],filter:c.All},A=()=>{b()},b=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));d.todos=e,d.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(d))},k=(e=c.All)=>{switch(e){case c.All:return[...d.todos];case c.Completed:return d.todos.filter(t=>t.done);case c.Pending:return d.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid`)}},U=e=>{if(!e)throw new Error("Descripcion es requerida");d.todos.push(new h(e)),f()},I=e=>{d.todos=d.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},q=e=>{d.todos=d.todos.filter(t=>t.id!==e),f()},x=()=>{d.todos=d.todos.filter(e=>!e.done),f()},F=(e=c.All)=>{d.filter=e,f()},M=()=>d.filter,a={initStore:A,loadStore:b,getTodos:k,addTodo:U,toggleTodo:I,deleteTodo:q,deleteComplete:x,setFilter:F,getCurrentFilter:M},D=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`;let w;const H=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error(`Element ${e} not found`);w.innerHTML=a.getTodos(c.Pending).length},O=e=>{if(!e)throw new Error("Todo es required");const{done:t,description:s,id:i}=e,o=`
                <div class="view">
                    <input class="toggle" type="checkbox" ${t?"checked":""}>
                    <label>${s}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template"> `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",e.id),e.done&&n.classList.add("completed"),n};let g;const R=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(s=>{g.append(O(s))})},m={TodoList:".todo-list",newTodoIMput:"#new-todo-input",ClearCompleted:".clear-completed",todoFilters:".filtro",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{H(m.PendingCountLabel)},s=()=>{const l=a.getTodos(a.getCurrentFilter());R(m.TodoList,l),t()};(()=>{const l=document.createElement("div");l.innerHTML=D,document.querySelector(e).append(l),s()})();const i=document.querySelector(m.newTodoIMput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompleted),u=document.querySelectorAll(m.todoFilters);i.addEventListener("keyup",l=>{l.keyCode===13&&l.target.value.trim().length!==0&&(a.addTodo(l.target.value),s(),l.target.value="")}),o.addEventListener("click",l=>{const p=l.target.closest("[data-id]");a.toggleTodo(p.getAttribute("data-id")),s()}),o.addEventListener("click",l=>{if(!l.target.classList.contains("destroy"))return;const p=l.target.closest("[data-id]");a.deleteTodo(p.getAttribute("data-id")),s()}),n.addEventListener("click",()=>{a.deleteComplete(),s()}),u.forEach(l=>{l.addEventListener("click",p=>{switch(u.forEach(L=>{L.classList.remove("selected")}),p.target.classList.add("selected"),p.target.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}s()})})};a.initStore();V("#app");
