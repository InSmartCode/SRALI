


$(document).ready(function () {
    $('#tblResponsables').DataTable();

    //pureba desde el repositorio
    limpiarDatos();
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

    $('#modalResponsable').modal('show');
}

function Editar() {

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

    $('#modalResponsable').modal('show');
}

function Eliminar() {

    if (IdResponsable == 0 || IdResponsable == "") {
        alertify.error("Debe de seleccionar un Responsable");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar el Responsable?",
            function () {
                //eliminar
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

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {

    datos = {
        //idResponsable: $("#IdResponsable").val(),
         mombres: $("#Nombres").val()
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
        data: formData,
        success: function (result) {
            if (result.Res) {
                alertify.success("Responsable Agregado.");
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.mombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca +  "</td></tr>");
                });
                CallBack();
            } else  {
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.mombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td></tr>");
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
        , mombres: $("#Nombres").val()
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
                alertify.success("Alumno Actualizado.");
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.mombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblResponsables').DataTable().destroy();
                $('#tblResponsables tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblResponsables tbody').append("<tr class='even pointer'><td>" + item.idResponsable + "</td><td>"
                        + item.mombres + "</td><td>"
                        + item.apellidos + "</td><td>"
                        + item.telefonoFijo + "</td><td>"
                        + item.telefonoMovil + "</td><td>"
                        + item.dui + "</td><td>"
                        + item.microbus + "</td><td>"
                        + item.telefonoFijoMicrobus + "</td><td>"
                        + item.telefonoMovilMicrobus + "</td><td>"
                        + item.numeroPlaca + "</td></tr>");
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



