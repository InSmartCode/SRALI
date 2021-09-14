$(document).ready(function () {
    callBack();
});

var idseccion = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$("#tblSecciones tbody").on("click", "tr", function () {
    idseccion = $(this).find('td:nth-child(1)').html();
    seccion = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones
    $('#btnEdit').prop("disabled", false);
});

function Nuevo() {
    $("#modalSeccion").modal('show');
}

function Editar() {
    $('#inputEditSeccion').val(seccion);
    $("#modalEditSeccion").modal('show');
}

function Guardar() {
    $("#modalSeccion").modal('hide');
    var seccion = $('#inputSeccion').val();
    var datos = {
        seccion: seccion
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/AgregarSeccion',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblSecciones').DataTable().destroy();
                $('#tblSecciones tbody').empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#tblSecciones tbody').append("<tr><td>" + item.idSeccion + "</td><td>" + item.nombreSeccion + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalSeccion").modal('hide');
                    $("#modalSeccion").hide();
                }, 1000)

            } else {
                alertify.error(resultado.Msj);
            }
            $('#inputSeccion').val("");
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalSeccion").modal('hide');
                $("#modalSeccion").hide();
            }, 1000)
        }

    });
}

function Modificar() {
    $("#modalEditSeccion").modal('hide');
    var seccion = $('#inputEditSeccion').val();
    var datos = {
        idseccion: idseccion,
        seccion: seccion
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/EditarSeccion',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblSecciones').DataTable().destroy();
                $('#tblSecciones tbody').empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#tblSecciones tbody').append("<tr><td>" + item.idSeccion + "</td><td>" + item.nombreSeccion + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalEditSeccion").modal('hide');
                    $("#modalEditSeccion").hide();
                }, 1000)

            } else {
                alertify.error(resultado.Msj);
            }
            $('#inputSeccion').val("");
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalEditSeccion").modal('hide');
                $("#modalEditSeccion").hide();
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
