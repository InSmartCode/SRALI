$(document).ready(function () {
    callBackGrados();
    callBackSecciones();
    callBackAsignadas();
});

var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$("#tblGrados tbody").on("click", "tr", function () {
    validgrado = $(this).find('td:nth-child(1)').html();
    nombregrado = $(this).find('td:nth-child(2)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones
    $('#btnNuevo').prop("disabled", false);
    $('#btnPeriodo').prop("disabled", false);
    MostrarSeccionesPorGrado()
});

$("#tblSeccAsignadas tbody").on("click", "tr", function () {
    idgradoseccion = $(this).find('td:nth-child(1)').html();
    valseccion = $(this).find('td:nth-child(5)').html();
    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    //Activamos los botones
    $('#btnEliminar').prop("disabled", false);
});

$("#tblPeriodos tbody").on("click", "tr", function () {
    idgradoperiodo = $(this).find('td:nth-child(1)').html();
    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }
    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);
    console.log(idgradoperiodo);
});


//SECCION POR GRADO
function Nuevo() {
    $('#txtgrado').val(nombregrado);
    CargarSeccionesASelect();
    $("#modalAsignarSeccion").modal('show');
}

function Eliminar() {
    $('#txtElimgrado').val(nombregrado);
    $('#txtElimSeccion').val(valseccion);
    $("#modalEliminarSeccion").modal('show');
}

function MostrarSeccionesPorGrado() {
    
    var datos = {
        grado: validgrado
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/SeccionPorGrado',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblSeccAsignadas').DataTable().destroy();
                $('#tblSeccAsignadas tbody').empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#tblSeccAsignadas tbody').append("<tr><td hidden>" + item.IdGradoSeccion + "</td><td hidden>" + item.idGrado + "</td><td>" + item.descripciongrado + "</td><td hidden>" + item.idSeccion + "</td><td>" + item.nombreSeccion + "</td></tr>");
                });
                callBackAsignadas();
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
        }
    });
}

function CargarSeccionesASelect() {

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/CargarSecciones',
        contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $("#selSeccion").empty();
                $('#selSeccion').append($('<option>', { value: 0 }).text("Seleccione Sección"));
                $.each(resultado.ListadoSecciones, function (i, item) {
                    $('#selSeccion').append($('<option>', { value: item.idSeccion }).text(item.nombreSeccion));
                });
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
        }
    });
}

function GuardarSeccionPorGrado() {
    $("#modalAsignarSeccion").modal('hide');
    var seccAsign = $('#selSeccion').val();
    var datos = {
        grado: validgrado,
        seccion: seccAsign
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/AgregarSeccionPorGrado',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblSeccAsignadas').DataTable().destroy();
                $('#tblSeccAsignadas tbody').empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#tblSeccAsignadas tbody').append("<tr><td hidden>" + item.IdGradoSeccion + "</td><td hidden>" + item.idGrado + "</td><td>" + item.descripciongrado + "</td><td hidden>" + item.idSeccion + "</td><td>" + item.nombreSeccion + "</td></tr>");
                });
                callBackAsignadas();
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalAsignarSeccion").modal('hide');
                $("#modalAsignarSeccion").hide();
            }, 1000)
        }

    });
}

function EliminarSeccionPorGrado() {
    $("#modalEliminarSeccion").modal('hide');
    var datos = {
        idGradoSeccion: idgradoseccion,
        idgrado: validgrado
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/EliminarSeccionPorGrado',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblSeccAsignadas').DataTable().destroy();
                $('#tblSeccAsignadas tbody').empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#tblSeccAsignadas tbody').append("<tr><td hidden>" + item.IdGradoSeccion + "</td><td hidden>" + item.idGrado + "</td><td>" + item.descripciongrado + "</td><td hidden>" + item.idSeccion + "</td><td>" + item.nombreSeccion + "</td></tr>");
                });
                callBackAsignadas();
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalEliminarSeccion").modal('hide');
                $("#modalEliminarSeccion").hide();
            }, 1000)
        }

    });
}



//PERIODOS
function NuevoPeriodo() {
    $("#txtPeriodoGrado").val(nombregrado);
    $("#modalPeriodos").modal('show');
    CargarPeriodoASelect();
}

