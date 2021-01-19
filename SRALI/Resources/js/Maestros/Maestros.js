
$(document).ready(function () {
    $('#tblMaestros').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();
});


function CallBack() {
    $('#tblMaestros').DataTable();

    $('#tblMaestros tbody').on('click', 'tr', function () {

        IdMaestro = $(this).find('td:first').html();
        Nombres = $(this).find('td:nth-child(2)').html();
        Apellidos = $(this).find('td:nth-child(3)').html();
        Titulacion = $(this).find('td:nth-child(4)').html();
        Correo = $(this).find('td:nth-child(5)').html();
        Telefono = $(this).find('td:nth-child(6)').html();
        Dirección = $(this).find('td:nth-child(7)').html();
        NIT = $(this).find('td:nth-child(8)').html();
        DUI = $(this).find('td:nth-child(9)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}
// Sección para el CRUD

function limpiarDatos() {
    $("#IdMaestro").val("");
    $("#Nombres").val("");
    $("#Apellidos").val("");
    $("#Titulacion").val("");
    $("#Correo").val("");
    $("#Telefono").val("");
    $("#Dirección").val("");
    $("#DUI").val("");
    $("#NIT").val("");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Maestro');
    $('#modalMaestro').modal('show');
}

function Editar() {

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#IdMaestro").val(IdMaestro);
    $("#Nombres").val(Nombres);
    $("#Apellidos").val(Apellidos);
    $("#Titulacion").val(Titulacion);
    $("#Correo").val(Correo);
    $("#Telefono").val(Telefono);
    $("#Dirección").val(Dirección);
    $("#DUI").val(DUI);
    $("#NIT").val(NIT);

    $('#modalHeader').html('Actualizar Maestro');
    $('#modalMaestro').modal('show');
}






function Eliminar() {

    if (IdMaestro == 0 || IdMaestro == "") {
        alertify.error("Debe de seleccionar un Maestro");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar el Maestro?",
            function () {

                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Maestro/DeleteMaestro",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ idMaestro: IdMaestro }),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Maestro Eliminado.");
                            $('#tblMaestros').DataTable().destroy();
                            $('#tblMaestros tbody').empty();
                            $.each(result.Maestros, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMaestros tbody').append("<tr class='even pointer'><td>" + item.idMaestro + "</td><td>"
                                    + item.nombres + "</td><td>"
                                    + item.apellidos + "</td><td>"
                                    + item.titulacion + "</td><td>"
                                    + item.correo + "</td><td>"
                                    + item.telefono + "</td><td>"
                                    + item.dirección + "</td><td>"
                                    + item.nit + "</td><td>"
                                    + item.dui + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblMaestros').DataTable().destroy();
                            $('#tblMaestros tbody').empty();
                            $.each(result.Maestros, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMaestros tbody').append("<tr class='even pointer'><td>" + item.idMaestro + "</td><td>"
                                    + item.nombres + "</td><td>"
                                    + item.apellidos + "</td><td>"
                                    + item.titulacion + "</td><td>"
                                    + item.correo + "</td><td>"
                                    + item.telefono + "</td><td>"
                                    + item.dirección + "</td><td>"
                                    + item.nit + "</td><td>"
                                    + item.dui + "</td></tr>");
                            });
                            CallBack();
                            alertify.error("Ha ocurrido un error al Eliminar el Maestro, es posible que este asignado a un Maestro");
                        }
                        $('#modalMaestro').modal('hide');
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        $('#modalMaestro').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}


var IdMaestro = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMaestros tbody').on('click', 'tr', function () {

    IdMaestro = $(this).find('td:first').html();
    Nombres = $(this).find('td:nth-child(2)').html();
    Apellidos = $(this).find('td:nth-child(3)').html();
    Titulacion = $(this).find('td:nth-child(4)').html();
    Correo = $(this).find('td:nth-child(5)').html();
    Telefono = $(this).find('td:nth-child(6)').html();
    Dirección = $(this).find('td:nth-child(7)').html();
    NIT = $(this).find('td:nth-child(8)').html();
    DUI = $(this).find('td:nth-child(9)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //idMaestro: $("#IdMaestro").val(),
        nombres: $("#Nombres").val()
        , apellidos: $("#Apellidos").val()
        , titulacion: $("#Titulacion").val()
        , correo: $("#Correo").val()
        , telefono: $("#Telefono").val()
        , dirección: $("#Dirección").val()
        , nit: $("#NIT").val()
        , dui: $("#DUI").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Maestro/AddMaestro",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Maestro Agregado.");
                $('#tblMaestros').DataTable().destroy();
                $('#tblMaestros tbody').empty();
                $.each(result.Maestros, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaestros tbody').append("<tr class='even pointer'><td>" + item.idMaestro + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.titulacion + "</td><td>"
                        + item.correo + "</td><td>"
                        + item.telefono + "</td><td>"
                        + item.dirección + "</td><td>"
                        + item.nit + "</td><td>"
                        + item.dui + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMaestros').DataTable().destroy();
                $('#tblMaestros tbody').empty();
                $.each(result.Maestros, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblMaestros tbody').append("<tr class='even pointer'><td>" + item.idMaestro + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.titulacion + "</td><td>"
                        + item.correo + "</td><td>"
                        + item.telefono + "</td><td>"
                        + item.dirección + "</td><td>"
                        + item.nit + "</td><td>"
                        + item.dui + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Maestro");
            }
            $('#modalMaestro').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMaestro').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        idMaestro: $("#IdMaestro").val()
        , nombres: $("#Nombres").val()
        , apellidos: $("#Apellidos").val()
        , titulacion: $("#Titulacion").val()
        , correo: $("#Correo").val()
        , telefono: $("#Telefono").val()
        , dirección: $("#Dirección").val()
        , nit: $("#NIT").val()
        , dui: $("#DUI").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Maestro/UpdateMaestro",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Maestro Actualizado.");
                $('#tblMaestros').DataTable().destroy();
                $('#tblMaestros tbody').empty();
                $.each(result.Maestros, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaestros tbody').append("<tr class='even pointer'><td>" + item.idMaestro + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.titulacion + "</td><td>"
                        + item.correo + "</td><td>"
                        + item.telefono + "</td><td>"
                        + item.dirección + "</td><td>"
                        + item.nit + "</td><td>"
                        + item.dui + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMaestros').DataTable().destroy();
                $('#tblMaestros tbody').empty();
                $.each(result.Maestros, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaestros tbody').append("<tr class='even pointer'><td>" + item.idMaestro + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.titulacion + "</td><td>"
                        + item.correo + "</td><td>"
                        + item.telefono + "</td><td>"
                        + item.dirección + "</td><td>"
                        + item.nit + "</td><td>"
                        + item.dui + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Maestro");
            }
            $('#modalMaestro').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMaestro').modal('hide');
        }
    });

});




