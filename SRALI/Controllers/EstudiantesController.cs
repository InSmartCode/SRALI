using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SRALI.Models;
using SRALI.Utilities;
using SRALI.Services;
using SpreadsheetLight;

namespace SRALI.Controllers
{
    public class EstudiantesController : Controller
    {
        ConsultasMoodle sm = new ConsultasMoodle();
        SARADB_Entities db = new SARADB_Entities();
        SaveImage SaveImage = new SaveImage();

        public bool CheckSession()
        {
            try
            {
                if (String.IsNullOrEmpty(Session["IdUsurio"].ToString()))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }

        }

        // GET: Estudiantes
        public ActionResult Index()
        {
            if (CheckSession())
            {
                ViewBag.Estudiantes = (from b in db.tblEstudiante select b).ToList();
                ViewBag.Representantes = (from b in db.tblResponsableEstudiante select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult AddEstudiante(string codigo, string nombres, string primerApellido, string segundoApellido, string fechaNacimiento, int edad, string sexo, string nie,
                                        string lugarNacimiento, string numeroPartidaNacimiento, string tomo, string folio, string libro, string departamento, string municipio,
                                        string direccion, string institucionProcedencia, string gradoIngreso, int idResponsable, HttpPostedFileBase file)
        {
            JsonResult jr = new JsonResult();
            try
            {
                string adjunto = "";
                if (file != null)
                {
                    adjunto = "IMG_" + codigo + Path.GetExtension(file.FileName);
                    //file.SaveAs(Path.GetTempPath() + adjunto);
                    file.SaveAs("C:\\Users\\HP\\Documents\\Visual Studio 2019\\Projects\\SRALI\\SRALI\\Resources\\FotosEstudiantes\\" + adjunto);
                    //var data = SaveImage.SendImage(adjunto, Path.GetTempPath() + adjunto).ToString();
                }
                tblEstudiante Estudiante = new tblEstudiante();

                Estudiante.codigo = codigo;
                Estudiante.nombres = nombres;
                Estudiante.primerApellido = primerApellido;
                Estudiante.segundoApellido = segundoApellido;
                Estudiante.fechaNacimiento = Convert.ToDateTime(fechaNacimiento);
                Estudiante.edad = edad;
                Estudiante.sexo = sexo;
                Estudiante.nie = nie;
                Estudiante.lugarNacimiento = lugarNacimiento;
                Estudiante.numeroPartidaNacimiento = numeroPartidaNacimiento;
                Estudiante.tomo = tomo;
                Estudiante.folio = folio;
                Estudiante.libro = libro;
                Estudiante.departamento = departamento;
                Estudiante.municipio = municipio;
                Estudiante.direccion = direccion;
                Estudiante.institucionProcedencia = institucionProcedencia;
                Estudiante.gradoIngreso = gradoIngreso;
                Estudiante.archivofoto = adjunto;
                Estudiante.idResponsable = idResponsable;

                Estudiante.fechaCreacion = DateTime.Now;
                Estudiante.creadoPor = Session["IdUsurio"].ToString();
                db.tblEstudiante.Add(Estudiante);
                db.SaveChanges();
                var Estudiantes = (from b in db.tblEstudiante
                                   select new
                                   {
                                       b.idAlumno,
                                       b.codigo,
                                       b.nombres,
                                       b.primerApellido,
                                       b.segundoApellido,
                                       b.fechaNacimiento,
                                       b.edad,
                                       b.sexo,
                                       b.nie,
                                       b.lugarNacimiento,
                                       b.numeroPartidaNacimiento,
                                       b.tomo,
                                       b.folio,
                                       b.libro,
                                       b.departamento,
                                       b.municipio,
                                       b.direccion,
                                       b.institucionProcedencia,
                                       b.archivofoto,
                                       b.gradoIngreso,
                                       b.idResponsable
                                   }).ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Estudiantes = (from b in db.tblEstudiante
                                   select new
                                   {
                                       b.idAlumno,
                                       b.codigo,
                                       b.nombres,
                                       b.primerApellido,
                                       b.segundoApellido,
                                       b.fechaNacimiento,
                                       b.edad,
                                       b.sexo,
                                       b.nie,
                                       b.lugarNacimiento,
                                       b.numeroPartidaNacimiento,
                                       b.tomo,
                                       b.folio,
                                       b.libro,
                                       b.departamento,
                                       b.municipio,
                                       b.direccion,
                                       b.institucionProcedencia,
                                       b.archivofoto,
                                       b.gradoIngreso,
                                       b.idResponsable
                                   }).ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = false };
                return jr;
            }
        }
        public JsonResult UpdateEstudiante(int idAlumno, string codigo, string nombres, string primerApellido, string segundoApellido, string fechaNacimiento, int edad, string sexo, string nie,
                                        string lugarNacimiento, string numeroPartidaNacimiento, string tomo, string folio, string libro, string departamento, string municipio,
                                        string direccion, string institucionProcedencia, string gradoIngreso, int idResponsable, HttpPostedFileBase file)
        {
            JsonResult jr = new JsonResult();
            try
            {
                string adjunto = "";
                if (file != null)
                {
                    adjunto = "IMG_" + codigo + Path.GetExtension(file.FileName);
                    //file.SaveAs(Path.GetTempPath() + adjunto);
                    file.SaveAs("C:\\Users\\HP\\Documents\\Visual Studio 2019\\Projects\\SRALI\\SRALI\\Resources\\FotosEstudiantes\\" + adjunto);
                    //var data = SaveImage.SendImage(adjunto, Path.GetTempPath() + adjunto).ToString();
                }
                var OldEstudiante = (from p in db.tblEstudiante where p.idAlumno == idAlumno select p).FirstOrDefault();

                //OldEstudiante.codigo = codigo;
                OldEstudiante.nombres = nombres;
                OldEstudiante.primerApellido = primerApellido;
                OldEstudiante.segundoApellido = segundoApellido;
                OldEstudiante.fechaNacimiento = Convert.ToDateTime(fechaNacimiento);
                OldEstudiante.edad = edad;
                OldEstudiante.sexo = sexo;
                OldEstudiante.nie = nie;
                OldEstudiante.lugarNacimiento = lugarNacimiento;
                OldEstudiante.numeroPartidaNacimiento = numeroPartidaNacimiento;
                OldEstudiante.tomo = tomo;
                OldEstudiante.folio = folio;
                OldEstudiante.libro = libro;
                OldEstudiante.departamento = departamento;
                OldEstudiante.municipio = municipio;
                OldEstudiante.direccion = direccion;
                OldEstudiante.institucionProcedencia = institucionProcedencia;
                OldEstudiante.gradoIngreso = gradoIngreso;
                if (adjunto != "") { OldEstudiante.archivofoto = adjunto; }
                OldEstudiante.idResponsable = idResponsable;
                OldEstudiante.actualizadoPor = Session["IdUsurio"].ToString();
                OldEstudiante.fechaActualizado = DateTime.Now;

                db.SaveChanges();
                var Estudiantes = (from b in db.tblEstudiante
                                   select new
                                   {
                                       b.idAlumno,
                                       b.codigo,
                                       b.nombres,
                                       b.primerApellido,
                                       b.segundoApellido,
                                       b.fechaNacimiento,
                                       b.edad,
                                       b.sexo,
                                       b.nie,
                                       b.lugarNacimiento,
                                       b.numeroPartidaNacimiento,
                                       b.tomo,
                                       b.folio,
                                       b.libro,
                                       b.departamento,
                                       b.municipio,
                                       b.direccion,
                                       b.institucionProcedencia,
                                       b.archivofoto,
                                       b.gradoIngreso,
                                       b.idResponsable
                                   }).ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Estudiantes = (from b in db.tblEstudiante
                                   select new
                                   {
                                       b.idAlumno,
                                       b.codigo,
                                       b.nombres,
                                       b.primerApellido,
                                       b.segundoApellido,
                                       b.fechaNacimiento,
                                       b.edad,
                                       b.sexo,
                                       b.nie,
                                       b.lugarNacimiento,
                                       b.numeroPartidaNacimiento,
                                       b.tomo,
                                       b.folio,
                                       b.libro,
                                       b.departamento,
                                       b.municipio,
                                       b.direccion,
                                       b.institucionProcedencia,
                                       b.archivofoto,
                                       b.gradoIngreso,
                                       b.idResponsable
                                   }).ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = false };
                return jr;
            }
        }



        public ActionResult Responsable()
        {
            ViewBag.Representantes = (from b in db.tblResponsableEstudiante select b).ToList();
            return View();
        }

        public JsonResult AddResponsable(tblResponsableEstudiante Responsable)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OldResponsable = (from p in db.tblResponsableEstudiante where p.dui == Responsable.dui select p).FirstOrDefault();

                if (OldResponsable==null)
                {
                    Responsable.fechaCreacion = DateTime.Now;
                    Responsable.creadoPor = Session["IdUsurio"].ToString();
                    db.tblResponsableEstudiante.Add(Responsable);
                    db.SaveChanges();
                }
                
                var Responsables = (from b in db.tblResponsableEstudiante
                                    select new
                                   {
                                       b.idResponsable,
                                       b.nombres,
                                       b.apellidos,
                                       b.telefonoFijo,
                                       b.telefonoMovil,
                                       b.dui,
                                       b.microbus,
                                       b.telefonoFijoMicrobus,
                                       b.telefonoMovilMicrobus,
                                       b.numeroPlaca,
                                       b.marca
                                   }).ToList();
              
                jr.Data = new { Responsables = Responsables, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Responsables = (from b in db.tblResponsableEstudiante
                                    select new
                                    {
                                        b.idResponsable,
                                        b.nombres,
                                        b.apellidos,
                                        b.telefonoFijo,
                                        b.telefonoMovil,
                                        b.dui,
                                        b.microbus,
                                        b.telefonoFijoMicrobus,
                                        b.telefonoMovilMicrobus,
                                        b.numeroPlaca,
                                        b.marca
                                    }).ToList();
                jr.Data = new { Responsables = Responsables, Res = false };
                return jr;
            }
        }


