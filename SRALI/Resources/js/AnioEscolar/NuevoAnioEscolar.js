$(document).ready(function () {
    $('#tblAniosEscolares').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();
});


function CallBack() {
    $('#tblAniosEscolares').DataTable();

    $('#tblAniosEscolares tbody').on('click', 'tr', function () {

        IdAnioEscolar = $(this).find('td:first').html();
        Nombre = $(this).find('td:nth-child(2)').html();
        Anio = $(this).find('td:nth-child(3)').html();
        Semanas = $(this).find('td:nth-child(4)').html();
        Descripcion = $(this).find('td:nth-child(5)').html();
        Estado = $(this).find('td:nth-child(6)').html();


        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}

function limpiarDatos() {
    //$("#id").val("");
    $("#Nombre").val("");
    $("#Anio").val("");
    $("#Semanas").val("");
    $("#Descripcion").val("");
    $("#Estado").val("");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Año Escolar');
    $('#modalAnioEscolar').modal('show');
}

function Editar() {

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    //$("#id").val(Id);
    $("#Nombre").val(Nombre);
    $("#Anio").val(Anio);
    $("#Semanas").val(Semanas);
    $("#Descripcion").val(Descripcion);
    $("#Estado").val(Estado);

    $('#modalHeader').html('Actualizar Año Escolar');
    $('#modalAnioEscolar').modal('show');
}



var IdAnioEscolar = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblAniosEscolares tbody').on('click', 'tr', function () {

    IdAnioEscolar = $(this).find('td:first').html();
    Nombre = $(this).find('td:nth-child(2)').html();
    Anio = $(this).find('td:nth-child(3)').html();
    Semanas = $(this).find('td:nth-child(4)').html();
    Descripcion = $(this).find('td:nth-child(5)').html();
    Estado = $(this).find('td:nth-child(6)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //IdAnioEscolar: $("#IdAnioEscolar").val(),
        Nombre: $("#Nombre").val(),
        Anio: $("#Anio").val(),
        Semanas: $("#Semanas").val(),
        Descripcion: $("#Descripcion").val(),
        Estado: $("#Estado").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/AnioEscolar/GuardarAnioEscolar",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Año Escolar Agregado.");
                $('#tblAniosEscolares').DataTable().destroy();
                $('#tblAniosEscolares tbody').empty();
                $.each(result.AniosEscolares, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblAniosEscolares tbody').append("<tr class='even pointer'><td>" + item.IdAnioEscolar + "</td><td>"
                        + item.Nombre + "</td><td>"
                        + item.Anio + "</td><td>"
                        + item.Semanas + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblAniosEscolares').DataTable().destroy();
                $('#tblAniosEscolares tbody').empty();
                $.each(result.AniosEscolares, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblAniosEscolares tbody').append("<tr class='even pointer'><td>" + item.IdAnioEscolar + "</td><td>"
                        + item.Nombre + "</td><td>"
                        + item.Anio + "</td><td>"
                        + item.Semanas + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Año Escolar");
            }
            $('#modalAnioEscolar').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalAnioEscolar').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        IdAnioEscolar: IdAnioEscolar,
        Nombre: $("#Nombre").val(),
        Anio: $("#Anio").val(),
        Semanas: $("#Semanas").val(),
        Descripcion: $("#Descripcion").val(),
        Estado: $("#Estado").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/AnioEscolar/GuardarAnioEscolar",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Año Escolar Actualizado.");
                $('#tblAniosEscolares').DataTable().destroy();
                $('#tblAniosEscolares tbody').empty();
                $.each(result.AniosEscolares, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblAniosEscolares tbody').append("<tr class='even pointer'><td>" + item.IdAnioEscolar + "</td><td>"
                        + item.Nombre + "</td><td>"
                        + item.Anio + "</td><td>"
                        + item.Semanas + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblAniosEscolares').DataTable().destroy();
                $('#tblAniosEscolares tbody').empty();
                $.each(result.AniosEscolares, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblAniosEscolares tbody').append("<tr class='even pointer'><td>" + item.IdAnioEscolar + "</td><td>"
                        + item.Nombre + "</td><td>"
                        + item.Anio + "</td><td>"
                        + item.Semanas + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Año Escolar");
            }
            $('#modalAnioEscolar').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalAnioEscolar').modal('hide');
        }
    });

});


