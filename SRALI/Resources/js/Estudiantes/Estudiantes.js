﻿
$("#avatar-1").fileinput({
    overwriteInitial: true,
    maxFileSize: 1500,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors-1',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="https:\\\\localhost:44349\\Content\\images\\user.png" alt="Your Avatar">',
    layoutTemplates: { main2: '{preview} {remove} {browse}' },
    allowedFileExtensions: ["jpg", "jpeg", "png", "gif"]
});

$(document).ready(function () {
    $('#tblEstudiantes').DataTable();

    $('#fechaNacimiento').datetimepicker({
        format: 'DD/MM/YYYY'
    });

    limpiarDatos();
});

$("#sltDepartamento").on('change', function () {
    LoadMunicipalities();
});

function CallBackFileInput(img, opc) {
    if (opc == "D") {
        console.log("Nuevo");
        $("#avatar-1").fileinput({
            overwriteInitial: true,
            maxFileSize: 1500,
            showClose: false,
            showCaption: false,
            browseLabel: '',
            removeLabel: '',
            browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
            removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
            removeTitle: 'Cancelar o Eliminar Imagen',
            elErrorContainer: '#kv-avatar-errors-1',
            msgErrorClass: 'alert alert-block alert-danger',
            defaultPreviewContent: '<img src="https:\\\\localhost:44349\\Content\\images\\user.png" alt="Your Avatar">',
            layoutTemplates: { main2: '{preview} {remove} {browse}' },
            allowedFileExtensions: ["jpg", "jpeg", "png", "gif"]
        });
    } else {
        $("#avatar-1").fileinput({
            overwriteInitial: true,
            maxFileSize: 1500,
            showClose: false,
            showCaption: false,
            browseLabel: '',
            removeLabel: '',
            browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
            removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
            removeTitle: 'Cancelar o Eliminar Imagen',
            elErrorContainer: '#kv-avatar-errors-1',
            msgErrorClass: 'alert alert-block alert-danger',
            //defaultPreviewContent: '<img src="Resources/FotosEstudiantes/' + img + '" width=215" height="275" alt="Tu Imagen" >',
            defaultPreviewContent: '<img src="https:\\\\localhost:44349\\Resources\\FotosEstudiantes\\' + img + '" alt="Tu Imagen">',
            layoutTemplates: { main2: '{preview} {remove} {browse}' },
            allowedFileExtensions: ["jpg", "jpeg", "png", "gif"]
        });
    }    
}

function CallBack() {
    $('#tblEstudiantes').DataTable();

    $('#tblEstudiantes tbody').on('click', 'tr', function () {

        IdEstudiante = $(this).find('td:first').html();
        Codigo = $(this).find('td:nth-child(2)').html();
        Nombres = $(this).find('td:nth-child(3)').html();
        PrimerApellido = $(this).find('td:nth-child(4)').html();
        SegundoApellido = $(this).find('td:nth-child(5)').html();
        FechaNacimiento = $(this).find('td:nth-child(6)').html();
        Edad = $(this).find('td:nth-child(7)').html();
        Sexo = $(this).find('td:nth-child(8)').html();
        NIE = $(this).find('td:nth-child(9)').html();
        LugarNacimiento = $(this).find('td:nth-child(10)').html();
        NumeroPartidaNacimiento = $(this).find('td:nth-child(11)').html();
        Tomo = $(this).find('td:nth-child(12)').html();
        Folio = $(this).find('td:nth-child(13)').html();
        Libro = $(this).find('td:nth-child(14)').html();
        Departamento = $(this).find('td:nth-child(15)').html();
        Municipio = $(this).find('td:nth-child(16)').html();
        Direccion = $(this).find('td:nth-child(17)').html();
        InstitucionProcedencia = $(this).find('td:nth-child(18)').html();
        idgrado = $(this).find('td:nth-child(19)').html();
        GradoIngreso = $(this).find('td:nth-child(20)').html();
        Archivofoto = $(this).find('td:nth-child(21)').html();
        IdTransporteResponsable = $(this).find('td:nth-child(22)').html();
        CorreoEstudiante = $(this).find('td:nth-child(23)').html();
        Status = $(this).find('td:nth-child(24)').html();
        StatusDescription = $(this).find('td:nth-child(25)').html();

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
    $("#inputCodigo").val("");
    $("#inputNombres").val("");
    $("#inputPrimerApellido").val("");
    $("#inputSegundoApellido").val("");
    $("#fechaNacimiento").val("");

    $("#male").attr('checked', true);

    $("#inputNIE").val("");
    $("#inputLugarNacimiento").val("");
    $("#inputPartidaNacimiento").val("");
    $("#inputTomo").val("");
    $("#inputFolio").val("");
    $("#inputLibro").val("");
    $("#sltDepartamento").val("0");
    $("#sltMunicipio").val("0");
    $("#inputGradoIngreso").val("0");
    $("#inputDireccion").val("");
    $("#inputLugarInstitucionProcedencia").val("");
    $("#inputGradoIngreso").val("");
    $("#sltResponsable").val("0");
    $("#inputCorreoElectronico").val("");
    $("#sltStatus").val("A");
    document.getElementById("sltMunicipio").options.length = 0;
    $('#avatar-1').fileinput('clear');
    $('#avatar-1').fileinput('destroy');
    CallBackFileInput("user.png","D");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();
    LoadMaxId();
    $('.nav-tabs a[href="#profile"]').tab('show');
}

function LoadMaxId() {
    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Estudiantes/MaxIdLoad',
        contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(datos),
        success: function (resultado) {
            if (resultado.Status == 0) {
                $("#inputCodigo").val(resultado.maxIdNumber);
                codEstudiante = $("#inputCodigo").val();
            } else {
                alertify.error(resultado.Msj);
            }
        },
        error: function () {
            alertify.error('Ocurrió un error al cargar el id. Se recomienda actualizar la página.');            
        }

    });

}

