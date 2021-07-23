var elLista = document.getElementById("listaContatti"); 
var elForm = document.getElementById("form"); 
var utenti;
//prendo utenti e li scrivo in h1
$.ajax({
    url: "https://reqres.in/api/users?page=1",
    type:"GET",
    dataType:'json',
    success: function(dati){
        // console.log(dati);
        
        utenti = dati.data;


        // for (let i = 0; i < utenti.length; i++) {
        //     console.log(i);
        //     console.log(utenti[i]);
        // }
        
        stampaUtenti();
        
    },
    error:function(textStatus){
        if(textStatus.status == 404){
            console.log('risorsa non trovata');
            console.log(textStatus.status);
        }else{
            console.log('qualcosa è andato storto');
        }
    },
    
})





$(document).on('click','#btnDel',elimina);

function stampaUtenti() {
    $("#listaContatti").empty();
    for (let i = 0; i < utenti.length; i++) {
        // $('#listaContatti').children().remove();
        $('#listaContatti').append(
            
            '<div class="accordion-item">' +
                '<h2 class="accordion-header" id="headingTwo">' +
                    '<button id="nomeUtente" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + utenti[i].first_name +i+ '" aria-expanded="true" aria-controls="collapseTwo">'
                        + utenti[i].first_name + ' ' + utenti[i].last_name + '</button></h2>'
                + '<div id="collapse' + utenti[i].first_name+i + '" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#listaContatti">' +
            '<div class="accordion-body centered" id="infoCard">' +

            // card
            '<div class="card" style="width: 18rem;" id="card'+i+'">' +
                "<img class='card-img-top' src='"+ utenti[i].avatar +"' alt=''>" +
                '<div class="card-body text-centered">' +
                    '<h5 class="card-title">' + utenti[i].first_name + '-' + utenti[i].last_name + '</h5>' +
                    '<p class="card-text">' + utenti[i].email + '</p>'
                    +"<div class='centered'>"+
                        '<button id="btnMod" class="btn btn-warning"> <i class="fas fa-pen"></i></button>' +
                        '<button id="btnDel" class="btn btn-danger"> <i class="fas fa-trash-alt"></i></button>' +
                    "</div>"+
                '</div>' +
            '</div>' +

            '</div></div>');



    }
}

function elimina(){
    // console.log("sono in elimina")
    delete utenti[getIndexByEmail($(this).parent().parent().find('p').html())]
    utenti.sort();
    utenti.pop();
    
    
    
    $(this).parent()
    .parent()
    .parent()
    .parent()
    .parent()
    .parent().remove();
    

    
}


// $(document).on('click','#btnMod',modifica);

var nuovoUtente;
function getIndexByEmail(emaildellaltro) {
    for (let i = 0; i < utenti.length; i++) {
        if (utenti[i].email==emaildellaltro) {
            return i;
        }
    }
    console.log("email non trovata")
    return -1;
}
// var utenteBU;
// $("#insAcc").on('mouseout', function () {
//     console.log("sono in blur");
//                     $('#name').val("");
//                     $('#surname').val("");
//                     $('#email').val("");
                    
//                     console.log(utenti);
//                     console.log(utenteBU);
//                     utenti.push(utenteBU);
                    
//                     stampaUtenti();
// })


$(document).on('click','#btnMod',controllo);
var controllo=0;
function controllo(){
    if (($('#name').val()!="")||($('#email').val()!="")||($('#surname').val()!="")){
        // alert('diverso')
        
        console.log(controllo);
        if (controllo<1) {
            ++controllo;
            $("#formBody").append('<div class="alert alert-primary" role="alert" id="alertControllo">Attenzione stai modificando <a href="#" class="alert-link">questo utente</a>. </div>') 
        }
    }else{
        modifica($(this))
        
    }
    
}
function modifica(bottone){
   
    //questo serve per aprire la tendina
    if ($("#insAcc").hasClass("collapsed")) {
        $("#insAcc").click();
    }     
    
    //questo elimina l'utente
    $("#"+bottone.parent()
    .parent()
    .parent()
    .attr("id")).find("#btnDel").click();
    
 
   // copio i valori
    $('#name').val(bottone.parent().parent().children(0).html().split('-')[0]);
    $('#surname').val(bottone.parent().parent().children(0).html().split('-')[1]);
    $('#email').val(bottone.parent().parent().find('p').html());
    

}




// function modifica(){
//     //questo serve per aprire la tendina
//     if ($("#insAcc").hasClass("collapsed")) {
//         $("#insAcc").click();
//     } else {
//         //nulla
//     }
    
//     //questo elimina l'utente
//     $("#"+$(this).parent()
//     .parent()
//     .parent()
//     .attr("id")).find("#btnDel").click();
    
    
//     // copio i valori
//     $('#name').val($(this).parent().parent().children(0).html().split('-')[0]);
//     $('#surname').val($(this).parent().parent().children(0).html().split('-')[1]);
//     $('#email').val($(this).parent().parent().find('p').html());
//     //backup utente
//     utenteBU={
//         first_name: $('#name').val(),
//         last_name:$('#surname').val(),
//         email:$('#email').val()
    
//     }
//     if (($('#name').val()==utenteBU.first_name)||($('#email').val()==utenteBU.last_name)||($('#surname').val()==utenteBU.email)) {
        
//     } else {
      
        
        
        
        
    
//             }
            
            $('#form').on('keyup', function () {
                if (($('#name').val()=="")||($('#email').val()=="")||($('#surname').val()=="")) {
                    if (!($(this).children().find("#btn").hasClass("btn-danger"))) {
                        $(this).children().find("#btn").attr("class","btn btn-danger my-4")
                    }
                } else {
                    if (!($(this).children().find("#btn").hasClass("btn-success"))) {
                        $(this).children().find("#btn").attr("class","btn btn-success my-4")
                    }
                }
            });
            
            
            
            $('#btn').on('click', function () {

                if (($('#name').val()=="")||($('#email').val()=="")||($('#surname').val()=="")) {
                    //controllo se sbagliato nulla
                } else {
                     controllo=0;
                    $("#alertControllo").remove()
                    $.ajax({
                        url: "https://reqres.in/api/users",
                        type: "POST",
                        data: {
                            first_name: $('#name').val(),
                            last_name: $('#surname').val(),
                            email: $('#email').val(),
                            id: (Number)(2+utenti.length),
                            avatar: 'https://reqres.in/img/faces/'+(Number)(Math.ceil(10*(Math.random())))+'-image.jpg'
                        },
                        success: function(response){
                            $('#name').val("");
                            $('#surname').val("");
                            $('#email').val("");
                            nuovoUtente=response;
                             console.log(utenti);
                            // console.log(nuovoUtente);
                            utenti.push(nuovoUtente);
                            
                            stampaUtenti();
                        }
                        
                    })
                }
            });
     
    
