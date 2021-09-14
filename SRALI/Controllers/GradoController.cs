using SpreadsheetLight;
using SRALI.Models;
using SRALI.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class GradoController : Controller
    {

        ConsultasMoodle sm = new ConsultasMoodle();
        SARADB_Entities db = new SARADB_Entities();

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
        // GET: Grado
        public ActionResult Grados()
        {
            if (CheckSession())
            {
                ViewBag.Grados = (from b in db.tblGrado select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }


        public JsonResult AddGrado(tblGrado Grado)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OldGrado = (from p in db.tblGrado where p.idGrado == Grado.idGrado select p).FirstOrDefault();

                if (OldGrado == null)
                {
                    Grado.fechaCreacion = DateTime.Now;
                    Grado.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tblGrado.Add(Grado);
                        db.SaveChanges();
                    }
                }

                var Grados = (from b in db.tblGrado
                                select new
                                {
                                    b.idGrado,
                                    b.descripcion,
                                    b.nivelEscolar,
                                    b.Capacidad,
                                    b.Vacantes
                                }).ToList();

                jr.Data = new { Grados = Grados, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Grados = (from b in db.tblGrado
                                select new
                                {
                                    b.idGrado,
                                    b.descripcion,
                                    b.nivelEscolar,
                                    b.Capacidad,
                                    b.Vacantes
                                }).ToList();
                jr.Data = new { Grados = Grados, Res = false };
                return jr;
            }
        }


        public JsonResult UpdateGrado(tblGrado Grado)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldGrado = (from p in db.tblGrado where p.idGrado == Grado.idGrado select p).FirstOrDefault();
                OldGrado.descripcion = Grado.descripcion;
                OldGrado.nivelEscolar = Grado.nivelEscolar;

                var DifVacante = 0;
                if (OldGrado.Capacidad > Grado.Capacidad)
                {
                    DifVacante = (int)OldGrado.Capacidad - (int)Grado.Capacidad;

                    OldGrado.Capacidad = Grado.Capacidad;
                    OldGrado.Vacantes = OldGrado.Vacantes - DifVacante;
                }
                else
                {
                    DifVacante = (int)Grado.Capacidad - (int)OldGrado.Capacidad;

                    OldGrado.Capacidad = Grado.Capacidad;
                    OldGrado.Vacantes = OldGrado.Vacantes + DifVacante;
                }
                OldGrado.actualizadoPor = Session["IdUsurio"].ToString();
                OldGrado.fechaActualizado = DateTime.Now;

                db.SaveChanges();
                var Grados = (from b in db.tblGrado
                                select new
                                {
                                    b.idGrado,
                                    b.descripcion,
                                    b.nivelEscolar,
                                    b.Capacidad,
                                    b.Vacantes
                                }).ToList();
                jr.Data = new { Grados = Grados, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Grados = (from b in db.tblGrado
                                select new
                                {
                                    b.idGrado,
                                    b.descripcion,
                                    b.nivelEscolar,
                                    b.Capacidad,
                                    b.Vacantes
                                }).ToList();
                jr.Data = new { Grados = Grados, Res = false };
                return jr;
            }
        }

        public JsonResult DeleteGrado(int idGrado)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldGrado = (from p in db.tblGrado where p.idGrado == idGrado select p).FirstOrDefault();


                db.tblGrado.Remove(OldGrado);
                db.SaveChanges();
                var Grados = (from b in db.tblGrado
                                select new
                                {
                                    b.idGrado,
                                    b.descripcion,
                                    b.nivelEscolar,
                                    b.Capacidad,
                                    b.Vacantes
                                }).ToList();
                jr.Data = new { Grados = Grados, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Grados = (from b in db.tblGrado
                                select new
                                {
                                    b.idGrado,
                                    b.descripcion,
                                    b.nivelEscolar,
                                    b.Capacidad,
                                    b.Vacantes
                                }).ToList();
                jr.Data = new { Grados = Grados, Res = false };
                return jr;
            }
        }


        public JsonResult SyncGrados()
        {
            JsonResult jr = new JsonResult();
            try
            {
                sm.ObtenerCategorias();

                var Grados = (from b in db.tblGrado
                              select new
                              {
                                  b.idGrado,
                                  b.descripcion,
                                  b.nivelEscolar,
                                  b.Capacidad,
                                  b.Vacantes
                              }).ToList();
                jr.Data = new { Grados = Grados, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Grados = (from b in db.tblGrado
                              select new
                              {
                                  b.idGrado,
                                  b.descripcion,
                                  b.nivelEscolar,
                                  b.Capacidad,
                                  b.Vacantes
                              }).ToList();
                jr.Data = new { Grados = Grados, Res = false };
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
                        tblGrado registro = new tblGrado();
                        registro.descripcion = sheet.GetCellValueAsString(idRow, 2);
                        registro.nivelEscolar = sheet.GetCellValueAsString(idRow, 3);
                        registro.clave = sheet.GetCellValueAsString(idRow, 4);
                        registro.referencia = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 5));
                        registro.Capacidad = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 6));
                        registro.Vacantes = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 7));
                        registro.creadoPor = "ImportacionXLSX";
                        registro.fechaCreacion = DateTime.Now;


                        var OldItem = (from p in db.tblGrado where p.clave == registro.clave select p).FirstOrDefault();
                        if (OldItem == null)
                        {
                            db.tblGrado.Add(registro);
                            db.SaveChanges();
                        }
                        else
                        {
                            OldItem.descripcion = sheet.GetCellValueAsString(idRow, 2);
                            OldItem.nivelEscolar = sheet.GetCellValueAsString(idRow, 3);
                            OldItem.clave = sheet.GetCellValueAsString(idRow, 4);
                            OldItem.referencia = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 5));
                            OldItem.Capacidad = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 6));
                            OldItem.Vacantes = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 7));
                            OldItem.actualizadoPor = "ImportacionXLSX";
                            OldItem.fechaActualizado = DateTime.Now;
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


        public ActionResult Seccion()
        {
            if (CheckSession())
            {
                ViewBag.Seccion = (from b in db.tblSeccion select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult AgregarSeccion(string seccion)
        {
            var result = new JsonResult();
            try
            {
                var Status = 0;
                var Msj = "";
                
                var regExiste = (from r in db.tblSeccion where r.nombreSeccion == seccion select r).Count();
                if(regExiste > 0)
                {
                    Msj = "La sección ya está creada.";
                    Status = 1;
                }
                else{
                    var sec = new tblSeccion();
                    sec.nombreSeccion = seccion;
                    db.tblSeccion.Add(sec);
                    db.SaveChanges();
                    Msj = "Sección añadida al sistema";
                    Status = 0;
                }
                //refrescamos el listado de secciones
                var listado = (from s in db.tblSeccion select s).ToList();
                result.Data = new { Status = Status, Listado = listado, Msj = Msj, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" +ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }
        public JsonResult EditarSeccion(string idseccion, string seccion)
        {
            var result = new JsonResult();
            try
            {
                var realid = Convert.ToInt32(idseccion);
                var sec = (from s in db.tblSeccion where s.idSeccion == realid select s).FirstOrDefault();
                sec.nombreSeccion = seccion;
                db.SaveChanges();
                //Hay que validar que no se modifique a una sección existente
                //refrescamos el listado de secciones
                var listado = (from s in db.tblSeccion select s).ToList();
                result.Data = new { Status = 0, Listado = listado, Msj = "Sección modificada", JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public ActionResult GradoSeccion()
        {
            if (CheckSession())
            {
                ViewBag.Grados = (from b in db.tblGrado select b).ToList();
                ViewBag.Secciones = (from b in db.tblSeccion select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }


        public JsonResult SeccionPorGrado(string grado)
        {
            var result = new JsonResult();
            try
            {
                var realid = Convert.ToInt32(grado);
                var seccasignadas = db.SP_MostrarSeccionPorGrado(realid).ToList();
                result.Data = new { Status = 0, Listado = seccasignadas, Msj = "Secciones asignadas para este grado.", JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult CargarGrados()
        {
            var result = new JsonResult();
            try
            {
                var listado = (from g in db.tblGrado select g).ToList();
                result.Data = new { Status = 0, ListadoGrados = listado, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult CargarSecciones()
        {
            var result = new JsonResult();
            try
            {
                var listado = (from g in db.tblSeccion select g).ToList();
                result.Data = new { Status = 0, ListadoSecciones = listado, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult AgregarSeccionPorGrado(string grado, string seccion)
        {
            var result = new JsonResult();
            try
            {
                var Msj = "";
                var realgrad = Convert.ToInt32(grado);
                var realsecc = Convert.ToInt32(seccion);

                //validamos si ya está creada esta asignación
                var yaexiste = (from gs in db.tblGradoSeccion where gs.idGrado == realgrad && gs.idSeccion == realsecc select gs).Count();

                if(yaexiste == 0)
                {
                    var reg = new tblGradoSeccion();
                    reg.idGrado = realgrad;
                    reg.idSeccion = realsecc;
                    db.tblGradoSeccion.Add(reg);
                    db.SaveChanges();
                    Msj = "Se ha añadido la sección al grado";
                }
                else
                {
                    Msj = "Esta sección ya está asignada al grado";
                }
                var seccasignadas = db.SP_MostrarSeccionPorGrado(realgrad).ToList();
                result.Data = new { Status = 0, Listado = seccasignadas, Msj = Msj, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }


        public JsonResult EliminarSeccionPorGrado(string idGradoSeccion, string idgrado)
        {
            var result = new JsonResult();
            try
            {
                var Msj = "";
                var realid = Convert.ToInt32(idGradoSeccion);
                var realgrad = Convert.ToInt32(idgrado);

                //validamos si está amarrado a otros registros, si esta amarrado no se podría eliminar
                //PENDIENTE

                //eliminamos el registro
                var registro = (from gs in db.tblGradoSeccion where gs.IdGradoSeccion == realid select gs).FirstOrDefault();
                db.tblGradoSeccion.Remove(registro);
                db.SaveChanges();

                var seccasignadas = db.SP_MostrarSeccionPorGrado(realgrad).ToList();
                result.Data = new { Status = 0, Listado = seccasignadas, Msj = Msj, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult MostrarPeriodosDisponibles(string grado)
        {
            var result = new JsonResult();
            try
            {
                var id = Convert.ToInt32(grado);
                //Obtenemos todos los periodos disponibles en el sistema
                var listado = (from p in db.tbl_Periodo select p).ToList();

                //Mostramos los periodos que tiene asignados el grado
                var listgradoperiodo = db.SP_MostrarPeriodoXGrado(id).ToList();
                result.Data = new { Status = 0, Listado = listado, ListadoP = listgradoperiodo, Msj = "Periodos del Sistema", JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }
        


        public JsonResult AgregarPeriodoPorGrado(string grado, string periodo)
        {
            var result = new JsonResult();
            try
            {
                var Msj = "";
                var realgrad = Convert.ToInt32(grado);
                var realperi = Convert.ToInt32(periodo);

                //validamos si ya está creada esta asignación
                var yaexiste = (from gs in db.tbl_PeriodoXGrado where gs.IdGrado == realgrad && gs.IdPeriodo == realperi select gs).Count();

                if (yaexiste == 0)
                {
                    var reg = new tbl_PeriodoXGrado();
                    reg.IdGrado = realgrad;
                    reg.IdPeriodo = realperi;
                    db.tbl_PeriodoXGrado.Add(reg);
                    db.SaveChanges();
                    Msj = "Se ha añadido el período al grado";
                }
                else
                {
                    Msj = "Este período ya está asignado al grado";
                }
                //Obtenemos todos los periodos disponibles en el sistema
                var listado = (from p in db.tbl_Periodo select p).ToList();

                //Mostramos los periodos que tiene asignados el grado
                var listgradoperiodo = db.SP_MostrarPeriodoXGrado(realgrad).ToList();
                result.Data = new { Status = 0, Listado = listado, ListadoP = listgradoperiodo, Msj = "Periodos del Sistema", JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult EliminarPeriodoPorGrado(string grado, string iddetalle)
        {
            var result = new JsonResult();
            try
            {
                var Msj = "";
                var status = 1;
                var realgrad = Convert.ToInt32(grado);
                var realid = Convert.ToInt32(iddetalle);

                //validamos si ya está creada esta asignación
                var yaexiste = (from gs in db.tbl_AsignaturaXPeriodoYGrado where gs.IdPeriodoXGrado == realid select gs).Count();

                if (yaexiste == 0)
                {
                    var registro = (from r in db.tbl_PeriodoXGrado where r.IdPeriodoXGrado == realid select r).FirstOrDefault();
                    db.tbl_PeriodoXGrado.Remove(registro);
                    db.SaveChanges();
                    Msj = "Se ha eliminado el período al grado";
                    status = 0;
                }
                else
                {
                    Msj = "No puede borrar este período hasta borrar las materias asignadas a este período.";
                    status = 1;
                }
                //Obtenemos todos los periodos disponibles en el sistema
                var listado = (from p in db.tbl_Periodo select p).ToList();

                //Mostramos los periodos que tiene asignados el grado
                var listgradoperiodo = db.SP_MostrarPeriodoXGrado(realgrad).ToList();
                result.Data = new { Status = status, Listado = listado, ListadoP = listgradoperiodo, Msj = Msj, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }

        public JsonResult CrearGrados(string grado, string clave, string nivel)
        {
            var result = new JsonResult();
            try
            {
                var Msj = "";
                var Status = 0;
                var regexiste = (from g in db.tblGrado where g.descripcion == grado || g.clave == clave select g).Count();
                if(regexiste > 0)
                {
                    Msj = "Por favor revise. El grado o la clave ya existen.";
                    Status = 1;
                }
                else
                {
                    var ng = new tblGrado();
                    ng.descripcion = grado;
                    ng.clave = clave;
                    ng.nivelEscolar = nivel;
                    ng.fechaCreacion = DateTime.Now;
                    ng.creadoPor = Session["IdUsurio"].ToString();
                    db.tblGrado.Add(ng);
                    db.SaveChanges();
                    Msj = "Nuevo grado creado.";
                    Status = 0;
                }


                var listado = (from g in db.tblGrado select g).ToList();
                result.Data = new { Status = Status, ListadoGrados = listado, Msj = Msj, JsonRequestBehavior.AllowGet };
                return result;
            }
            catch (Exception ex)
            {
                result.Data = new { Status = 1, Msj = "Error:" + ex.Message, JsonRequestBehavior.AllowGet };
                return result;
            }
        }               
    }
}