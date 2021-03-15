
$(document).ready(function () {
    $('#tblMaestros').DataTable();
    $('#tblMateriasPorMaestro').DataTable();

    $('#anio').datetimepicker({
        format: 'YYYY'
    });

    //pureba desde el repositorio fdf
    $('#btnDel').prop("disabled", true);
    $('#btnEdit').prop("disabled", true);
    $('#btnNew').prop("disabled", true);
    $("#sltMaestros").val("0");
});

function CallBack() {
    $('#tblMateriasPorMaestro').DataTable();

    $('#tblMateriasPorMaestro tbody').on('click', 'tr', function () {

        IdMateriaPorMaestro = $(this).find('td:first').html();
        IdGrado = $(this).find('td:nth-child(2)').html();
        Descripcion = $(this).find('td:nth-child(3)').html();
        IdAsignatura = $(this).find('td:nth-child(4)').html();
        NombreAsignatura = $(this).find('td:nth-child(5)').html();
        Anio = $(this).find('td:nth-child(6)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnDel').prop("disabled", false);
        $('#btnEdit').prop("disabled", false);
        $('#btnNew').prop("disabled", false);
    });
}

var IdMaestro = 0;
var IdAsignatura = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMateriasPorMaestro tbody').on('click', 'tr', function () {

    IdMateriaPorMaestro = $(this).find('td:first').html();
    IdGrado = $(this).find('td:nth-child(2)').html();
    Descripcion = $(this).find('td:nth-child(3)').html();
    IdAsignatura = $(this).find('td:nth-child(4)').html();
    NombreAsignatura = $(this).find('td:nth-child(5)').html();
    Anio = $(this).find('td:nth-child(6)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    if (IdMateriaPorMaestro == "" || IdMateriaPorMaestro == null || IdMateriaPorMaestro == "No data available in table") {
        alertify.error("No existen Materias para continuar");
    } else {
        $('#btnDel').prop("disabled", false);
        $('#btnEdit').prop("disabled", false);
        $('#btnNew').prop("disabled", false);
    }
});

$('#tblMatriculas tbody').on('click', 'tr', function () {

    IdExpediente = $(this).find('td:first').html();
    IdAlumno = $(this).find('td:nth-child(2)').html();
    IdGrado = $(this).find('td:nth-child(4)').html();
    AnioEscolar = $(this).find('td:nth-child(6)').html();
    TipoIngreso = $(this).find('td:nth-child(7)').html();
    Turno = $(this).find('td:nth-child(9)').html();
    Monto = $(this).find('td:nth-child(11)').html();
    Colegiaturas = $(this).find('td:nth-child(12)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});

$('#tblMaestros tbody').on('click', 'tr', function () {

    IdMaestro = $(this).find('td:first').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    if (IdMaestro == "" || IdMaestro == null || IdMaestro == "No data available in table") {
        alertify.error("No existen Maestros para continuar");
    } else {
        getMaterias();
    }
});

function getMaterias() {
    //IdMaestro = $("#sltMaestros").val();
    $('#btnNew').prop("disabled", false);

    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/GetMateriaPorMaestro",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify({ IdMaestro: IdMaestro }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Materia Agregado.");
                $('#tblMateriasPorMaestro').DataTable().destroy();
                $('#tblMateriasPorMaestro tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.idAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.anio + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMateriasPorMaestro').DataTable().destroy();
                $('#tblMateriasPorMaestro tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.idAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.anio + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Materia");
            }
            //$('#modalMateria').modal('hide');
            IdAsignatura = "";
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            //$('#modalMateria').modal('hide');
        }
    });

}


function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);


    $("#sltMaestros").val("0");

    $('#modalHeader').html('Agregar Materia');
    $('#modalAddMateriaXMaestro').modal('show');
}


function Editar() {
    if (IdAsignatura == 0 || IdAsignatura == "" || IdAsignatura == "undefined" || IdAsignatura == "No data available in table") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        $('#save').prop("hidden", true);
        $('#update').prop("hidden", false);

        $("#sltMateria").val(IdAsignatura);
        $("#anio").val(Anio);

        $('#modalHeader').html('Actualizar Materia');
        $('#modalAddMateriaXMaestro').modal('show');
    }

}