//al escribir en el nombre tomará la inicial del texto.
$(function() {
    $('#inputNombres').keyup(function () {
        var letter = $(this).val().match(/^([A-Za-z])/);

        // Si se encuentra una letra
        if(letter !== null) {
            // Cambiar a mayusculas
            letter = letter[0].toUpperCase();
            $("#inputCodigo").val(letter + codEstudiante);
            first = letter;
        }
    });
});
//al escribir en el apellido tomará la inicial del texto.
$(function () {
    $('#inputPrimerApellido').keyup(function () {
        var lastletter = $(this).val().match(/^([A-Za-z])/);

        // Si se encuentra una letra
        if (lastletter !== null) {
            // Cambiar a mayusculas
            lastletter = lastletter[0].toUpperCase();
            $("#inputCodigo").val(first + lastletter + codEstudiante);
        }
    });
});

function Editar() {
    LoadAllMunicipalities();
    console.log('Municipio:' + Municipio + ' Grado:' + GradoIngreso);
    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#inputId").val(IdEstudiante);
    $("#inputCodigo").val(Codigo);
    $("#inputNombres").val(Nombres);
    $("#inputPrimerApellido").val(PrimerApellido);
    $("#inputSegundoApellido").val(SegundoApellido);
    $("#fechaNacimiento").val(FechaNacimiento);

    if (Sexo == "M") { $("#male").attr('checked', true); } else { $("#female").attr('checked', true); }

    $("#inputNIE").val(NIE);
    $("#inputLugarNacimiento").val(LugarNacimiento);
    $("#inputPartidaNacimiento").val(NumeroPartidaNacimiento);
    $("#inputTomo").val(Tomo);
    $("#inputFolio").val(Folio);
    $("#inputLibro").val(Libro);
    $("#sltDepartamento").val(Departamento);
    $('#sltMunicipio').val(Municipio).prop('selected', true);
    $("#inputDireccion").val(Direccion);
    $("#inputLugarInstitucionProcedencia").val(InstitucionProcedencia);
    $("#inputGradoIngreso").val(idgrado);
    $("#sltResponsable").val(IdTransporteResponsable);
    $("#inputCorreoElectronico").val(CorreoEstudiante);
    $("#sltStatus").val(Status);

    $('#avatar-1').fileinput('clear');
    $('#avatar-1').fileinput('destroy');
    CallBackFileInput(Archivofoto,"O");

    $('.nav-tabs a[href="#profile"]').tab('show');
}

function Eliminar() {

    if (IdEstudiante == 0 || IdEstudiante == "") {
        alertify.error("Debe de seleccionar un Alumno");
    } else {
        alertify.confirm("Advertencia", "¿Desea continuar en Elimnar el Alumno?",
            function () {
                //eliminar
            },
            function () {
                //alertify.error('Cancel');
            });
    }
}

