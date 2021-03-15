$(document).ready(function () {
    $('#tblGrados').DataTable();
    $('#tblMaterias').DataTable();

    $("#Grado").val("0");
    //limpiarDatos();
});

function CallBack() {
    $('#tblMaterias').DataTable();

    $('#tblMaterias tbody').on('click', 'tr', function () {

        IdAsignatura = $(this).find('td:first').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnEdit').prop("disabled", false);
    });
}


$('#Fecha').datetimepicker({
    format: 'DD/MM/YYYY'
});


$('#tblGrados tbody').on('click', 'tr', function () {

    CodGrado = $(this).find('td:first').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    if (CodGrado == "" || CodGrado == null || CodGrado == "No data available in table") {
        alertify.error("No existen Grados para continuar");
    } else {
        getMaterias();
    }
});

function getMaterias() {

    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Evaluaciones/GetAsignaturaPorGrado",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify({ IdGrado: CodGrado }),
        success: function (result) {
            if (result.Res) {
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Asigaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                        + item.descripcion + " - " + item.nivelEscolar + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.hora + "</td></tr>");
                });
                CallBack();
                alertify.success("Materias Obtenias");
            } else {
                alertify.error("Ha ocurrido un error al obtener las Materias");
            }
            $('#modalEvaluaciones').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalEvaluaciones').modal('hide');
        }
    });
}


function Nuevo() {
    if ($("#Estudiante").val() != "0") {
        if (IdAsignatura != "") {
            $('#save').prop("hidden", false);
            $('#update').prop("hidden", true);

            $("#NumEvaluacion").val("");
            $("#Descripcion").val("");
            $("#Porcentaje").val("");

            $('#modalHeader').html('Nueva Evaluacion');
            $('#modalEvaluacion').modal('show');
        } else {
            alertify.error("Debe de seleccionar un Expediente");
        }

    } else {
        alertify.error("Debe de seleccionar una Materia");
    }

}


function Editar() {
    if (IdEvaluacion == "" || IdEvaluacion == null || IdEvaluacion == "No data available in table") {

        alertify.error("Seleccione una Evaluación para continuar");
        return;
    }

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#NumEvaluacion").val(NumEvaluacion);
    $("#Descripcion").val(Descripcion);
    $("#Porcentaje").val(Porcentaje);

    $('#modalHeader').html('Actualizar Evaluacion');
    $('#modalEvaluacion').modal('show');
}


var IdAsignatura = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMaterias tbody').on('click', 'tr', function () {

    IdAsignatura = $(this).find('td:first').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //    $('#btnEdit').prop("disabled", false);
    if (IdAsignatura == "" || IdAsignatura == null || IdAsignatura == "No data available in table") {
        alertify.error("No existen Matriculas para continuar");
    } else {
        $.ajax({
            type: "POST",
            traditional: true,//con el formDate este se comenta
            url: "/Evaluaciones/GetEvaluacionPorMateria",
            contentType: "application/json; charset=utf-8",//con el formDate este se comenta
            data: JSON.stringify({ idAsignatura: IdAsignatura }),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Evaluacion Agregada.");
                    $('#tblEvaluaciones').DataTable().destroy();
                    $('#tblEvaluaciones tbody').empty();
                    $.each(result.Evaluacions, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblEvaluaciones tbody').append("<tr class='even pointer'><td>" + item.IdEvaluacion + "</td><td>"
                            + item.NumEvaluacion + "</td><td>"
                            + item.Descripcion + "</td><td>"
                            + item.Porcentaje + "</td></tr>");
                    });
                } else {
                    $('#tblEvaluaciones').DataTable().destroy();
                    $('#tblEvaluaciones tbody').empty();
                    $.each(result.Evaluacions, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        $('#tblEvaluaciones tbody').append("<tr class='even pointer'><td>" + item.IdEvaluacion + "</td><td>"
                            + item.NumEvaluacion + "</td><td>"
                            + item.Descripcion + "</td><td>"
                            + item.Porcentaje + "</td></tr>");
                    });
                    alertify.error("Ha ocurrido un error al agregar la Evaluacion");
                }
                $('#modalEvaluacion').modal('hide');
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
                $('#modalEvaluacion').modal('hide');
            }
        });
    }
});


$('#tblEvaluaciones tbody').on('click', 'tr', function () {

    IdEvaluacion = $(this).find('td:first').html();
    NumEvaluacion = $(this).find('td:nth-child(2)').html();
    Descripcion = $(this).find('td:nth-child(3)').html();
    Porcentaje = $(this).find('td:nth-child(4)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);

});


$("#save").on("click", function () {

    datos = {
        idAsignatura: IdAsignatura
        , NumEvaluacion: $("#NumEvaluacion").val()
        , Descripcion: $("#Descripcion").val()
        , Porcentaje: $("#Porcentaje").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Evaluaciones/AddEvaluacion",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Evaluacion Agregada.");
                $('#tblEvaluaciones').DataTable().destroy();
                $('#tblEvaluaciones tbody').empty();
                $.each(result.Evaluacions, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblEvaluaciones tbody').append("<tr class='even pointer'><td>" + item.IdEvaluacion + "</td><td>"
                        + item.NumEvaluacion + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Porcentaje + "</td></tr>");
                });
            } else {
                $('#tblEvaluaciones').DataTable().destroy();
                $('#tblEvaluaciones tbody').empty();
                $.each(result.Evaluacions, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblEvaluaciones tbody').append("<tr class='even pointer'><td>" + item.IdEvaluacion + "</td><td>"
                        + item.NumEvaluacion + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Porcentaje + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar la Evaluacion");
            }
            $('#modalEvaluacion').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalEvaluacion').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        IdEvaluacion: IdEvaluacion
        , idAsignatura: IdAsignatura
        , NumEvaluacion: $("#NumEvaluacion").val()
        , Descripcion: $("#Descripcion").val()
        , Porcentaje: $("#Porcentaje").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Evaluaciones/AddEvaluacion",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Evaluacion Actualizada.");
                $('#tblEvaluaciones').DataTable().destroy();
                $('#tblEvaluaciones tbody').empty();
                $.each(result.Evaluacions, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblEvaluaciones tbody').append("<tr class='even pointer'><td>" + item.IdEvaluacion + "</td><td>"
                        + item.NumEvaluacion + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Porcentaje + "</td></tr>");
                });
            } else {
                $('#tblEvaluaciones').DataTable().destroy();
                $('#tblEvaluaciones tbody').empty();
                $.each(result.Evaluacions, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblEvaluaciones tbody').append("<tr class='even pointer'><td>" + item.IdEvaluacion + "</td><td>"
                        + item.NumEvaluacion + "</td><td>"
                        + item.Descripcion + "</td><td>"
                        + item.Porcentaje + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar la Evaluacion");
            }
            $('#modalEvaluacion').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalEvaluacion').modal('hide');
        }
    });

});