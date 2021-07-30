$(document).ready(function () {
    callBack();

});

var idparametro = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$("#tblopciones tbody").on("click", "tr", function () {
    idmodulo = $(this).find('td:nth-child(1)').html();
    nombremodulo = $(this).find('td:nth-child(2)').html();
    descripcionmodulo = $(this).find('td:nth-child(3)').html();
    idpadre = $(this).find('td:nth-child(4)').html();
    padre = $(this).find('td:nth-child(5)').html();
    url = $(this).find('td:nth-child(6)').html();
    icono = $(this).find('td:nth-child(7)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones
    $('#btnEdit').prop("disabled", false);
});


function Nuevo() {
    $("#mdAddOpcion").modal('show');
}

function Editar() {
    console.log(nombremodulo + '-' + descripcionmodulo + '-' + idpadre + '-' + url);
    $("#inputUpdModulo").val(nombremodulo);
    $("#inputUpdDescripcion").val(descripcionmodulo);
    $('#slctUpdPadre').val(idpadre);
    $("#inputUpdUrl").val(url);

    $("#mdUpdateOpcion").modal('show');
}

function Guardar() {
    $("#mdAddOpcion").modal('hide');
    var nombre = $('#inputModulo').val();
    var descripcion = $('#inputDescripcion').val();
    var idpadre = $('#slctPadre').val();
    var url = $('#inputUrl').val();
    var datos = {
        nombre: nombre,
        descripcion: descripcion,
        idpadre: idpadre,
        url: url
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Sistema/InsertarOpcion',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblopciones').DataTable().destroy();
                $('#tblopciones tbody').empty();
                $.each(resultado.Opciones, function (i, item) {
                    $('#tblopciones tbody').append("<tr><td>" + item.id + "</td><td>" + item.nombreModulo + "</td><td>" + item.descripcionModulo + "</td><td hidden>" + item.idPadre + "</td><td>" + item.Padre + "</td><td>" + item.nombreVista + "</td><td>" + item.nombreIconoMenu + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#mdAddOpcion").modal('hide');
                    $("#mdAddOpcion").hide();
                }, 1000)
                $('#inputModulo').val("");
                $('#inputDescripcion').val("");
                $('#inputUrl').val("");

            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#mdAddOpcion").modal('hide');
                $("#mdAddOpcion").hide();
            }, 1000)
        }

    });
}


function Modificar() {
    $("#mdUpdateOpcion").modal('hide');
    var nombre = $('#inputUpdModulo').val();
    var descripcion = $('#inputUpdDescripcion').val();
    var idpadre = $('#slctUpdPadre').val();
    var url = $('#inputUpdUrl').val();
    var datos = {
        idopcion:idmodulo, 
        nombre: nombre,
        descripcion: descripcion,
        idpadre: idpadre,
        url: url
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Sistema/ActualizarOpcion',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblopciones').DataTable().destroy();
                $('#tblopciones tbody').empty();
                $.each(resultado.Opciones, function (i, item) {
                    $('#tblopciones tbody').append("<tr><td>" + item.id + "</td><td>" + item.nombreModulo + "</td><td>" + item.descripcionModulo + "</td><td hidden>" + item.idPadre + "</td><td>" + item.Padre + "</td><td>" + item.nombreVista + "</td><td>" + item.nombreIconoMenu + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#mdUpdateOpcion").modal('hide');
                    $("#mdUpdateOpcion").hide();
                }, 1000)
                $('#inputUpdModulo').val("");
                $('#inputUpdDescripcion').val("");
                $('#inputUpdUrl').val("");
            } else {
                alertify.error(resultado.Msj);
            }
            $('#inputParametro').val("");
            $('#inputValor').val("");
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#mdUpdateOpcion").modal('hide');
                $("#mdUpdateOpcion").hide();
            }, 1000)
        }

    });
}



function callBack() {
    var call = $('#tblopciones');

    call.dataTable({
        "scrollX": false,
        "pageLength": 10,
        "lengthChange": true,
        scrollCollapse: false,
        paging: true,
        info: false,
        order: true,
        "language": {
            "decimal": ".",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "order": [
            [0, 'desc']
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ]
    });
}