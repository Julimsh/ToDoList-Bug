import { Todo } from '../js/Todo.js';

let todolist = [];

document.addEventListener('DOMContentLoaded', function() {
    stampaTodo();
    let button = document.querySelector('.todo button');
    button.addEventListener('click', function() {
        let titolo = document.querySelector('#titolo');
        let testo = document.querySelector('#testo');
        let todo = new Todo(titolo.value, testo.value);
        todolist.push(todo);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
    });
});

let stampaTodo = () => {
    let lista = document.querySelector('.lista ul');
    lista.innerHTML = '';

    let localLista = localStorage.getItem('listaTodo');
    if (localLista !== null) {
        todolist = JSON.parse(localLista);
    }

    todolist.forEach((todo) => {
        let li = document.createElement('li');
        let i = 0;
        li.className = 'list-group-item';
        li.innerHTML = todo.titolo + ' - ' + todo.testo;

        // **** l'errore dovrebbe partire da qui ****
        li.innerHTML += '<span id="rimuovi" class="btn btn-sm btn-danger float-end">X</span>';
        // ma se ogni bottone X ha l'ID "rimuovi", non si crea un conflitto?
        lista.appendChild(li);

        // perché è scritto in jquery?
        let rimuovi = $('#rimuovi'); // a che serve metterlo in una variabile?
        rimuovi.on('click', function() {

            todolist.splice(todolist.indexOf(todo), 1); // l'1 è riferito a splice
            // NOTE DI STUDIO
            // SPLICE() è un metodo modifica il contenuto di un array rimuovendo o sostituendo elementi esistenti 
            // e/o aggiungendo nuovi elementia posto; 
            // FINE NOTE
            // +
            //NOTE DI STUDIO
            // INDEXOF è un metodo restituisce il primo indice in cui è possibile trovare un determinato elemento nell'array, 
            //oppure -1 se non è presente. 
            // --- searchElement: Elemento da individuare nell'array;  
            // --- fromIndex Opzionale: Indice da cui iniziare la ricerca;
            // ------ Se l'indice è maggiore o uguale alla lunghezza dell'array, viene restituito -1, il che significa che non verrà eseguita la ricerca nell'array. 
            // Se il valore dell'indice fornito è un numero negativo, viene preso come offset dalla fine dell'array. 
            // Nota: se l'indice fornito è negativo, l'array viene comunque ricercato dall'inizio alla fine. 
            // Se l'indice fornito è 0, verrà eseguita la ricerca nell'intero array. 
            // Predefinito: 0 (viene ricercata l'intera matrice). 
            // FINE NOTE

            localStorage.setItem('listaTodo', JSON.stringify(todolist));
            //NOTE DI STUDIO
            // Il JSON.stringify()metodo converte un oggetto o un valore JavaScript in una stringa JSON, 
            // sostituendo facoltativamente i valori se viene specificata una funzione sostitutiva 
            // o includendo facoltativamente solo le proprietà specificate se viene specificata una matrice sostitutiva. 
            // FINE NOTE

            stampaTodo(); // siccome il localStorage cambia, devo stampare nuovamente la lista;
        })
    });
}