$("#save").on("click", function () {
    if ($("#sltMateria").val() == "0") {
        alertify.error("Seleccione una Materia para continuar");

    } else {
        datos = {
            idUsuario: IdMaestro,
            idAsignatura: $("#sltMateria").val(),
            idGrado: $("#sltGrado").val(),
            anio: $("#anio").val()
        }
        $.ajax({
            type: "POST",
            traditional: true,//con el formDate este se comenta
            url: "/Materia/AddMateriaPorMaestro",
            contentType: "application/json; charset=utf-8",//con el formDate este se comenta
            data: JSON.stringify(datos),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Materia Agregado.");
                    $('#tblMateriasPorMaestro').DataTable().destroy();
                    $('#tblMateriasPorMaestro tbody').empty();
                    $.each(result.Materias, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                            + item.idGrado + "</td><td>"
                            + item.descripcion + "</td><td hidden>"
                            + item.idAsignatura + "</td><td>"
                            + item.nombreAsignatura + "</td><td>"
                            + item.anio + "</td></tr>");
                    });
                    CallBack();
                } else {
                    $('#tblMateriasPorMaestro').DataTable().destroy();
                    $('#tblMateriasPorMaestro tbody').empty();
                    $.each(result.Materias, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                            + item.idGrado + "</td><td>"
                            + item.descripcion + "</td><td hidden>"
                            + item.idAsignatura + "</td><td>"
                            + item.nombreAsignatura + "</td><td>"
                            + item.anio + "</td></tr>");
                    });
                    CallBack();
                    alertify.error("Ha ocurrido un error al agregar el Materia");
                }
                $('#modalAddMateriaXMaestro').modal('hide');
                IdAsignatura = "";
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
                $('#modalAddMateriaXMaestro').modal('hide');
            }
        });
    }

  
});


$("#update").on("click", function () {
    if ($("#sltMateria").val() == "0") {
        alertify.error("Seleccione una Materia para continuar");

    } else {
        datos = {
            idMateriaPorMaestro: IdMateriaPorMaestro,
            idUsuario: IdMaestro,
            idAsignatura: $("#sltMateria").val(),
            idGrado: $("#sltGrado").val(),
            anio: $("#anio").val()
        }
        $.ajax({
            type: "POST",
            traditional: true,//con el formDate este se comenta
            url: "/Materia/UpdateMateriaPorMaestro",
            contentType: "application/json; charset=utf-8",//con el formDate este se comenta
            data: JSON.stringify(datos),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Materia Agregado.");
                    $('#tblMateriasPorMaestro').DataTable().destroy();
                    $('#tblMateriasPorMaestro tbody').empty();
                    $.each(result.Materias, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                            + item.idGrado + "</td><td>"
                            + item.descripcion + "</td><td hidden>"
                            + item.idAsignatura + "</td><td>"
                            + item.nombreAsignatura + "</td><td>"
                            + item.anio + "</td></tr>");
                    });
                    CallBack();
                } else {
                    $('#tblMateriasPorMaestro').DataTable().destroy();
                    $('#tblMateriasPorMaestro tbody').empty();
                    $.each(result.Materias, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                            + item.idGrado + "</td><td>"
                            + item.descripcion + "</td><td hidden>"
                            + item.idAsignatura + "</td><td>"
                            + item.nombreAsignatura + "</td><td>"
                            + item.anio + "</td></tr>");
                    });
                    CallBack();
                    alertify.error("Ha ocurrido un error al agregar el Materia");
                }
                $('#modalAddMateriaXMaestro').modal('hide');
                IdAsignatura = "";
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
                $('#modalAddMateriaXMaestro').modal('hide');
            }
        });
    }


});


function Eliminar() {

    if (IdMateriaPorMaestro == 0 || IdMateriaPorMaestro == "") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar la Materia?",
            function () {

                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Materia/DeleteMateriaPorMaestro",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ idMateriaPorMaestro: IdMateriaPorMaestro, IdMaestro: IdMaestro}),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Materia Eliminado.");
                            $('#tblMateriasPorMaestro').DataTable().destroy();
                            $('#tblMateriasPorMaestro tbody').empty();
                            $.each(result.Materias, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                                    + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td hidden>"
                                    + item.idAsignatura + "</td><td>"
                                    + item.nombreAsignatura + "</td><td>"
                                    + item.anio + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblMateriasPorMaestro').DataTable().destroy();
                            $('#tblMateriasPorMaestro tbody').empty();
                            $.each(result.Materias, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMateriasPorMaestro tbody').append("<tr class='even pointer'><td>" + item.idMateriaPorMaestro + "</td><td hidden>"
                                    + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td hidden>"
                                    + item.idAsignatura + "</td><td>"
                                    + item.nombreAsignatura + "</td><td>"
                                    + item.anio + "</td></tr>");
                            });
                            CallBack();
                            alertify.error("Ha ocurrido un error al Eliminar la Materia, es posible que este asignado a un Materia");
                        }
                        $('#modalAddMateriaXMaestro').modal('hide');
                        IdAsignatura = "";
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        $('#modalAddMateriaXMaestro').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}