function Import() {
    $('#modalHeaderImp').html('Importar Estudiantes');
    $('#modalImportData').modal('show');
}

var IdEstudiante = "";
var codEstudiante = "";
var first = "";
var ultimaFila = null;
var colorOriginalPAR = "#ffffff";
var colorOriginalIMPAR = "#ffe35c";

$('#tblEstudiantes tbody').on('click', 'tr', function () {

    IdEstudiante = $(this).find('td:first').html();
    Codigo = $(this).find('td:nth-child(2)').html();
    Nombres = $(this).find('td:nth-child(3)').html();
    PrimerApellido = $(this).find('td:nth-child(4)').html();
    SegundoApellido = $(this).find('td:nth-child(5)').html();
    FechaNacimiento = $(this).find('td:nth-child(6)').html();
    Edad = $(this).find('td:nth-child(7)').html();
    Sexo = $(this).find('td:nth-child(8)').html();
    NIE = $(this).find('td:nth-child(9)').html();
    LugarNacimiento = $(this).find('td:nth-child(10)').html();
    NumeroPartidaNacimiento = $(this).find('td:nth-child(11)').html();
    Tomo = $(this).find('td:nth-child(12)').html();
    Folio = $(this).find('td:nth-child(13)').html();
    Libro = $(this).find('td:nth-child(14)').html();
    Departamento = $(this).find('td:nth-child(15)').html();
    Municipio = $(this).find('td:nth-child(16)').html();
    Direccion = $(this).find('td:nth-child(17)').html();
    InstitucionProcedencia = $(this).find('td:nth-child(18)').html();
    idgrado = $(this).find('td:nth-child(19)').html();
    GradoIngreso = $(this).find('td:nth-child(20)').html();
    Archivofoto = $(this).find('td:nth-child(21)').html();
    IdTransporteResponsable = $(this).find('td:nth-child(22)').html();
    CorreoEstudiante = $(this).find('td:nth-child(23)').html();
    Status = $(this).find('td:nth-child(24)').html();
    StatusDescription = $(this).find('td:nth-child(25)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});

$("#save").on("click", function () {
    console.log("prueba");
    if ($("#male").is(':checked')) {
        gender = "M";
    } else {
        gender = "F";
    }
    
    var fileInput = document.getElementById('avatar-1');
    var file = fileInput.files[0];
    var formDataUpdate = new FormData();
    formDataUpdate.append('codigo', $("#inputCodigo").val());
    formDataUpdate.append('nombres', $("#inputNombres").val());
    formDataUpdate.append('primerApellido', $("#inputPrimerApellido").val());
    formDataUpdate.append('segundoApellido', $("#inputSegundoApellido").val());
    formDataUpdate.append('fechaNacimiento', $("#fechaNacimiento").val());
    formDataUpdate.append('sexo', gender);
    formDataUpdate.append('nie', $("#inputNIE").val());
    formDataUpdate.append('lugarNacimiento', $("#inputLugarNacimiento").val());
    formDataUpdate.append('numeroPartidaNacimiento', $("#inputPartidaNacimiento").val());
    formDataUpdate.append('tomo', $("#inputTomo").val());
    formDataUpdate.append('folio', $("#inputFolio").val());
    formDataUpdate.append('libro', $("#inputLibro").val());
    formDataUpdate.append('coddpto', $("#sltDepartamento").val());
    formDataUpdate.append('departamento',$("#sltDepartamento option:selected").text());
    formDataUpdate.append('codmuni', $("#sltMunicipio").val());
    formDataUpdate.append('municipio', $("#sltMunicipio option:selected").text());
    formDataUpdate.append('direccion', $("#inputDireccion").val());
    formDataUpdate.append('institucionProcedencia', $("#inputLugarInstitucionProcedencia").val());
    formDataUpdate.append('gradoIngreso', $("#inputGradoIngreso").val());
    formDataUpdate.append('idResponsable', $("#sltResponsable").val());
    formDataUpdate.append('correo', $("#inputCorreoElectronico").val());
    formDataUpdate.append('status', $("#sltStatus").val());

    formDataUpdate.append('file', file);

    $.ajax({
        type: "POST",
        url: "/Estudiantes/AddEstudiante",
        contentType: false,
        processData: false,
        data: formDataUpdate,
        success: function (result) {
            if (result.Res || result.Sae) {
                alertify.success("Alumno Agregado.");
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td hidden>"
                        + item.gradoIngreso + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td><td>"
                        + item.correo + "</td><td hidden>"
                        + item.Status + "</td><td>"
                        + item.estado + "</td></tr>");
                });
                CallBack();
                $('.nav-tabs a[href="#home"]').tab('show');

            } else  {
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td hidden>"
                        + item.gradoIngreso + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td><td>"
                        + item.correo + "</td><td hidden>"
                        + item.Status + "</td><td>"
                        + item.estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar al Alumno o guardarse en SAE.");
            }
            $('.nav-tabs a[href="#home"]').tab('show');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });
});

$("#update").on("click", function () {
   
    if ($("#male").is(':checked')) {
        gender = "M";
    } else {
        gender = "F";
    }
    var fileInputUpdate = document.getElementById('avatar-1');
    var fileUpdate = fileInputUpdate.files[0];
    var formDataUpdate = new FormData();
    formDataUpdate.append('idAlumno', $("#inputId").val());
    formDataUpdate.append('codigo', $("#inputCodigo").val());
    formDataUpdate.append('nombres', $("#inputNombres").val());
    formDataUpdate.append('primerApellido', $("#inputPrimerApellido").val());
    formDataUpdate.append('segundoApellido', $("#inputSegundoApellido").val());
    formDataUpdate.append('fechaNacimiento', $("#fechaNacimiento").val());
    formDataUpdate.append('sexo', gender);
    formDataUpdate.append('nie', $("#inputNIE").val());
    formDataUpdate.append('lugarNacimiento', $("#inputLugarNacimiento").val());
    formDataUpdate.append('numeroPartidaNacimiento', $("#inputPartidaNacimiento").val());
    formDataUpdate.append('tomo', $("#inputTomo").val());
    formDataUpdate.append('folio', $("#inputFolio").val());
    formDataUpdate.append('libro', $("#inputLibro").val());
    formDataUpdate.append('coddpto', $("#sltDepartamento").val());
    formDataUpdate.append('departamento', $("#sltDepartamento option:selected").text());
    formDataUpdate.append('codmuni', $("#sltMunicipio").val());
    formDataUpdate.append('municipio', $("#sltMunicipio option:selected").text());
    formDataUpdate.append('direccion', $("#inputDireccion").val());
    formDataUpdate.append('institucionProcedencia', $("#inputLugarInstitucionProcedencia").val());
    formDataUpdate.append('gradoIngreso', $("#inputGradoIngreso").val());
    formDataUpdate.append('idResponsable', $("#sltResponsable").val());
    formDataUpdate.append('correo', $("#inputCorreoElectronico").val());
    formDataUpdate.append('status', $("#sltStatus").val());
    formDataUpdate.append('file', fileUpdate);

    $.ajax({
        type: "POST",
        //traditional: true,//con el formDate este se comenta
        url: "/Estudiantes/UpdateEstudiante",
        // contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        //data: JSON.stringify(datos),

        contentType: false, //importante enviar este parametro en false
        processData: false,
        data: formDataUpdate,
        success: function (result) {
            if (result.Res) {
                alertify.success("Alumno Actualizado.");
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td hidden>"
                        + item.gradoIngreso + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td><td>"
                        + item.correo + "</td><td hidden>"
                        + item.Status + "</td><td>"
                        + item.estado + "</td></tr>");
                });
                CallBack();
            } else {
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td hidden>"
                        + item.gradoIngreso + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td><td>"
                        + item.correo + "</td><td hidden>"
                        + item.Status + "</td><td>"
                        + item.estado + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Estudiante");
            }
            $('.nav-tabs a[href="#home"]').tab('show');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });

});

