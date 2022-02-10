import { Todo } from '../js/Todo.js';

let todolist = [];

$(document).ready(function() {
    $("#titolo").val('');
    $("#testo").val('');
    $("ul").val(''); // non funziona, da rivedere;

    stampaTodo();

    $("button").on("click", function() { // Controllare l'intercettazione del bottone
        let titolo = $("#titolo").val();
        let testo = $("#testo").val();
        let todo = new Todo(titolo, testo);
        todolist.push(todo);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
    });

}); // FINE DOCUMENT READY

// CREAZIONE FUNZIONE STAMPATODO
function stampaTodo() {
    let lista = $(".lista ul");
    lista.html('');
    let localLista = localStorage.getItem("listaTodo");
    if (localLista !== null) {
        todolist = JSON.parse(localLista);
    }

    // FUNZIONA MA NON È FATTO DA ME
    // $.each(todolist, function(i, todo) {
    //     let li = $("<li></li>");
    //     li.addClass("list-group-item");
    //     li.html(todo.titolo + " - " + todo.testo);
    //     li.append(`<span id=${i} class="btn btn-sm btn-danger float-end">X</span>`);
    //     //('<span class="btn btn-sm btn-danger float-end">X</span>');
    //     lista.append(li); // <UL>

    //     li.children().on("click", function() { // figli di <LI></LI>
    //         todolist.splice(i, 1);
    //         localStorage.setItem("listaTodo", JSON.stringify(todolist));
    //         stampaTodo();
    //     });
    // }); // FINE EACH


    // NON FUNZIONA, CANCELLA SOLO IL 1° ELEMENTO (non importa quale si clicchi)
    let i = 0;
    todolist.forEach((todo) => {
        let li = $("<li></li>");
        li.addClass("list-group-item");
        li.html(todo.titolo + " - " + todo.testo);
        li.append(`<span id="rimuovi" class="btn btn-sm btn-danger float-end" class="${i}">X</span>`); // al 1° giro è 0
        //('<span class="btn btn-sm btn-danger float-end">X</span>');
        lista.append(li); // La stampa funziona;
        i++; // poi si incrementa dopo la stampa
        lista.children().on("click", "#rimuovi", function() { // Mi piazzo sui figli di UL, cioè LI
            $(this).closest('li').remove(); // il this si posiziona sull'ID Rimuovi e cancella la LI
            var classe = $(this).attr("class"); // a questa variabile memorizzo ${i}; (ma avendo una class con le istruzioni di bootstrap, creerà casini? Lo leggerà lo stesso?)
            todolist.splice(classe, 1); // per l'array todolist, usando "classe" (che ha ${i} memorizzato) e lavorando su un elemento alla volta "SPLICE"
            localStorage.setItem("listaTodo", JSON.stringify(todolist));
            stampaTodo(); // siccome il localStorage cambia, devo stampare nuovamente la lista;
        });
    }); // FINE EACH

}