$(document).ready(function () {
    //$('#tblPerfiles').DataTable();

    //pureba desde el repositorio fdf
    //cargarInfoPerfil();
    $("#sltPerfil").val("0");
});

function cargarInfoPerfil() {
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Sistema/ObtenerInfoPerfil",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify({ Perfil: $("#sltPerfil").val() }),
        success: function (result) {
            if (result.Res) {
                alertify.success("Información Obtenida con Éxito.");

                //$('#tblMenus').DataTable().destroy();
                $('#tblMenus tbody').empty();
                $.each(result.OpcionesSistema, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMenus tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombreModulo + "</td></tr>");
                });

                //$('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.OpcionesXPerfil, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id_opcion + "</td><td>"
                        + item.nombreModulo + "</td></tr>");
                });
                //CallBack();
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('#modalPerfil').modal('hide');
        }
    });
}



var IdPerfil = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblMenus tbody').on('click', 'tr', function () {

    IdMenu = $(this).find('td:first').html();
    NombreMenu = $(this).find('td:nth-child(2)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});



$('#tblPerfiles tbody').on('click', 'tr', function () {

    IdPerfil = $(this).find('td:first').html();
    NombrePerfil = $(this).find('td:nth-child(2)').html();


    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#addMenu").on("click", function () {
    datos = {
        id_perfil: $("#sltPerfil").val()
        , id_opcion: IdMenu
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Sistema/GuardarOpcionXPerfil",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Información Obtenida con Éxito.");

                //$('#tblMenus').DataTable().destroy();
                $('#tblMenus tbody').empty();
                $.each(result.OpcionesSistema, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMenus tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombreModulo + "</td></tr>");
                });

                //$('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.OpcionesXPerfil, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id_opcion + "</td><td>"
                        + item.nombreModulo + "</td></tr>");
                });
                //CallBack();
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });

});


$("#deleteMenu").on("click", function () {
    datos = {
        numreg: 0
        , id_perfil: $("#sltPerfil").val()
        , id_opcion: IdPerfil
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Sistema/EliminarOpcionXPerfil",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Res) {
                alertify.success("Información Obtenida con Éxito.");

                //$('#tblMenus').DataTable().destroy();
                $('#tblMenus tbody').empty();
                $.each(result.OpcionesSistema, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblMenus tbody').append("<tr class='even pointer'><td>" + item.id + "</td><td>"
                        + item.nombreModulo + "</td></tr>");
                });

                //$('#tblPerfiles').DataTable().destroy();
                $('#tblPerfiles tbody').empty();
                $.each(result.OpcionesXPerfil, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    $('#tblPerfiles tbody').append("<tr class='even pointer'><td>" + item.id_opcion + "</td><td>"
                        + item.nombreModulo + "</td></tr>");
                });
                //CallBack();
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
        }
    });

});