$("#cancel").on("click", function () {
    $('.nav-tabs a[href="#home"]').tab('show');
});

function Sync() {
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Estudiantes/SyncEstudiantes",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        //data: JSON.stringify(datos),

        //contentType: false, //importante enviar este parametro en false
        //processData: false,
        //data: formData,
        success: function (result) {
            if (result.Res) {
                alertify.success("Alumno Agregado.");
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td>"
                        + item.gradoIngreso + "</td><td hidden>"
                        + item.descripcion + "</td><td>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td hidden>"
                        + item.correo + "</td><td></tr>");
                });
                CallBack();
            } else {
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td>"
                        + item.gradoIngreso + "</td><td hidden>"
                        + item.descripcion + "</td><td>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td hidden>"
                        + item.correo + "</td><td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar al Alumno.");
            }
            $('.nav-tabs a[href="#home"]').tab('show');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });


}

function LoadMunicipalities() {

    var deptoval = $("#sltDepartamento").val();
    console.log(deptoval)
    var datos = {
        state: deptoval
    }
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Estudiantes/LoadMunicipalities",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        data: JSON.stringify(datos),
       // contentType: false, //importante enviar este parametro en false
        success: function (result) {
            document.getElementById("sltMunicipio").options.length = 0;
            if (result.Status == 0) {
                $.each(result.ListMunicipalities, function (i, item) {
                    $('#sltMunicipio').append($('<option>', {
                        value: item.IdMunicipio,
                        text: item.Municipio
                    }));
                });
            } else {
                alertify.error(result.Msj);
                $('.nav-tabs a[href="#home"]').tab('show');
            }                
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });
}
    
