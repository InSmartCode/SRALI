﻿
$(document).ready(function () {
    $('#tblMaterias').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();
});


function CallBack() {
    $('#tblMaterias').DataTable();

    $('#tblMaterias tbody').on('click', 'tr', function () {

        IdAsignatura = $(this).find('td:first').html();
        IdGrado = $(this).find('td:nth-child(2)').html();
        Descripcion = $(this).find('td:nth-child(3)').html();
        NombreAsignatura = $(this).find('td:nth-child(4)').html();
        Hora = $(this).find('td:nth-child(5)').html();

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
    $("#IdAsignatura").val("");
    $("#sltGrado").val("0");
    $("#Descripcion").val("");
    $("#NombreAsignatura").val("");
    $("#sltHora").val("0");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Materia');
    $('#modalMateria').modal('show');
}

function Editar() {
    if (IdAsignatura == 0 || IdAsignatura == "" || IdAsignatura == "undefined") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        $('#save').prop("hidden", true);
        $('#update').prop("hidden", false);

        $("#IdAsignatura").val(IdAsignatura);
        $("#sltGrado").val(IdGrado);
        $("#Descripcion").val(Descripcion);
        $("#NombreAsignatura").val(NombreAsignatura); 
        $("sltHora").val(Hora);

        $('#modalHeader').html('Actualizar Materia');
        $('#modalMateria').modal('show');
    }
    
}


function Sync() {
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/Syncmaterias",
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



function Eliminar() {

    if (IdAsignatura == 0 || IdAsignatura == "") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar el Materia?",
            function () {

                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Materia/DeleteMateria",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ IdAsignatura: IdAsignatura }),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Materia Eliminado.");
                            $('#tblMaterias').DataTable().destroy();
                            $('#tblMaterias tbody').empty();
                            $.each(result.Materias, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td hidden>"
                                    + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td>"
                                    + item.nombreAsignatura + "</td><td>"
                                    + item.hora + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblMaterias').DataTable().destroy();
                            $('#tblMaterias tbody').empty();
                            $.each(result.Materias, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td hidden>"
                                    + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td>"
                                    + item.nombreAsignatura + "</td><td>"
                                    + item.hora + "</td></tr>");
                            });
                            CallBack();
                            alertify.error("Ha ocurrido un error al Eliminar el Materia, es posible que este asignado a un Materia");
                        }
                        $('#modalMateria').modal('hide');
                        IdAsignatura = "";
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        $('#modalMateria').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}


var IdAsignatura = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMaterias tbody').on('click', 'tr', function () {

    IdAsignatura = $(this).find('td:first').html();
    IdGrado = $(this).find('td:nth-child(2)').html();
    Descripcion = $(this).find('td:nth-child(3)').html();
    NombreAsignatura = $(this).find('td:nth-child(4)').html();
    Hora = $(this).find('td:nth-child(5)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //IdAsignatura: $("#IdAsignatura").val(),
        idGrado: $("#sltGrado").val()
        , nombreAsignatura: $("#NombreAsignatura").val(),
        hora: $("#sltHora").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/AddMateria",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Materia Agregado.");
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.hora + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.hora + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Materia");
            }
            $('#modalMateria').modal('hide');
            IdAsignatura = "";
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMateria').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        idAsignatura: $("#IdAsignatura").val()
        , idGrado: $("#sltGrado").val()
        , nombreAsignatura: $("#NombreAsignatura").val(),
        hora: $("#sltHora").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/UpdateMateria",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Materia Actualizado.");
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.hora + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.hora + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Materia");
            }
            $('#modalMateria').modal('hide');
            IdAsignatura = "";
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMateria').modal('hide');
        }
    });

});





function Import() {
    $('#modalHeaderImp').html('Importar Materias');
    $('#modalImportData').modal('show');
}