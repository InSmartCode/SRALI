﻿
$(document).ready(function () {
    $('#tblGrados').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();
});

function Import() {
    $('#modalHeaderImp').html('Importar Grados');
    $('#modalImportData').modal('show');
}

function Sync() {
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Grado/SyncGrados",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        //data: JSON.stringify(datos),

        //contentType: false, //importante enviar este parametro en false
        //processData: false,
        //data: formData,
        success: function (result) {
            if (result.Res) {
                alertify.success("Sincronización Realizada con Éxito");
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(result.Grados, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nivelEscolar + "</td><td>"
                        + item.Capacidad + "</td><td>"
                        + item.Vacantes + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(result.Grados, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nivelEscolar + "</td><td>"
                        + item.Capacidad + "</td><td>"
                        + item.Vacantes + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al sincronizar");
            }
            $('.nav-tabs a[href="#home"]').tab('show');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });
}

function CallBack() {
    $('#tblGrados').DataTable();

    $('#tblGrados tbody').on('click', 'tr', function () {

        IdGrado = $(this).find('td:first').html();
        Descripcion = $(this).find('td:nth-child(2)').html();
        NivelEscolar = $(this).find('td:nth-child(3)').html();
        Capacidad = $(this).find('td:nth-child(4)').html();
        Vacantes = $(this).find('td:nth-child(5)').html();

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
    $("#IdGrado").val("");
    $("#Descripcion").val("");
    $("#NivelEscolar").val("");
    $("#Capacidad").val("");
    $("#Vacantes").val("");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Grado');
    $('#modalGrado').modal('show');
}

function Editar() {

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#IdGrado").val(IdGrado);
    $("#Descripcion").val(Descripcion);
    $("#NivelEscolar").val(NivelEscolar);
    $("#Capacidad").val(Capacidad)
    $("#Vacantes").val(Vacantes)

    $('#modalHeader').html('Actualizar Grado');
    $('#modalGrado').modal('show');
}






function Eliminar() {

    if (IdGrado == 0 || IdGrado == "") {
        alertify.error("Debe de seleccionar un Grado");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar el Grado?",
            function () {

                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Grado/DeleteGrado",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ idGrado: IdGrado }),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Grado Eliminado.");
                            $('#tblGrados').DataTable().destroy();
                            $('#tblGrados tbody').empty();
                            $.each(result.Grados, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td>"
                                    + item.nivelEscolar + "</td><td>"
                                    + item.Capacidad + "</td><td>"
                                    + item.Vacantes + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblGrados').DataTable().destroy();
                            $('#tblGrados tbody').empty();
                            $.each(result.Grados, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td>"
                                    + item.nivelEscolar + "</td><td>"
                                    + item.Capacidad + "</td><td>"
                                    + item.Vacantes + "</td></tr>");
                            });
                            CallBack();
                            alertify.error("Ha ocurrido un error al Eliminar el Grado, es posible que este asignado a un Grado");
                        }
                        $('#modalGrado').modal('hide');
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        $('#modalGrado').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}


var IdGrado = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblGrados tbody').on('click', 'tr', function () {

    IdGrado = $(this).find('td:first').html();
    Descripcion = $(this).find('td:nth-child(2)').html();
    NivelEscolar = $(this).find('td:nth-child(3)').html();
    Capacidad = $(this).find('td:nth-child(4)').html();
    Vacantes = $(this).find('td:nth-child(5)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //idGrado: $("#IdGrado").val(),
        descripcion: $("#Descripcion").val()
        , nivelEscolar: $("#NivelEscolar").val()
        , Capacidad: $("#Capacidad").val()
        , Vacantes: $("#Vacantes").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Grado/AddGrado",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Grado Agregado.");
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(result.Grados, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nivelEscolar + "</td><td>"
                        + item.Capacidad + "</td><td>"
                        + item.Vacantes + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(result.Grados, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nivelEscolar + "</td><td>"
                        + item.Capacidad + "</td><td>"
                        + item.Vacantes + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Grado");
            }
            $('#modalGrado').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalGrado').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        idGrado: $("#IdGrado").val()
        , descripcion: $("#Descripcion").val()
        , nivelEscolar: $("#NivelEscolar").val()
        , Capacidad: $("#Capacidad").val()
        , Vacantes: $("#Vacantes").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Grado/UpdateGrado",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Grado Actualizado.");
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(result.Grados, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nivelEscolar + "</td><td>"
                        + item.Capacidad + "</td><td>"
                        + item.Vacantes + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(result.Grados, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblGrados tbody').append("<tr class='even pointer'><td>" + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nivelEscolar + "</td><td>"
                        + item.Capacidad + "</td><td>"
                        + item.Vacantes + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Grado");
            }
            $('#modalGrado').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalGrado').modal('hide');
        }
    });

});