        public JsonResult UpdateResponsable(tblResponsableEstudiante Responsable)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldResponsable = (from p in db.tblResponsableEstudiante where p.idResponsable == Responsable.idResponsable select p).FirstOrDefault();

                OldResponsable.nombres = Responsable.nombres;
                OldResponsable.apellidos = Responsable.apellidos;
                OldResponsable.telefonoFijo = Responsable.telefonoFijo;
                OldResponsable.telefonoMovil = Responsable.telefonoMovil;
                OldResponsable.dui = Responsable.dui;
                OldResponsable.microbus = Responsable.microbus;
                OldResponsable.telefonoFijoMicrobus = Responsable.telefonoFijoMicrobus;
                OldResponsable.telefonoMovilMicrobus = Responsable.telefonoMovilMicrobus;
                OldResponsable.numeroPlaca = Responsable.numeroPlaca;
                OldResponsable.marca = Responsable.marca;
                OldResponsable.actualizadoPor = Session["IdUsurio"].ToString();
                OldResponsable.fechaActualizado = DateTime.Now;

                db.SaveChanges();
                var Responsables = (from b in db.tblResponsableEstudiante
                                    select new
                                    {
                                        b.idResponsable,
                                        b.nombres,
                                        b.apellidos,
                                        b.telefonoFijo,
                                        b.telefonoMovil,
                                        b.dui,
                                        b.microbus,
                                        b.telefonoFijoMicrobus,
                                        b.telefonoMovilMicrobus,
                                        b.numeroPlaca,
                                        b.marca
                                    }).ToList();
                jr.Data = new { Responsables = Responsables, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Responsables = (from b in db.tblResponsableEstudiante
                                    select new
                                    {
                                        b.idResponsable,
                                        b.nombres,
                                        b.apellidos,
                                        b.telefonoFijo,
                                        b.telefonoMovil,
                                        b.dui,
                                        b.microbus,
                                        b.telefonoFijoMicrobus,
                                        b.telefonoMovilMicrobus,
                                        b.numeroPlaca,
                                        b.marca
                                    }).ToList();
                jr.Data = new { Responsables = Responsables, Res = false };
                return jr;
            }
        }

