$(document).ready(function () {
    $('#tblEventosAnioEscolar').DataTable();

 
    $('#Mes').datetimepicker({
        format: 'MM/YYYY'
    });
    $('#FechaEvento').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#Hora').datetimepicker({
        format: 'LT'
    });

    //pureba desde el repositorio fdf
    limpiarDatos();
});


function CallBack() {
    $('#tblEventosAnioEscolar').DataTable();

    $('#tblEventosAnioEscolar tbody').on('click', 'tr', function () {

        IdEventosAnioEscolar = $(this).find('td:first').html();
        IdAnioEscolar = $(this).find('td:nth-child(2)').html();
        Evento = $(this).find('td:nth-child(3)').html();
        FechaEvento = $(this).find('td:nth-child(4)').html();
        Mes = $(this).find('td:nth-child(5)').html();
        Dia = $(this).find('td:nth-child(6)').html();
        Hora = $(this).find('td:nth-child(7)').html();
        Estado = $(this).find('td:nth-child(8)').html();


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

    $("#Evento").val("");
    $("#Estado").val("");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Eveneto del Año Escolar');
    $('#modalEventoAnioEscolar').modal('show');
}

function Editar() {

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    //$("#id").val(Id);
    $("#FechaEvento").val(FechaEvento);
    $("#Evento").val(Evento);
    $("#Hora").val(Hora);
    $("#Estado").val(Estado);

    $('#modalHeader').html('Actualizar Año Escolar');
    $('#modalEventoAnioEscolar').modal('show');
}



var IdAnioEscolar = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblEventosAnioEscolar tbody').on('click', 'tr', function () {

    IdEventosAnioEscolar = $(this).find('td:first').html();
    IdAnioEscolar = $(this).find('td:nth-child(2)').html();
    Evento = $(this).find('td:nth-child(3)').html();
    FechaEvento = $(this).find('td:nth-child(4)').html();
    Mes = $(this).find('td:nth-child(5)').html();
    Dia = $(this).find('td:nth-child(6)').html();
    Hora = $(this).find('td:nth-child(7)').html();
    Estado = $(this).find('td:nth-child(8)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$('#Mes').on('dp.change', function (e) {
    //alert("Mes");
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/AnioEscolar/GetEventosAnioEscolar",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify({ Fecha: $("#Mes").val(), AnioEscolar: $("#AnioEscolar").val() }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Año Escolar Agregado.");
                $('#tblEventosAnioEscolar').DataTable().destroy();
                $('#tblEventosAnioEscolar tbody').empty();
                $.each(result.EventosAnioEscolar, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.FechaEvento).format('DD/MM/YYYY');
                    $('#tblEventosAnioEscolar tbody').append("<tr class='even pointer'><td>" + item.IdEventosAnioEscolar + "</td><td hidden>"
                        + item.IdAnioEscolar + "</td><td>"
                        + item.Evento + "</td><td>"
                        + fecha + "</td><td hidden>"
                        + item.Mes + "</td><td hidden>"
                        + item.Dia + "</td><td>"
                        + item.Hora + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblEventosAnioEscolar').DataTable().destroy();
                $('#tblEventosAnioEscolar tbody').empty();
                $.each(result.EventosAnioEscolar, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.FechaEvento).format('DD/MM/YYYY');
                    $('#tblEventosAnioEscolar tbody').append("<tr class='even pointer'><td>" + item.IdEventosAnioEscolar + "</td><td hidden>"
                        + item.IdAnioEscolar + "</td><td>"
                        + item.Evento + "</td><td>"
                        + fecha + "</td><td hidden>"
                        + item.Mes + "</td><td hidden>"
                        + item.Dia + "</td><td>"
                        + item.Hora + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Año Escolar");
            }
            $('#modalEventoAnioEscolar').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalEventoAnioEscolar').modal('hide');
        }
    });
});




$("#save").on("click", function () {

    datos = {
        IdAnioEscolar: $("#AnioEscolar").val(),
        Evento: $("#Evento").val(),
        FechaEvento: $("#FechaEvento").val(),
        Mes: 0,
        Dia: 0,
        Hora: $("#Hora").val(),
        Estado: $("#Estado").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/AnioEscolar/GuardarEventoAnioEscolar",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Año Escolar Agregado.");
                $('#tblEventosAnioEscolar').DataTable().destroy();
                $('#tblEventosAnioEscolar tbody').empty();
                $.each(result.EventosAnioEscolar, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.FechaEvento).format('DD/MM/YYYY');
                    $('#tblEventosAnioEscolar tbody').append("<tr class='even pointer'><td>" + item.IdEventosAnioEscolar + "</td><td hidden>"
                        + item.IdAnioEscolar + "</td><td>"
                        + item.Evento + "</td><td>"
                        + fecha + "</td><td hidden>"
                        + item.Mes + "</td><td hidden>"
                        + item.Dia + "</td><td>"
                        + item.Hora + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblEventosAnioEscolar').DataTable().destroy();
                $('#tblEventosAnioEscolar tbody').empty();
                $.each(result.EventosAnioEscolar, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.FechaEvento).format('DD/MM/YYYY');
                    $('#tblEventosAnioEscolar tbody').append("<tr class='even pointer'><td>" + item.IdEventosAnioEscolar + "</td><td hidden>"
                        + item.IdAnioEscolar + "</td><td>"
                        + item.Evento + "</td><td>"
                        + fecha + "</td><td hidden>"
                        + item.Mes + "</td><td hidden>"
                        + item.Dia + "</td><td>"
                        + item.Hora + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Año Escolar");
            }
            $('#modalEventoAnioEscolar').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalEventoAnioEscolar').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        IdEventosAnioEscolar: IdEventosAnioEscolar,
        IdAnioEscolar: IdAnioEscolar,
        Evento: $("#Evento").val(),
        FechaEvento: $("#FechaEvento").val(),
        Mes: Mes,
        Dia: Dia,
        Hora: $("#Hora").val(),
        Estado: $("#Estado").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/AnioEscolar/GuardarEventoAnioEscolar",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Año Escolar Actualizado.");
                $('#tblEventosAnioEscolar').DataTable().destroy();
                $('#tblEventosAnioEscolar tbody').empty();
                $.each(result.EventosAnioEscolar, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.FechaEvento).format('DD/MM/YYYY');
                    $('#tblEventosAnioEscolar tbody').append("<tr class='even pointer'><td>" + item.IdEventosAnioEscolar + "</td><td hidden>"
                        + item.IdAnioEscolar + "</td><td>"
                        + item.Evento + "</td><td>"
                        + fecha + "</td><td hidden>"
                        + item.Mes + "</td><td hidden>"
                        + item.Dia + "</td><td>"
                        + item.Hora + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblEventosAnioEscolar').DataTable().destroy();
                $('#tblEventosAnioEscolar tbody').empty();
                $.each(result.EventosAnioEscolar, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.FechaEvento).format('DD/MM/YYYY');
                    $('#tblEventosAnioEscolar tbody').append("<tr class='even pointer'><td>" + item.IdEventosAnioEscolar + "</td><td hidden>"
                        + item.IdAnioEscolar + "</td><td>"
                        + item.Evento + "</td><td>"
                        + fecha + "</td><td hidden>"
                        + item.Mes + "</td><td hidden>"
                        + item.Dia + "</td><td>"
                        + item.Hora + "</td><td>"
                        + item.Estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Año Escolar");
            }
            $('#modalEventoAnioEscolar').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalEventoAnioEscolar').modal('hide');
        }
    });

});


