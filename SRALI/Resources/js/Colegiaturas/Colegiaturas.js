$(document).ready(function () {
    $('#tblAlumnos').DataTable();
    $('#tblMatriculas').DataTable();

    $("#Estudiante").val("0");
    //limpiarDatos();
});

function CallBack() {
    $('#tblMatriculas').DataTable();

    $('#tblMatriculas tbody').on('click', 'tr', function () {

        IdExpediente = $(this).find('td:first').html();

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



$('#tblAlumnos tbody').on('click', 'tr', function () {

    CodAlumno = $(this).find('td:first').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    if (CodAlumno == "" || CodAlumno == null || CodAlumno == "No data available in table") {
        alertify.error("No existen Alumnos para continuar");
    } else {
        getExpediente();
    }
});

function getExpediente() {
    if (CodAlumno == "" || CodAlumno == null || CodAlumno == "No data available in table") {

        alertify.error("Seleccione un Alumno para continuar");
        return;
    }

    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Matricula/GetExpedientePorAlumno",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify({ idAlumno: CodAlumno }),
        success: function (result) {
            if (result.Res) {
                $('#tblMatriculas').DataTable().destroy();
                $('#tblMatriculas tbody').empty();
                $.each(result.Expedientes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var TI = "";
                    switch (item.TipoIngreso) {
                        case "0":
                            TI = "";
                            break;
                        case "1":
                            TI = "Nuevo Ingreso";
                            break;
                        case "2":
                            TI = "Antiguo Ingreso";
                            break;
                    }
                    var T = "";
                    switch (item.Turno) {
                        case "0":
                            T = "";
                            break;
                        case "1":
                            T = "Matutino";
                            break;
                        case "2":
                            T = "Vespertino";
                            break;
                        case "3":
                            T = "Nocturno";
                            break;
                    }
                    $('#tblMatriculas tbody').append("<tr class='even pointer'><td>" + item.idExpediente + "</td><td hidden>"
                        + item.Nombre + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.AnioEscolar + "</td><td hidden>"
                        + TI + "</td><td>"
                        + T + "</td><td hidden>"
                        + item.Monto + "</td></tr>");
                });
                CallBack();
                alertify.success("Colegiaturas Obtenidas.");
            } else {
                alertify.error("Ha ocurrido un error al obtener las Matriculas");
            }
            $('#modalMatricula').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMatricula').modal('hide');
        }
    });
}


function Nuevo() {
    if ($("#Estudiante").val() != "0") {
        if (IdExpediente!="") {
            $('#save').prop("hidden", false);
            $('#update').prop("hidden", true);

            $("#Num").val("");
            $("#Fecha").val("");
            $("#Monto").val("");

            $('#modalHeader').html('Nuevo Pago de Colegiatura');
            $('#modalColegiatura').modal('show');
        } else {
            alertify.error("Debe de seleccionar un Expediente");
        }
       
    } else {
        alertify.error("Debe de seleccionar un Estuduante");
    }

}

var IdColegiatura = "";
var Num = "";
var Fecha = "";
var Monto = "";

function Editar() {
    if (IdColegiatura == "" || IdColegiatura == null || IdColegiatura == "No data available in table") {
        alertify.error("Seleccione una Matricula para continuar");
        return;
    }
    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#Num").val(Num);
    $("#Fecha").val(Fecha);
    $("#Monto").val(Monto);

    $('#modalHeader').html('Actualizar Grado');
    $('#modalColegiatura').modal('show');
}


var IdExpediente = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMatriculas tbody').on('click', 'tr', function () {

    IdExpediente = $(this).find('td:first').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