        public JsonResult DeleteResponsable(int idResponsable)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldResponsable = (from p in db.tblResponsableEstudiante where p.idResponsable == idResponsable select p).FirstOrDefault();


                db.tblResponsableEstudiante.Remove(OldResponsable);
                db.SaveChanges();
                var Responsables = (from b in db.tblResponsableEstudiante
                                    select new
                                    {
                                        b.idResponsable,
                                        b.nombres,
                                        b.apellidos,
                                        b.telefonoFijo,
                                        b.telefonoMovil,
                                        b.dui,
                                        b.microbus,
                                        b.telefonoFijoMicrobus,
                                        b.telefonoMovilMicrobus,
                                        b.numeroPlaca,
                                        b.marca
                                    }).ToList();
                jr.Data = new { Responsables = Responsables, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Responsables = (from b in db.tblResponsableEstudiante
                                    select new
                                    {
                                        b.idResponsable,
                                        b.nombres,
                                        b.apellidos,
                                        b.telefonoFijo,
                                        b.telefonoMovil,
                                        b.dui,
                                        b.microbus,
                                        b.telefonoFijoMicrobus,
                                        b.telefonoMovilMicrobus,
                                        b.numeroPlaca,
                                        b.marca
                                    }).ToList();
                jr.Data = new { Responsables = Responsables, Res = false };
                return jr;
            }
        }

        public JsonResult SyncEstudiantes()
        {
            JsonResult jr = new JsonResult();
            try
            {
                sm.ObtenerAlumnos();

                var Estudiantes = (from b in db.tblEstudiante
                                   select new
                                   {
                                       b.idAlumno,
                                       b.codigo,
                                       b.nombres,
                                       b.primerApellido,
                                       b.segundoApellido,
                                       b.fechaNacimiento,
                                       b.edad,
                                       b.sexo,
                                       b.nie,
                                       b.lugarNacimiento,
                                       b.numeroPartidaNacimiento,
                                       b.tomo,
                                       b.folio,
                                       b.libro,
                                       b.departamento,
                                       b.municipio,
                                       b.direccion,
                                       b.institucionProcedencia,
                                       b.archivofoto,
                                       b.gradoIngreso,
                                       b.idResponsable
                                   }).ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Estudiantes = (from b in db.tblEstudiante
                                   select new
                                   {
                                       b.idAlumno,
                                       b.codigo,
                                       b.nombres,
                                       b.primerApellido,
                                       b.segundoApellido,
                                       b.fechaNacimiento,
                                       b.edad,
                                       b.sexo,
                                       b.nie,
                                       b.lugarNacimiento,
                                       b.numeroPartidaNacimiento,
                                       b.tomo,
                                       b.folio,
                                       b.libro,
                                       b.departamento,
                                       b.municipio,
                                       b.direccion,
                                       b.institucionProcedencia,
                                       b.archivofoto,
                                       b.gradoIngreso,
                                       b.idResponsable
                                   }).ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = false };
                return jr;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ImportData(HttpPostedFileBase file) // El nombre del parámetro debe ser el mismo al del elemento que lo envía (<input />)
        {

            string filePath = string.Empty;
            Random rnd = new Random();

            if (file != null && file.ContentLength > 0)
            {
                string path = Server.MapPath("~/Uploads/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }

                filePath = path + "PP" + rnd.Next(100000).ToString() + ".xlsx"; // Le generamos un nombre en base a un número aleatorio entre 0 y 100,000
                file.SaveAs(filePath);

                SLDocument sheet = new SLDocument(filePath);

                int idRow = 2;

                while (!string.IsNullOrEmpty(sheet.GetCellValueAsString(idRow, 1)))
                {
                    try
                    {
                        tblEstudiante registro = new tblEstudiante();
                        registro.codigo = sheet.GetCellValueAsString(idRow, 1);
                        registro.nombres = sheet.GetCellValueAsString(idRow, 2);
                        registro.primerApellido = sheet.GetCellValueAsString(idRow, 3);
                        registro.segundoApellido = sheet.GetCellValueAsString(idRow, 4);
                        registro.fechaNacimiento = Convert.ToDateTime(sheet.GetCellValueAsString(idRow, 5));
                        registro.edad = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 6));
                        registro.sexo = sheet.GetCellValueAsString(idRow, 7);
                        registro.nie = sheet.GetCellValueAsString(idRow, 8);
                        registro.lugarNacimiento = sheet.GetCellValueAsString(idRow, 9);
                        registro.numeroPartidaNacimiento = sheet.GetCellValueAsString(idRow, 10);
                        registro.tomo = sheet.GetCellValueAsString(idRow, 11);
                        registro.folio = sheet.GetCellValueAsString(idRow, 12);
                        registro.libro = sheet.GetCellValueAsString(idRow, 13);
                        registro.departamento = sheet.GetCellValueAsString(idRow, 14);
                        registro.municipio = sheet.GetCellValueAsString(idRow, 14);
                        registro.direccion = sheet.GetCellValueAsString(idRow, 15);
                        registro.institucionProcedencia = sheet.GetCellValueAsString(idRow, 16);
                        registro.gradoIngreso = sheet.GetCellValueAsString(idRow, 17);
                        registro.correo = sheet.GetCellValueAsString(idRow, 18);


                        var OldItem = (from p in db.tblEstudiante where p.codigo == registro.codigo select p).FirstOrDefault();
                        if (OldItem == null)
                        {
                            db.tblEstudiante.Add(registro);
                            db.SaveChanges();
                        }
                    }
                    catch (Exception e)
                    {

                        return RedirectToAction("Index");
                    }

                    idRow++;
                }

                try
                {
                    if (System.IO.File.Exists(filePath))
                    {
                        System.IO.File.Delete(filePath); // Eliminamos el archivo
                    }
                }
                catch (Exception e)
                {
                    return RedirectToAction("Index");
                }

                return RedirectToAction("Index");
            }
            else
            {
                //return View();
                return RedirectToAction("Index");
            }
        }

    }
}