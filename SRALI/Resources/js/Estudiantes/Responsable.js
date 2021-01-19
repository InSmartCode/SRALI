


$(document).ready(function () {
    $('#tblResponsables').DataTable();

    //pureba desde el repositorio fdf
    limpiarDatos();


    $('#btnDel').prop("disabled", true);
    $('#btnEdit').prop("disabled", true);
});


function CallBack() {
    $('#tblResponsables').DataTable();

    $('#tblResponsables tbody').on('click', 'tr', function () {

        IdResponsable = $(this).find('td:first').html();
        Nombres = $(this).find('td:nth-child(2)').html();
        Apellidos = $(this).find('td:nth-child(3)').html();
        TelefonoFijo = $(this).find('td:nth-child(4)').html();
        TelefonoMovil = $(this).find('td:nth-child(5)').html();
        DUI = $(this).find('td:nth-child(6)').html();
        Microbus = $(this).find('td:nth-child(7)').html();
        TelefonoFijoMicrobus = $(this).find('td:nth-child(8)').html();
        TelefonoMovilMicrobus = $(this).find('td:nth-child(9)').html();
        NumeroPlaca = $(this).find('td:nth-child(10)').html();
        Marca = $(this).find('td:nth-child(11)').html();

        if (ultimaFila != null) {
            ultimaFila.css('background-color', colorOriginalPAR);
        }

        $(this).css('background-color', '#ffe35c');
        ultimaFila = $(this);

        $('#btnDel').prop("disabled", false);
        $('#btnEdit').prop("disabled", false);
    });
}
// Sección para el CRUD

function limpiarDatos() {
    $("#IdResponsable").val("");
    $("#Nombres").val("");
    $("#Apellidos").val("");
    $("#TelefonoFijo").val("");
    $("#TelefonoMovil").val("");
    $("#DUI").val("");
    $("#Microbus").val("");
    $("#TelefonoFijoMicrobus").val("");
    $("#TelefonoMovilMicrobus").val("");
    $("#NumeroPlaca").val("");
    $("#Marca").val("");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('#modalHeader').html('Nuevo Responsable');
    $('#modalResponsable').modal('show');
}

function Editar() {
    if (IdResponsable == 0 || IdResponsable == "" || IdResponsable == "undefined") {
        alertify.error("Debe de seleccionar un Materia");
    } else {
        $('#save').prop("hidden", true);
        $('#update').prop("hidden", false);

        $("#IdResponsable").val(IdResponsable);
        $("#Nombres").val(Nombres);
        $("#Apellidos").val(Apellidos);
        $("#TelefonoFijo").val(TelefonoFijo);
        $("#TelefonoMovil").val(TelefonoMovil);
        $("#DUI").val(DUI);
        $("#Microbus").val(Microbus);
        $("#TelefonoFijoMicrobus").val(TelefonoFijoMicrobus);
        $("#TelefonoMovilMicrobus").val(TelefonoMovilMicrobus);
        $("#NumeroPlaca").val(NumeroPlaca);
        $("#Marca").val(Marca);

        $('#modalHeader').html('Modificar Responsable');
        $('#modalResponsable').modal('show');
    }
   
}






