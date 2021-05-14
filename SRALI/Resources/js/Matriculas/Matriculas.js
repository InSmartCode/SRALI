$(document).ready(function () {
    $('#tblAlumnos').DataTable();
    $('#tblMatriculas').DataTable();

    $("#Estudiante").val("0");
    limpiarDatos();
});

function CallBack() {
    $('#tblMatriculas').DataTable();

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
}

function limpiarDatos() {
    $("#Grado").val("0");
    $("#AnioEscolar").val("");
    $("#TipoIngreso").val("0");
    $("#Turno").val("0");
    $("#Monto").val("");
    $("#Colegiaturas").val("");
}

var CodAlumno = "";
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

function Nuevo() {
    if (CodAlumno == "0" || CodAlumno == "" || CodAlumno == null) {
        alertify.error("Debe de seleccionar un Estuduante");
    } else {
        $('#save').prop("hidden", false);
        $('#update').prop("hidden", true);

        limpiarDatos();

        $('#modalHeader').html('Nueva Matricula');
        $('#modalMatricula').modal('show');
    }
   
}


function Editar() {
    if (IdAsignatura == 0 || IdAsignatura == "" || IdAsignatura == "undefined" || IdAsignatura == "No data available in table") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        $('#save').prop("hidden", true);
        $('#update').prop("hidden", false);

        $("#Grado").val(IdGrado);
        $("#AnioEscolar").val(AnioEscolar);
        $("#TipoIngreso").val(TipoIngreso);
        $("#Turno").val(Turno);
        $("#Monto").val(Monto);
        $("#Colegiaturas").val(Colegiaturas);

        $('#modalHeader').html('Actualizar Grado');
        $('#modalMatricula').modal('show');
    }
    
}






function Eliminar() {

    if (IdGrado == 0 || IdGrado == "") {
        alertify.error("Debe de seleccionar una Matricula");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar la Matricula?",
            function () {

                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Matricula/DeleteGrado",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ idGrado: IdGrado }),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Grado Eliminado.");
                            $('#tblMatriculas').DataTable().destroy();
                            $('#tblMatriculas tbody').empty();
                            $.each(result.Expedientes, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMatriculas tbody').append("<tr class='even pointer'><td>" + item.idExpediente + "</td><td>"
                                    + item.idAlumno + "</td><td>"
                                    + item.Nombre + "</td><td>"
                                    + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td>"
                                    + item.AnioEscolar + "</td><td>"
                                    + item.TipoIngreso + "</td><td>"
                                    + item.Turno + "</td><td>"
                                    + item.Monto + "</td><td>"
                                    + item.Colegiaturas + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblMatriculas').DataTable().destroy();
                            $('#tblMatriculas tbody').empty();
                            $.each(result.Expedientes, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMatriculas tbody').append("<tr class='even pointer'><td>" + item.idExpediente + "</td><td>"
                                    + item.idAlumno + "</td><td>"
                                    + item.Nombre + "</td><td>"
                                    + item.idGrado + "</td><td>"
                                    + item.descripcion + "</td><td>"
                                    + item.AnioEscolar + "</td><td>"
                                    + item.TipoIngreso + "</td><td>"
                                    + item.Turno + "</td><td>"
                                    + item.Monto + "</td><td>"
                                    + item.Colegiaturas + "</td></tr>");
                            });
                            CallBack();
                            alertify.error("Ha ocurrido un error al Eliminar la Matricula, es posible que este asignado a una Matricula");
                        }
                        $('#modalMatricula').modal('hide');
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        $('#modalMatricula').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}


var IdExpediente= "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

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


function getExpediente(){
    if (CodAlumno == "" || CodAlumno == null) {

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
                        + item.idAlumno + "</td><td>"
                        + item.Nombre + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.AnioEscolar + "</td><td hidden>"
                        + item.TipoIngreso + "</td><td>"
                        + TI + "</td><td hidden>"
                        + item.Turno + "</td><td>"
                        + T + "</td><td>"
                        + item.Monto + "</td><td>"
                        + item.Colegiaturas + "</td></tr>");
                });
                CallBack();
            } else {
                alertify.error("Ha ocurrido al obtener las Matriculas");
            }
            $('#modalMatricula').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMatricula').modal('hide');
        }
    });
}

$("#save").on("click", function () {

    datos = {
        //idExpediente: $("#IdExpediente").val(),
        idAlumno: CodAlumno //$("#Estudiante").val()
        , idGrado: $("#Grado").val()
        , AnioEscolar: $("#AnioEscolar").val()
        , TipoIngreso: $("#TipoIngreso").val()
        , Turno: $("#Turno").val()
        , Monto: $("#Monto").val()
        , Colegiaturas: $("#Colegiaturas").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Matricula/AddExpediente",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Grado Agregado.");
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
                    switch (item.TipoIngreso) {
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
                        + item.idAlumno + "</td><td>"
                        + item.Nombre + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.AnioEscolar + "</td><td hidden>"
                        + item.TipoIngreso + "</td><td>"
                        + TI + "</td><td hidden>"
                        + item.Turno + "</td><td>"
                        + T + "</td><td>"
                        + item.Monto + "</td><td>"
                        + item.Colegiaturas + "</td></tr>");
                });
                CallBack();
            } else {
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
                    switch (item.TipoIngreso) {
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
                        + item.idAlumno + "</td><td>"
                        + item.Nombre + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.AnioEscolar + "</td><td hidden>"
                        + item.TipoIngreso + "</td><td>"
                        + TI + "</td><td hidden>"
                        + item.Turno + "</td><td>"
                        + T + "</td><td>"
                        + item.Monto + "</td><td>"
                        + item.Colegiaturas + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar la Matricula");
            }
            $('#modalMatricula').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMatricula').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        idExpediente: IdExpediente
         , idAlumno: CodAlumno//$("#Estudiante").val()
         , idGrado: $("#Grado").val()
         , AnioEscolar: $("#AnioEscolar").val()
         , TipoIngreso: $("#TipoIngreso").val()
         , Turno: $("#Turno").val()
         , Monto: $("#Monto").val()
         , Colegiaturas: $("#Colegiaturas").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Matricula/AddExpediente",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Grado Actualizado.");
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
                    switch (item.TipoIngreso) {
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
                        + item.idAlumno + "</td><td>"
                        + item.Nombre + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.AnioEscolar + "</td><td hidden>"
                        + item.TipoIngreso + "</td><td>"
                        + TI + "</td><td hidden>"
                        + item.Turno + "</td><td>"
                        + T + "</td><td>"
                        + item.Monto + "</td><td>"
                        + item.Colegiaturas + "</td></tr>");
                });
                CallBack();
            } else {
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
                    switch (item.TipoIngreso) {
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
                        + item.idAlumno + "</td><td>"
                        + item.Nombre + "</td><td hidden>"
                        + item.idGrado + "</td><td>"
                        + item.descripcion + "</td><td>"
                        + item.AnioEscolar + "</td><td hidden>"
                        + item.TipoIngreso + "</td><td>"
                        + TI + "</td><td hidden>"
                        + item.Turno + "</td><td>"
                        + T + "</td><td>"
                        + item.Monto + "</td><td>"
                        + item.Colegiaturas + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar la Matricula");
            }
            $('#modalMatricula').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalMatricula').modal('hide');
        }
    });

});

