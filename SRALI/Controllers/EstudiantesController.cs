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
        SAE7Entities dbsae = new SAE7Entities();
        SaveImage SaveImage = new SaveImage();
        private SyncEstudiante sync = new SyncEstudiante();

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
                ViewBag.Estudiantes = db.SP_ObtenerEstudiantes().ToList();
                ViewBag.Grados = (from g in db.tblGrado select g).ToList();
                ViewBag.Representantes = (from b in db.tblResponsableEstudiante select b).ToList();
                ViewBag.Departamentos = (from d in db.tblDepartamento select d).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }


        public JsonResult AddEstudiante(string codigo, string nombres, string primerApellido, string segundoApellido, string fechaNacimiento, string sexo, string nie,
                                        string lugarNacimiento, string numeroPartidaNacimiento, string tomo, string folio, string libro,string coddpto, string departamento, string codmuni, string municipio,
                                        string direccion, string institucionProcedencia, string gradoIngreso, int idResponsable, string correo, string status, HttpPostedFileBase file)
        {
            JsonResult jr = new JsonResult();            
            try
            {
                bool sae = false;
                string adjunto = "";
                if (file != null)
                {
                    var ruta = (from p in db.tbl_Parametros where p.IdParametro == 10 select p.Parametro).FirstOrDefault();
                    adjunto = "IMG_" + codigo + Path.GetExtension(file.FileName);
                    //file.SaveAs(Path.GetTempPath() + adjunto);
                    //file.SaveAs("C:\\Users\\drivas\\Documents\\Visual Studio 2019\\Projects\\SRALI\\SRALI\\Resources\\FotosEstudiantes\\" + adjunto);
                    file.SaveAs(ruta + adjunto);
                    //var data = SaveImage.SendImage(adjunto, Path.GetTempPath() + adjunto).ToString();
                }
                //buscamos la clave mayor + 1 en sae de la tabla clie01 para asignarsela a este nuevo estudiante
                var maxid = sync.GetMaxIdSAEStudent() + 1;
                var clavesaestudent = sync.SetClaveStudent(maxid);
                tblEstudiante Estudiante = new tblEstudiante();

                Estudiante.codigo = codigo;
                Estudiante.nombres = nombres;
                Estudiante.primerApellido = primerApellido;
                Estudiante.segundoApellido = segundoApellido;
                Estudiante.fechaNacimiento = Convert.ToDateTime(fechaNacimiento);
                Estudiante.sexo = sexo;
                Estudiante.nie = nie;
                Estudiante.lugarNacimiento = lugarNacimiento;
                Estudiante.numeroPartidaNacimiento = numeroPartidaNacimiento;
                Estudiante.tomo = tomo;
                Estudiante.folio = folio;
                Estudiante.libro = libro;
                Estudiante.departamento = coddpto;
                Estudiante.municipio = codmuni;
                Estudiante.direccion = direccion;
                Estudiante.institucionProcedencia = institucionProcedencia;
                Estudiante.gradoIngreso = Convert.ToInt32(gradoIngreso);
                Estudiante.archivofoto = adjunto;
                Estudiante.idResponsable = idResponsable;
                Estudiante.correo = correo;
                Estudiante.codigoSAE = clavesaestudent;
                Estudiante.Status = status;
                Estudiante.fechaCreacion = DateTime.Now;
                Estudiante.creadoPor = Session["IdUsurio"].ToString();
                db.tblEstudiante.Add(Estudiante);
                db.SaveChanges();

                //guardamos el estudiante en sae                
                CLIE01 esae = new CLIE01();
                esae.CLAVE = clavesaestudent;
                esae.STATUS = "A";
                esae.NOMBRE = primerApellido + " " + segundoApellido + " " + nombres;
                esae.CALLE = direccion;
                esae.MUNICIPIO = municipio;
                esae.ESTADO = departamento;
                esae.PAIS = "EL SALVADOR";
                esae.CLASIFIC = "";
                esae.IMPRIR = "S";
                esae.MAIL = "S";
                esae.NIVELSEC = 0;
                esae.ENVIOSILEN = "N";
                esae.CON_CREDITO = "N";
                esae.DIASCRED = 0;
                esae.LIMCRED = 0;
                esae.SALDO = 0;
                esae.TIPO_EMPRESA = "M";
                esae.MATRIZ = sync.SetClaveStudent(maxid);
                esae.PROSPECTO = "N";
                esae.DES_IMPU1 = "N";
                esae.DES_IMPU2 = "N";
                esae.DES_IMPU3 = "N";
                esae.DES_IMPU4 = "N";
                esae.DES_PER = "N";
                esae.LAT_GENERAL = 0;
                esae.LON_GENERAL = 0;
                esae.LAT_ENVIO = 0;
                esae.LON_ENVIO = 0;
                dbsae.CLIE01.Add(esae);
                dbsae.SaveChanges();

                //agregamos el registro de campos libres
                CLIE_CLIB01 clib = new CLIE_CLIB01();
                clib.CVE_CLIE = clavesaestudent;
                dbsae.CLIE_CLIB01.Add(clib);
                dbsae.SaveChanges();

                sae = true;
                var Estudiantes = db.SP_ObtenerEstudiantes().ToList();

                jr.Data = new { Estudiantes = Estudiantes, Res = true, Sae = sae};
                return jr;
            }
            catch (Exception ex)
            {
                var Estudiantes = db.SP_ObtenerEstudiantes().ToList();
                jr.Data = new { Estudiantes = Estudiantes, Res = false };
                return jr;
            }
        }
        public JsonResult UpdateEstudiante(int idAlumno, string codigo, string nombres, string primerApellido, string segundoApellido, string fechaNacimiento, string sexo, string nie,
                                        string lugarNacimiento, string numeroPartidaNacimiento, string tomo, string folio, string libro, string coddpto, string departamento, string codmuni, string municipio,
                                        string direccion, string institucionProcedencia, string gradoIngreso, int idResponsable, string correo, string status, HttpPostedFileBase file)
        {
            JsonResult jr = new JsonResult();
            try
            {
                bool flgsae = false;
                string adjunto = "";
                if (file != null)
                {
                    var ruta = (from p in db.tbl_Parametros where p.IdParametro == 10 select p.Parametro).FirstOrDefault();
                    adjunto = "IMG_" + codigo + Path.GetExtension(file.FileName);
                    file.SaveAs(ruta + adjunto);
                }
                var OldEstudiante = (from p in db.tblEstudiante where p.idAlumno == idAlumno select p).FirstOrDefault();
                
                OldEstudiante.nombres = nombres;
                OldEstudiante.primerApellido = primerApellido;
                OldEstudiante.segundoApellido = segundoApellido;
                OldEstudiante.fechaNacimiento = Convert.ToDateTime(fechaNacimiento);
                OldEstudiante.sexo = sexo;
                OldEstudiante.nie = nie;
                OldEstudiante.lugarNacimiento = lugarNacimiento;
                OldEstudiante.numeroPartidaNacimiento = numeroPartidaNacimiento;
                OldEstudiante.tomo = tomo;
                OldEstudiante.folio = folio;
                OldEstudiante.libro = libro;
                OldEstudiante.departamento = coddpto;
                OldEstudiante.municipio = codmuni;
                OldEstudiante.direccion = direccion;
                OldEstudiante.institucionProcedencia = institucionProcedencia;
                OldEstudiante.gradoIngreso = Convert.ToInt32(gradoIngreso);
                if (adjunto != "") { OldEstudiante.archivofoto = adjunto; }
                OldEstudiante.idResponsable = idResponsable;
                OldEstudiante.correo = correo;
                OldEstudiante.Status = status;
                OldEstudiante.actualizadoPor = Session["IdUsurio"].ToString();
                OldEstudiante.fechaActualizado = DateTime.Now;

                db.SaveChanges();

                //actualizamos los datos de sae
                var sae = (from s in dbsae.CLIE01 where s.CLAVE == OldEstudiante.codigoSAE select s).FirstOrDefault();
                sae.NOMBRE = primerApellido + " " + segundoApellido + " " + nombres;
                sae.CALLE = direccion;
                sae.MUNICIPIO = municipio;
                sae.ESTADO = departamento;
                dbsae.SaveChanges();
                flgsae = true;

                var Estudiantes = db.SP_ObtenerEstudiantes().ToList();

                jr.Data = new { Estudiantes = Estudiantes, Res = true, Sae = flgsae };
                return jr;
            }
            catch (Exception ex)
            {
                var Estudiantes = db.SP_ObtenerEstudiantes().ToList();

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
                        //registro.edad = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 6));
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
                        registro.gradoIngreso = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 17));
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

        public JsonResult LoadMunicipalities(string state)
        {
            var result = new JsonResult();
            try
            {
                var realstate = Convert.ToInt32(state);
                var muni = (from m in db.tblMunicipio where m.IdDepartamento == realstate select m).ToList();
                result.Data = new { ListMunicipalities = muni, Status = 0, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "No se pudieron cargar los municipios.", JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult LoadAllMunicipalities()
        {
            var result = new JsonResult();
            try
            {
                var muni = (from m in db.tblMunicipio select m).ToList();
                result.Data = new { ListMunicipalities = muni, Status = 0, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "No se pudieron cargar los municipios.", JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult ChangeStatus(string idestudiante, string op)
        {
            var result = new JsonResult();
            try
            {
                var realid = Convert.ToInt32(idestudiante);
                var reg = (from e in db.tblEstudiante where e.idAlumno == realid select e).FirstOrDefault();
                reg.Status = op;
                db.SaveChanges();
                var Estudiantes = db.SP_ObtenerEstudiantes().ToList();

                result.Data = new { Estudiantes = Estudiantes,Msj="Los cambios han sido efectuados.", Status = 0, JsonRequestBehavior.AllowGet};
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error al procesar la acción. Actualice la página.", JsonRequestBehavior.AllowGet };
                return result;
            }
        }


    }
}