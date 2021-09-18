
$(document).ready(function () {
    $('#tblMaterias').DataTable();
    $('#PeriodosXGrado').DataTable();
    $('#tblMateriasPorGrado').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();


    $('#btnNew').prop("disabled", true);
});


function CallBack() {
    $('#tblMaterias').DataTable();

    $('#tblMaterias tbody').on('click', 'tr', function () {

        IdAsignatura = $(this).find('td:first').html();
        NombreAsignatura = $(this).find('td:nth-child(2)').html();
        Clave = $(this).find('td:nth-child(3)').html();
        Hora = $(this).find('td:nth-child(4)').html();

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
    $("#Clave").val("");
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
        //$("#sltGrado").val(IdGrado);
        $("#Clave").val(Clave);
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
                                $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                                    + item.nombreAsignatura + "</td><td>"
                                    + item.clave + "</td><td>"
                                    + getHour(item.hora) + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblMaterias').DataTable().destroy();
                            $('#tblMaterias tbody').empty();
                            $.each(result.Materias, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                                    + item.nombreAsignatura + "</td><td>"
                                    + item.clave + "</td><td>"
                                    + getHour(item.hora) + "</td></tr>");
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
    NombreAsignatura = $(this).find('td:nth-child(2)').html();
    Clave = $(this).find('td:nth-child(3)').html();
    Hora = $(this).find('td:nth-child(4)').html();


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
        //idGrado: $("#sltGrado").val()
        nombreAsignatura: $("#NombreAsignatura").val(),
        clave: $("#Clave").val(),
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
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.clave + "</td><td>"
                        + getHour(item.hora) + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.clave + "</td><td>"
                        + getHour(item.hora) + "</td></tr>");
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
        //, idGrado: $("#sltGrado").val()
        , nombreAsignatura: $("#NombreAsignatura").val()
        ,clave: $("#Clave").val()
        ,hora: $("#sltHora").val()
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
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.clave + "</td><td>"
                        + getHour(item.hora) + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblMaterias').DataTable().destroy();
                $('#tblMaterias tbody').empty();
                $.each(result.Materias, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMaterias tbody').append("<tr class='even pointer'><td>" + item.idAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td><td>"
                        + item.clave + "</td><td>"
                        + getHour(item.hora) + "</td></tr>");
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


function getHour(id) {
    switch(id){
        case "1":
            return "8:00am - 9:00am";
            break;
        case"2":
            return "9:00am - 10:00am";
            break;
        case"3":
            return "10:00am - 11:00am";
            break;
        case"4":
            return "11:00am - 12:00m";
            break;
        case"5":
            return "12:00m - 1:00pm";
            break;
        case"6":
            return "1:00pm - 2:00pm";
            break;
        case"7":
            return "2:00pm - 3:00pm";
            break;
        case"8":
            return "3:00pm - 4:00pm";
            break;
        case "9":
            return "4:00pm - 5:00pm";
            break;
        default:
            return "";
    }
}


function Import() {
    $('#modalHeaderImp').html('Importar Materias');
    $('#modalImportData').modal('show');
}


$('#tblMateriasPorGrado tbody').on('click', 'tr', function () {

    IdMateriaXGrado = $(this).find('td:first').html();
    IdAsignaturaMG = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);

});

function CallBackMG() {
    $('#tblMateriasPorGrado').DataTable();

    $('#tblMateriasPorGrado tbody').on('click', 'tr', function () {

        IdMateriaXGrado = $(this).find('td:first').html();
        IdAsignaturaMG = $(this).find('td:nth-child(2)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnNew').prop("disabled", false);

    });
}

$('#PeriodosXGrado tbody').on('click', 'tr', function () {

    IdPeriodosXGrado = $(this).find('td:first').html();
    //IdAsignaturaMG = $(this).find('td:nth-child(2)').html();
    
    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnNew').prop("disabled", false);

    GetMateriasXGrado();
});

function GetMateriasXGrado() {
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/GetAsignaturaPorGrado",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify({ IdGradoPeriodo: IdPeriodosXGrado }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Sincronización Realizada con Éxito");
                $('#tblMateriasPorGrado').DataTable().destroy();
                $('#tblMateriasPorGrado tbody').empty();
                $.each(result.asignaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                        + item.IdAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td></tr>");
                });
                CallBackMG();
            } else {
                $('#tblMateriasPorGrado').DataTable().destroy();
                $('#tblMateriasPorGrado tbody').empty();
                $.each(result.asignaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                        + item.IdAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td></tr>");
                });
                CallBackMG();
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

