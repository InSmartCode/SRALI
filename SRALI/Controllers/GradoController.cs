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


    }
}