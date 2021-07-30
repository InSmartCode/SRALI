$(document).ready(function () {

    callBack();

});

var idparametro = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$("#tblparametros tbody").on("click", "tr", function () {
    idparametro = $(this).find('td:nth-child(1)').html();
    parametro = $(this).find('td:nth-child(2)').html();
    valorparametro = $(this).find('td:nth-child(3)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones
    $('#btnEdit').prop("disabled", false);
});


function Nuevo() {
    $("#mdAddParametro").modal('show');
}

function Editar() {
    $("#inputUpdParametro").val(parametro);
    $("#inputUpdValor").val(valorparametro);

    $("#mdUpdateParametro").modal('show');
}

function Guardar() {
    $("#mdAddParametro").modal('hide');
    var para = $('#inputParametro').val();
    var valpara = $('#inputValor').val();
    var datos = {
        parametro: para,
        valor: valpara
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Sistema/InsertarParametros',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblparametros').DataTable().destroy();
                $('#tblparametros tbody').empty();
                $.each(resultado.Parametros, function (i, item) {
                    $('#tblparametros tbody').append("<tr><td>" + item.IdParametro + "</td><td>" + item.Descripcion + "</td><td>" + item.Parametro + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalAutorizacion").modal('hide');
                    $("#modalAutorizacion").hide();
                }, 1000)

            } else {
                alertify.error(resultado.Msj);
            }
            $('#inputParametro').val("");
            $('#inputValor').val("");
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#mdAddParametro").modal('hide');
                $("#mdAddParametro").hide();
            }, 1000)
        }

    });
}


function Modificar() {
    $("#mdUpdateParametro").modal('hide');
    $("#mdUpdateParametro").hide();
    var valpara = $('#inputUpdValor').val();
    var datos = {
        id: idparametro,
        valor: valpara
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Sistema/ActualizarParametros',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblparametros').DataTable().destroy();
                $('#tblparametros tbody').empty();
                $.each(resultado.Parametros, function (i, item) {
                    $('#tblparametros tbody').append("<tr><td>" + item.IdParametro + "</td><td>" + item.Descripcion + "</td><td>" + item.Parametro + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalAutorizacion").modal('hide');
                    $("#modalAutorizacion").hide();
                }, 1000)

            } else {
                alertify.error(resultado.Msj);
            }
            $('#inputParametro').val("");
            $('#inputValor').val("");
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#mdUpdateParametro").modal('hide');
                $("#mdUpdateParametro").hide();
            }, 1000)
        }

    });
}



function callBack() {
    var call = $('#tblparametros');

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