function Eliminar() {

    if (IdResponsable == 0 || IdResponsable == "") {
        alertify.error("Debe de seleccionar un Responsable");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar el Responsable?",
            function () {
                
                $.ajax({
                    type: "POST",
                    traditional: true,//con el formDate este se comenta
                    url: "/Estudiantes/DeleteResponsable",
                    contentType: "application/json; charset=utf-8",//con el formDate este se comenta
                    data: JSON.stringify({ idResponsable: IdResponsable}),
                    success: function (result) {
                        if (result.Res) {
                            alertify.success("Responsable Eliminado.");
                            $('#tblResponsables').DataTable().destroy();
                            $('#tblResponsables tbody').empty();
                            $.each(result.Responsables, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                                    + item.nombres + "</td><td>"
                                    + item.apellidos + "</td><td>"
                                    + item.telefonoFijo + "</td><td>"
                                    + item.telefonoMovil + "</td><td>"
                                    + item.dui + "</td><td>"
                                    + item.microbus + "</td><td>"
                                    + item.telefonoFijoMicrobus + "</td><td>"
                                    + item.telefonoMovilMicrobus + "</td><td>"
                                    + item.numeroPlaca + "</td><td>"
                                    + item.marca + "</td></tr>");
                            });
                            CallBack();
                        } else {
                            $('#tblResponsables').DataTable().destroy();
                            $('#tblResponsables tbody').empty();
                            $.each(result.Responsables, function (i, item) {
                                /* Vamos agregando a nuestra tabla las filas necesarias */
                                $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                                    + item.nombres + "</td><td>"
                                    + item.apellidos + "</td><td>"
                                    + item.telefonoFijo + "</td><td>"
                                    + item.telefonoMovil + "</td><td>"
                                    + item.dui + "</td><td>"
                                    + item.microbus + "</td><td>"
                                    + item.telefonoFijoMicrobus + "</td><td>"
                                    + item.telefonoMovilMicrobus + "</td><td>"
                                    + item.numeroPlaca + "</td><td>"
                                    + item.marca + "</td></tr>");
                            });
                            CallBack();
                            alertify.error("Ha ocurrido un error al Eliminar el Responsable, es posible que este asignado a un Estudiante");
                        }
                        $('#modalResponsable').modal('hide');
                    },
                    error: function () {
                        alertify.error("Ha ocurrido un error");
                        $('#modalResponsable').modal('hide');
                    }
                });
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}


var IdEstudiante = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblResponsables tbody').on('click', 'tr', function () {

    IdResponsable = $(this).find('td:first').html();
    Nombres = $(this).find('td:nth-child(2)').html();
    Apellidos = $(this).find('td:nth-child(3)').html();
    TelefonoFijo = $(this).find('td:nth-child(4)').html();
    TelefonoMovil = $(this).find('td:nth-child(5)').html();
    DUI = $(this).find('td:nth-child(6)').html();
    Microbus = $(this).find('td:nth-child(7)').html();
    TelefonoFijoMicrobus = $(this).find('td:nth-child(8)').html();
    TelefonoMovilMicrobus = $(this).find('td:nth-child(9)').html();
    NumeroPlaca = $(this).find('td:nth-child(10)').html();
    Marca = $(this).find('td:nth-child(11)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnDel').prop("disabled", false);
    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //idResponsable: $("#IdResponsable").val(),
         nombres: $("#Nombres").val()
        , apellidos: $("#Apellidos").val()
        , telefonoFijo: $("#TelefonoFijo").val()
        , telefonoMovil: $("#TelefonoMovil").val()
        , dui: $("#DUI").val()
        , microbus: $("#Microbus").val()
        , telefonoFijoMicrobus: $("#TelefonoFijoMicrobus").val()
        , telefonoMovilMicrobus: $("#TelefonoMovilMicrobus").val()
        , numeroPlaca: $("#NumeroPlaca").val()
        , marca: $("#Marca").val()
    }
    $.ajax({
       type: "POST",
       traditional: true,//con el formDate este se comenta
       url: "/Estudiantes/AddResponsable",
       contentType: "application/json; charset=utf-8",//con el formDate este se comenta
       data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Responsable Agregado.");
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Responsables, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td><td>"
                        + item.marca + "</td></tr>");
                });
                CallBack();
            } else  {
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Responsables, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td><td>"
                        + item.marca + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Responsable");
            }
            $('#modalResponsable').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalResponsable').modal('hide');
        }
    });
});

$("#update").on("click", function () {
    datos = {
        idResponsable: $("#IdResponsable").val()
        , nombres: $("#Nombres").val()
        , apellidos: $("#Apellidos").val()
        , telefonoFijo: $("#TelefonoFijo").val()
        , telefonoMovil: $("#TelefonoMovil").val()
        , dui: $("#DUI").val()
        , microbus: $("#Microbus").val()
        , telefonoFijoMicrobus: $("#TelefonoFijoMicrobus").val()
        , telefonoMovilMicrobus: $("#TelefonoMovilMicrobus").val()
        , numeroPlaca: $("#NumeroPlaca").val()
        , marca: $("#Marca").val()
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Estudiantes/UpdateResponsable",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Responsable Actualizado.");
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Responsables, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td><td>"
                        + item.marca + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Responsables, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td><td>"
                        + item.marca + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Responsable");
            }
            $('#modalResponsable').modal('hide');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalResponsable').modal('hide');
        }
    });

});




