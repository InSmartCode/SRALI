$(document).ready(function () {
    $('#tblPerfiles').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();
});


function CallBack() {
    $('#tblPerfiles').DataTable();

    $('#tblPerfiles tbody').on('click', 'tr', function () {

        Id = $(this).find('td:first').html();
        Nombre = $(this).find('td:nth-child(2)').html();


        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}

function limpiarDatos() {
    $("#id").val("");
    $("#nombre").val("");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Perfil');
    $('#modalPerfil').modal('show');
}

function Editar() {

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#id").val(Id);
    $("#nombre").val(Nombre);

    $('#modalHeader').html('Actualizar Perfil');
    $('#modalPerfil').modal('show');
}



var IdPerfil = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblPerfiles tbody').on('click', 'tr', function () {

    Id = $(this).find('td:first').html();
    Nombre = $(this).find('td:nth-child(2)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //idPerfil: $("#IdPerfil").val(),
        nombre: $("#nombre").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Sistema/GuardarPerfil",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Perfil Agregado.");
                $('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.Perfiles, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombre + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.Perfiles, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombre + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Perfil");
            }
            $('#modalPerfil').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalPerfil').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        id: $("#id").val()
        , nombre: $("#nombre").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Sistema/GuardarPerfil",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Perfil Actualizado.");
                $('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.Perfiles, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombre + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.Perfiles, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombre + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Perfil");
            }
            $('#modalPerfilPerfil').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalPerfil').modal('hide');
        }
    });

});


