$(document).ready(function () {
    callBack();
});

var idseccion = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$("#tblperiodos tbody").on("click", "tr", function () {
    idperiodo = $(this).find('td:nth-child(1)').html();
    periodo = $(this).find('td:nth-child(2)').html();
    descripcion = $(this).find('td:nth-child(3)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones
    $('#btnEdit').prop("disabled", false);
    $('#btnDelete').prop("disabled", false);
});

function NuevoModal() {
    $("#modalPeriodo").modal('show');
}

function EditarModal() {
    $('#inputEditPeriodo').val(periodo);
    $('#inputEditDescripcion').val(descripcion);
    $("#modalEditPeriodo").modal('show');
}

function EliminarModal() {
    $('#inputDeletePeriodo').val(periodo);
    $('#inputDeleteDescripcion').val(descripcion);
    $("#modalEditPeriodo").modal('show');
}

function Guardar() {
    $("#modalPeriodo").modal('hide');
    var nperiodo = $('#inputPeriodo').val();
    var ndescripcion = $('#inputDescripcion').val();
    var datos = {
        periodo: nperiodo,
        descripcion: ndescripcion
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/CrearPeriodos',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblperiodos').DataTable().destroy();
                $('#tblperiodos tbody').empty();
                $.each(resultado.ListadoPeriodos, function (i, item) {
                    $('#tblperiodos tbody').append("<tr><td hidden>" + item.IdPeriodo + "</td><td>" + item.Periodo + "</td><td>" + item.Descripcion + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalPeriodo").modal('hide');
                    $("#modalPeriodo").hide();
                }, 1000)

                $('#inputPeriodo').val("");
                $('#inputDescripcion').val("");
            } else {
                alertify.error(resultado.Msj);
            }
            
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalPeriodo").modal('hide');
                $("#modalPeriodo").hide();
            }, 1000)
        }

    });
}

function Modificar() {
    $("#modalEditPeriodo").modal('hide');
    var nperiodo = $('#inputEditPeriodo').val();
    var ndescripcion = $('#inputDescripcion').val();
    var datos = {
        idperiodo: idperiodo,
        periodo: nperiodo,
        descripcion: ndescripcion
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/EditarPeriodos',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblperiodos').DataTable().destroy();
                $('#tblperiodos tbody').empty();
                $.each(resultado.ListadoPeriodos, function (i, item) {
                    $('#tblperiodos tbody').append("<tr><td hidden>" + item.IdPeriodo + "</td><td>" + item.Periodo + "</td><td>" + item.Descripcion + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalEditPeriodo").modal('hide');
                    $("#modalEditPeriodo").hide();
                }, 1000)
                
            } else {
                alertify.error(resultado.Msj);
            }
            $('#inputEditPeriodo').val("");
            $('#inputDescripcion').val("");
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalEditPeriodo").modal('hide');
                $("#modalEditPeriodo").hide();
            }, 1000)
        }

    });
}

function Eliminar() {
    $("#modalDeletePeriodo").modal('hide');
    var datos = {
        idperiodo: idperiodo
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/EliminarPeriodos',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblperiodos').DataTable().destroy();
                $('#tblperiodos tbody').empty();
                $.each(resultado.ListadoPeriodos, function (i, item) {
                    $('#tblperiodos tbody').append("<tr><td hidden>" + item.IdPeriodo + "</td><td>" + item.Periodo + "</td><td>" + item.Descripcion + "</td></tr>");
                });
                callBack();
                alertify.success(resultado.Msj);
                setTimeout(function () {
                    $("#modalDeletePeriodo").modal('hide');
                    $("#modalDeletePeriodo").hide();
                }, 1000)

            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalDeletePeriodo").modal('hide');
                $("#modalDeletePeriodo").hide();
            }, 1000)
        }

    });
}

function callBack() {
    var call = $('#tblperiodos');

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
            [0, 'asc']
        ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"]
        ]
    });
}