function LoadAllMunicipalities() {

    //var deptoval = $("#sltDepartamento").val();
    //console.log(deptoval)
    //var datos = {
    //    state: deptoval
    //}
    $.ajax({
        type: "POST",
        traditional: true,//con el formDate este se comenta
        url: "/Estudiantes/LoadAllMunicipalities",
        contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        //data: JSON.stringify(datos),
        // contentType: false, //importante enviar este parametro en false
        success: function (result) {
            document.getElementById("sltMunicipio").options.length = 0;
            if (result.Status == 0) {
                $.each(result.ListMunicipalities, function (i, item) {
                    $('#sltMunicipio').append($('<option>', {
                        value: item.IdMunicipio,
                        text: item.Municipio
                    }));
                });
            } else {
                alertify.error(result.Msj);
                $('.nav-tabs a[href="#home"]').tab('show');
            }
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });
}

function CambiarEstadoMd() {
    $("#mdCambioEstado").modal('show');
}
  
function CambiarEstado() {
    $("#mdCambioEstado").modal('hide');
    $("#mdCambioEstado").hide();
    var estado = $('#sltUStatus').val();

    var datos = {
        idestudiante: IdEstudiante,
        op: estado
    }

    $.ajax({
        type: "POST",
        traditional: true,
        url: '/Estudiantes/ChangeStatus',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(datos),
        success: function (result) {
            if (result.Status == 0) {
                alertify.success(result.Msj);
                $('#tblEstudiantes').DataTable().destroy();
                $('#tblEstudiantes tbody').empty();
                $.each(result.Estudiantes, function (i, item) {
                    /* Vamos agregando a nuestra tabla las filas necesarias */
                    var fechaNac = moment(item.fechaNacimiento).format('DD/MM/YYYY');
                    $('#tblEstudiantes tbody').append("<tr class='even pointer'><td>" + item.idAlumno + "</td><td>"
                        + item.codigo + "</td><td>"
                        + item.nombres + "</td><td>"
                        + item.primerApellido + "</td><td>"
                        + item.segundoApellido + "</td><td>"
                        + fechaNac + "</td><td hidden>"
                        + item.edad + "</td><td hidden>"
                        + item.sexo + "</td><td>"
                        + item.nie + "</td><td hidden>"
                        + item.lugarNacimiento + "</td><td hidden>"
                        + item.numeroPartidaNacimiento + "</td><td hidden>"
                        + item.tomo + "</td><td hidden>"
                        + item.folio + "</td><td hidden>"
                        + item.libro + "</td><td hidden>"
                        + item.departamento + "</td><td hidden>"
                        + item.municipio + "</td><td hidden>"
                        + item.direccion + "</td><td hidden>"
                        + item.institucionProcedencia + "</td><td hidden>"
                        + item.gradoIngreso + "</td><td>"
                        + item.descripcion + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td><td>"
                        + item.correo + "</td><td hidden>"
                        + item.Status + "</td><td>"
                        + item.estado + "</td></tr>");
                });
                CallBack();
            } else {
                alertify.error(result.Msj);
            }
            $('.nav-tabs a[href="#home"]').tab('show');
        },
        error: function () {
            alertify.error("Ha ocurrido un error. Actualice la página.");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });
}