function CargarPeriodoASelect() {
    var datos = {
        grado: validgrado
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/MostrarPeriodosDisponibles',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {

                //cargamos el select
                $("#selperiodo").empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#selperiodo').append($('<option>', { value: item.IdPerido }).text(item.Periodo));
                });

                //cargamos la tabla de periodos asignados al grado
                $('#tblPeriodos').DataTable().destroy();
                $('#tblPeriodos tbody').empty();
                $.each(resultado.ListadoP, function (i, item) {
                    $('#tblPeriodos tbody').append("<tr><td hidden>" + item.IdPeriodoXGrado + "</td><td>" + item.Periodo + "</td></tr>");
                });
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
        }
    });
}

function AgregarPeriodoXGrado() {
    var valiperiodo = $('#selperiodo').val();
    var datos = {
        grado: validgrado,
        periodo: valiperiodo
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/AgregarPeriodoPorGrado',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {

                //cargamos el select
                $("#selperiodo").empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#selperiodo').append($('<option>', { value: item.IdPerido }).text(item.Periodo));
                });

                //cargamos la tabla de periodos asignados al grado
                $('#tblPeriodos').DataTable().destroy();
                $('#tblPeriodos tbody').empty();
                $.each(resultado.ListadoP, function (i, item) {
                    $('#tblPeriodos tbody').append("<tr><td hidden>" + item.IdPeriodoXGrado + "</td><td>" + item.Periodo + "</td></tr>");
                });
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
        }
    });
}

function EliminarPeriodoXGrado() {
    
    var datos = {
        grado: validgrado,
        iddetalle: idgradoperiodo
    }
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/EliminarPeriodoPorGrado',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {

                //cargamos el select
                $("#selperiodo").empty();
                $.each(resultado.Listado, function (i, item) {
                    $('#selperiodo').append($('<option>', { value: item.IdPerido }).text(item.Periodo));
                });

                //cargamos la tabla de periodos asignados al grado
                $('#tblPeriodos').DataTable().destroy();
                $('#tblPeriodos tbody').empty();
                $.each(resultado.ListadoP, function (i, item) {
                    $('#tblPeriodos tbody').append("<tr><td hidden>" + item.IdPeriodoXGrado + "</td><td>" + item.Periodo + "</td></tr>");
                });
                alertify.success(resultado.Msj);
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
        }
    });
}


//GRADOS
function NuevoGrado() {
    $("#modalCrearGrado").modal('show');
}

function CrearGrado() {
    $("#modalCrearGrado").modal('hide');
    var valGradoCreado = $('#txtcreagrado').val();
    var valClave = $('#txtcreaclave').val();
    var valNivel = $('#selNivel').val();

    var datos = {
        grado: valGradoCreado,
        clave: valClave,
        nivel: valNivel
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Grado/CrearGrados',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $('#tblGrados').DataTable().destroy();
                $('#tblGrados tbody').empty();
                $.each(resultado.ListadoGrados, function (i, item) {
                    $('#tblGrados tbody').append("<tr><td hidden>" + item.idGrado + "</td><td>" + item.descripcion + "</td><td>" + item.nivelEscolar + "</td><td>" + item.clave + "</td></tr>");
                });
                callBackGrados();
                $('#txtcreagrado').val("");
                $('#txtcreaclave').val("");
                $('#selNivel').val("0");
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalCrearGrado").modal('hide');
                $("#modalCrearGrado").hide();
            }, 1000)
        }

    });
}


// SECCION
function NuevaSeccion() {
    $("#modalCrearSeccion").modal('show');
}

function CrearSeccion() {
    $("#modalCrearSeccion").modal('hide');
    var valSeccion = $('#txtcreaseccion').val();

    var datos = {
        seccion: valSeccion
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
                    $('#tblSecciones tbody').append("<tr><td hidden>" + item.idSeccion + "</td><td>" + item.nombreSeccion + "</td></tr>");
                });
                callBackSecciones();
                $('#txtcreaseccion').val("");
                
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar los datos');
            setTimeout(function () {
                $("#modalCrearSeccion").modal('hide');
                $("#modalCrearSeccion").hide();
            }, 1000)
        }

    });
}


function callBackGrados() {
    var call = $('#tblGrados');

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

function callBackSecciones() {
    var call = $('#tblSecciones');

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

function callBackAsignadas() {
    var call = $('#tblSeccAsignadas');

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