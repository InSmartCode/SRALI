
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
    defaultPreviewContent: '<img src="Content/images/user.png" alt="Your Avatar">',
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

function CallBackFileInput(img, opc) {
    if (opc == "D") {
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
            defaultPreviewContent: '<img src="Content/images/' + img + '" alt="Tu Imagen">',
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
            defaultPreviewContent: '<img src="Resources/FotosEstudiantes/' + img + '" width=215" height="275" alt="Tu Imagen" >',
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
        GradoIngreso = $(this).find('td:nth-child(19)').html();
        Archivofoto = $(this).find('td:nth-child(20)').html();
        IdTransporteResponsable = $(this).find('td:nth-child(21)').html();

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
    $("#inputEdad").val("");

    $("#male").attr('checked', true);

    $("#inputNIE").val("");
    $("#inputLugarNacimiento").val("");
    $("#inputPartidaNacimiento").val("");
    $("#inputTomo").val("");
    $("#inputFolio").val("");
    $("#inputLibro").val("");
    $("#sltDepartamento").val("0");
    $("#sltMunicipio").val("0");
    $("#inputDireccion").val("");
    $("#inputLugarInstitucionProcedencia").val("");
    $("#inputGradoIngreso").val("");
    $("#sltResponsable").val("0");


    $('#avatar-1').fileinput('clear');
    $('#avatar-1').fileinput('destroy');
    CallBackFileInput("user.png","D");
}

function Nuevo() {

    $('#save').prop("hidden", false);
    $('#update').prop("hidden", true);

    limpiarDatos();

    $('.nav-tabs a[href="#profile"]').tab('show');
}

function Editar() {

    $('#save').prop("hidden", true);
    $('#update').prop("hidden", false);

    $("#inputId").val(IdEstudiante);
    $("#inputCodigo").val(Codigo);
    $("#inputNombres").val(Nombres);
    $("#inputPrimerApellido").val(PrimerApellido);
    $("#inputSegundoApellido").val(SegundoApellido);
    $("#fechaNacimiento").val(FechaNacimiento);
    $("#inputEdad").val(Edad);

    if (Sexo == "M") { $("#male").attr('checked', true); } else { $("#female").attr('checked', true); }

    $("#inputNIE").val(NIE);
    $("#inputLugarNacimiento").val(LugarNacimiento);
    $("#inputPartidaNacimiento").val(NumeroPartidaNacimiento);
    $("#inputTomo").val(Tomo);
    $("#inputFolio").val(Folio);
    $("#inputLibro").val(Libro);
    $("#sltDepartamento").val(Departamento);
    $("#sltMunicipio").val(Municipio);
    $("#inputDireccion").val(Direccion);
    $("#inputLugarInstitucionProcedencia").val(InstitucionProcedencia);
    $("#inputGradoIngreso").val(GradoIngreso);
    $("#sltResponsable").val(IdTransporteResponsable);

    $('#avatar-1').fileinput('clear');
    $('#avatar-1').fileinput('destroy');
    CallBackFileInput(Archivofoto,"O");

    $('.nav-tabs a[href="#profile"]').tab('show');
}

function Eliminar() {

    if (IdEstudiante == 0 || IdEstudiante == "") {
        alertify.error("Debe de seleccionar un Doctor");
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
    GradoIngreso = $(this).find('td:nth-child(19)').html();
    Archivofoto = $(this).find('td:nth-child(20)').html();
    IdTransporteResponsable = $(this).find('td:nth-child(21)').html();

    if (ultimaFila != null) {
        ultimaFila.css('background-color', colorOriginalPAR);
    }

    $(this).css('background-color', '#ffe35c');
    ultimaFila = $(this);

    $('#btnEdit').prop("disabled", false);
});


$("#save").on("click", function () {
    if ($("#male").is(':checked')) {
        gender = "M";
    } else {
        gender = "F";
    }
    var fileInput = document.getElementById('avatar-1');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('codigo', $("#inputCodigo").val());
    formData.append('nombres', $("#inputNombres").val());
    formData.append('primerApellido', $("#inputPrimerApellido").val());
    formData.append('segundoApellido', $("#inputSegundoApellido").val());
    formData.append('fechaNacimiento', $("#fechaNacimiento").val());
    formData.append('edad', $("#inputEdad").val());
    formData.append('sexo', gender);
    formData.append('nie', $("#inputNIE").val());
    formData.append('lugarNacimiento', $("#inputLugarNacimiento").val());
    formData.append('numeroPartidaNacimiento', $("#inputPartidaNacimiento").val());
    formData.append('tomo', $("#inputTomo").val());
    formData.append('folio', $("#inputFolio").val());
    formData.append('libro', $("#inputLibro").val());
    formData.append('departamento', $("#sltDepartamento").val());
    formData.append('municipio', $("#sltMunicipio").val());
    formData.append('direccion', $("#inputDireccion").val());
    formData.append('institucionProcedencia', $("#inputLugarInstitucionProcedencia").val());
    formData.append('gradoIngreso', $("#inputGradoIngreso").val());
    formData.append('idResponsable', $("#sltResponsable").val());
    formData.append('file', file);
/*
    datos = {
        //id: $("#IdEstudiante").val(),
          codigo: $("#inputCodigo").val()
        , nombres: $("#inputNombres").val()
        , primerApellido: $("#inputPrimerApellido").val()
        , segundoApellido: $("#inputSegundoApellido").val()
        , fechaNacimiento: $("#fechaNacimiento").val()
        , edad: $("#inputEdad").val()
        , sexo: gender
        , nie: $("#inputNIE").val()
        , lugarNacimiento: $("#inputLugarNacimiento").val()
        , numeroPartidaNacimiento: $("#inputPartidaNacimiento").val()
        , tomo: $("#inputTomo").val()
        , folio: $("#inputFolio").val()
        , libro: $("#inputLibro").val()
        , departamento: $("#sltDepartamento").val()
        , municipio: $("#sltMunicipio").val()
        , direccion: $("#inputDireccion").val()
        , institucionProcedencia: $("#inputLugarInstitucionProcedencia").val()
        , gradoIngreso: $("#inputGradoIngreso").val()
        , idResponsable: $("#sltResponsable").val()
        , file: file
    }*/
    $.ajax({
        type: "POST",
        //traditional: true,//con el formDate este se comenta
        url: "/Estudiantes/AddEstudiante",
       // contentType: "application/json; charset=utf-8",//con el formDate este se comenta
        //data: JSON.stringify(datos),

        //contentType: false, //importante enviar este parametro en false
        //processData: false,
        data: formData,
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
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td></tr>");
                });
                CallBack();
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
                        + item.institucionProcedencia + "</td><td>"
                        + item.gradoIngreso + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Doctor");
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
    formDataUpdate.append('edad', $("#inputEdad").val());
    formDataUpdate.append('sexo', gender);
    formDataUpdate.append('nie', $("#inputNIE").val());
    formDataUpdate.append('lugarNacimiento', $("#inputLugarNacimiento").val());
    formDataUpdate.append('numeroPartidaNacimiento', $("#inputPartidaNacimiento").val());
    formDataUpdate.append('tomo', $("#inputTomo").val());
    formDataUpdate.append('folio', $("#inputFolio").val());
    formDataUpdate.append('libro', $("#inputLibro").val());
    formDataUpdate.append('departamento', $("#sltDepartamento").val());
    formDataUpdate.append('municipio', $("#sltMunicipio").val());
    formDataUpdate.append('direccion', $("#inputDireccion").val());
    formDataUpdate.append('institucionProcedencia', $("#inputLugarInstitucionProcedencia").val());
    formDataUpdate.append('gradoIngreso', $("#inputGradoIngreso").val());
    formDataUpdate.append('idResponsable', $("#sltResponsable").val());
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
                        + item.institucionProcedencia + "</td><td>"
                        + item.gradoIngreso + "</td><td hidden>"
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td></tr>");
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
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Doctor");
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
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td></tr>");
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
                        + item.archivofoto + "</td><td hidden>"
                        + item.idTransporteResponsable + "</td></tr>");
                });
                CallBack();
                alertify.error("Ha ocurrido un error al agregar el Doctor");
            }
            $('.nav-tabs a[href="#home"]').tab('show');
        },
        error: function () {
            alertify.error("Ha ocurrido un error");
            $('.nav-tabs a[href="#home"]').tab('show');
        }
    });
}