function btnNew() {
    $('#saveMG').prop("hidden", false);
    $('#updateMG').prop("hidden", true);

    limpiarDatosMG();

    $('#modalHeaderMG').html('Asignar Materia');
    $('#modalMateriaXGrado').modal('show');
}

function limpiarDatosMG() {
    $("#IdGradoXMateria").val(IdPeriodosXGrado);
    $("#sltMaterias").val("0");
}

function btnEdit() {
    if (IdPeriodosXGrado == 0 || IdPeriodosXGrado == "" || IdPeriodosXGrado == "undefined") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        $('#saveMG').prop("hidden", true);
        $('#updateMG').prop("hidden", false);

        $("#IdGradoXMateria").val(IdPeriodosXGrado);
        $("sltMaterias").val(IdAsignaturaMG);

        $('#modalHeaderMG').html('Actualizar Materia al Grado');
        $('#modalMateriaXGrado').modal('show');
    }
}

function btnDel() {

    if (IdAsignatura == 0 || IdAsignatura == "") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar la Materia?",
            function () {
                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Materia/DeleteAsignaturaPorGrado",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ IdMateriaXGrado: IdGradoXMateria, IdPeriodoXGrado: IdPeriodosXGrado }),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Materia Eliminada.");
                            $('#tblMateriasPorGrado').DataTable().destroy();
                            $('#tblMateriasPorGrado tbody').empty();
                            $.each(result.asignaturas, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                                    + item.IdAsignatura + "</td><td>"
                                    + item.nombreAsignatura + "</td></tr>");
                            });
                            CallBackMG();
                        } else {
                            $('#tblMateriasPorGrado').DataTable().destroy();
                            $('#tblMateriasPorGrado tbody').empty();
                            $.each(result.asignaturas, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                                    + item.IdAsignatura + "</td><td>"
                                    + item.nombreAsignatura + "</td></tr>");
                            });
                            CallBackMG();
                            alertify.error("Ha ocurrido un error al Eliminar la Materia, es posible que este asignado a un Grado");
                        }
                        //$('#modalMateria').modal('hide');
                        IdAsignatura = "";
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        //$('#modalMateria').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}


$("#saveMG").on("click", function () {

    datos = {
        IdPeriodoXGrado: IdPeriodosXGrado,
        IdAsignatura: $("#sltMaterias").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/AddAsignaturaPorGrado",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Materia Agregada.");
                $('#tblMateriasPorGrado').DataTable().destroy();
                $('#tblMateriasPorGrado tbody').empty();
                $.each(result.asignaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                        + item.IdAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td></tr>");
                });
                CallBackMG();
            } else {
                $('#tblMateriasPorGrado').DataTable().destroy();
                $('#tblMateriasPorGrado tbody').empty();
                $.each(result.asignaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                        + item.IdAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td></tr>");
                });
                CallBackMG();
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

$("#updateMG").on("click", function () {
    datos = {
        IdMateriaXGrado: $("#IdAsignatura").val(),
        IdPeriodoXGrado: IdPeriodosXGrado,
        IdAsignatura: $("#sltMaterias").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Materia/AddAsignaturaPorGrado",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Materia Actualizado.");
                $('#tblMateriasPorGrado').DataTable().destroy();
                $('#tblMateriasPorGrado tbody').empty();
                $.each(result.asignaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                        + item.IdAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td></tr>");
                });
                CallBackMG();
            } else {
                $('#tblMateriasPorGrado').DataTable().destroy();
                $('#tblMateriasPorGrado tbody').empty();
                $.each(result.asignaturas, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMateriasPorGrado tbody').append("<tr class='even pointer'><td>" + item.IdMateriaXGrado + "</td><td hidden>"
                        + item.IdAsignatura + "</td><td>"
                        + item.nombreAsignatura + "</td></tr>");
                });
                CallBackMG();
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