//    $('#btnEdit').prop("disabled", false);
    if (IdExpediente == "" || IdExpediente == null || IdExpediente == "No data available in table") {
        alertify.error("No existen Matriculas para continuar");
    } else {

        $.ajax({
            type: "POST",
            traditional: true,//con el formDate este se comenta
            url: "/Colegiatura/GetColegiaturaPorExpediente",
            contentType: "application/json; charset=utf-8",//con el formDate este se comenta
            data: JSON.stringify({ idExpediente: IdExpediente }),
            success: function (result) {
                if (result.Res) {
                    alertify.success("Colegiaturas Obtenidas.");
                    $('#tblColegiaturas').DataTable().destroy();
                    $('#tblColegiaturas tbody').empty();
                    $.each(result.Colegiaturas, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        var fecha = moment(item.Fecha).format('DD/MM/YYYY');
                        $('#tblColegiaturas tbody').append("<tr class='even pointer'><td>" + item.IdColegiatura + "</td><td>"
                            + item.Num + "</td><td>"
                            + fecha + "</td><td>"
                            + item.Monto + "</td></tr>");
                    });
                } else {
                    $('#tblColegiaturas').DataTable().destroy();
                    $('#tblColegiaturas tbody').empty();
                    $.each(result.Colegiaturas, function (i, item) {
                        /* Vamos agregando a nuestra tabla las filas necesarias */
                        var fecha = moment(item.Fecha).format('DD/MM/YYYY');
                        $('#tblColegiaturas tbody').append("<tr class='even pointer'><td>" + item.IdColegiatura + "</td><td>"
                            + item.Num + "</td><td>"
                            + fecha + "</td><td>"
                            + item.Monto + "</td></tr>");
                    });
                    alertify.error("Ha ocurrido un error al obtener las Colegiaturas");
                }
                $('#modalColegiatura').modal('hide');
            },
            error: function () {
                alertify.error("Ha ocurrido un error");
                $('#modalColegiatura').modal('hide');
            }
        });
    }
});


$('#tblColegiaturas tbody').on('click', 'tr', function () {

    IdColegiatura = $(this).find('td:first').html();
    Num = $(this).find('td:nth-child(2)').html();
    Fecha = $(this).find('td:nth-child(3)').html();
    Monto = $(this).find('td:nth-child(4)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);

});


$("#save").on("click", function () {

    datos = {
        idExpediente: IdExpediente
        , Num: $("#Num").val()
        , Fecha: $("#Fecha").val()
        , Monto: $("#Monto").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Colegiatura/AddColegiatura",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Colegiatura Agregada.");
                $('#tblColegiaturas').DataTable().destroy();
                $('#tblColegiaturas tbody').empty();
                $.each(result.Colegiaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.Fecha).format('DD/MM/YYYY');
                    $('#tblColegiaturas tbody').append("<tr class='even pointer'><td>" + item.IdColegiatura + "</td><td>"
                        + item.Num + "</td><td>"
                        + fecha + "</td><td>"
                        + item.Monto + "</td></tr>");
                });
            } else {
                $('#tblColegiaturas').DataTable().destroy();
                $('#tblColegiaturas tbody').empty();
                $.each(result.Colegiaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.Fecha).format('DD/MM/YYYY');
                    $('#tblColegiaturas tbody').append("<tr class='even pointer'><td>" + item.IdColegiatura + "</td><td>"
                        + item.Num + "</td><td>"
                        + fecha + "</td><td>"
                        + item.Monto + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar la Colegiatura");
            }
            $('#modalColegiatura').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalColegiatura').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        IdColegiatura: IdColegiatura
        , idExpediente: IdExpediente
        , Num: $("#Num").val()
        , Fecha: $("#Fecha").val()
        , Monto: $("#Monto").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Colegiatura/AddColegiatura",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Colegiatura Actualizada.");
                $('#tblColegiaturas').DataTable().destroy();
                $('#tblColegiaturas tbody').empty();
                $.each(result.Colegiaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.Fecha).format('DD/MM/YYYY');
                    $('#tblColegiaturas tbody').append("<tr class='even pointer'><td>" + item.IdColegiatura + "</td><td>"
                        + item.Num + "</td><td>"
                        + fecha + "</td><td>"
                        + item.Monto + "</td></tr>");
                });
            } else {
                $('#tblColegiaturas').DataTable().destroy();
                $('#tblColegiaturas tbody').empty();
                $.each(result.Colegiaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fecha = moment(item.Fecha).format('DD/MM/YYYY');
                    $('#tblColegiaturas tbody').append("<tr class='even pointer'><td>" + item.IdColegiatura + "</td><td>"
                        + item.Num + "</td><td>"
                        + fecha + "</td><td>"
                        + item.Monto + "</td></tr>");
                });
                alertify.error("Ha ocurrido un error al agregar la Colegiatura");
            }
            $('#modalColegiatura').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalColegiatura').modal('hide');
        }
    });

});