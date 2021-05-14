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
    public class MateriaController : Controller
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
        // GET: Materia
        public ActionResult Materias()
        {
            if(CheckSession())
            {
                ViewBag.Grados = (from b in db.tblGrado select b).ToList();
                ViewBag.Materias = db.SP_ObtenerMaterias().ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult AddMateria(tblAsigatura Materia)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OldMateria = (from p in db.tblAsigatura where p.idAsignatura == Materia.idAsignatura select p).FirstOrDefault();

                if (OldMateria == null)
                {
                    Materia.fechaCreacion = DateTime.Now;
                    Materia.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tblAsigatura.Add(Materia);
                        db.SaveChanges();
                    }
                }

                var Materias = db.SP_ObtenerMaterias().ToList();

                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }


        public JsonResult UpdateMateria(tblAsigatura Materia)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldMateria = (from p in db.tblAsigatura where p.idAsignatura == Materia.idAsignatura select p).FirstOrDefault();

                OldMateria.idGrado = Materia.idGrado;
                OldMateria.nombreAsignatura = Materia.nombreAsignatura;
                OldMateria.hora = Materia.hora;
                OldMateria.actualizadoPor = Session["IdUsurio"].ToString();
                OldMateria.fechaActualizado = DateTime.Now;

                db.SaveChanges();
                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }

        public JsonResult DeleteMateria(int idAsignatura)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldMateria = (from p in db.tblAsigatura where p.idAsignatura == idAsignatura select p).FirstOrDefault();


                db.tblAsigatura.Remove(OldMateria);
                db.SaveChanges();
                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }




        // GET: Materia
        public ActionResult MateriasPorMaestro()
        {
            if (CheckSession())
            {
                ViewBag.Grados = (from b in db.tblGrado select b).ToList();
                ViewBag.Asignaturas = (from b in db.tblAsigatura select b).ToList();
                //ViewBag.Maestros = (from b in db.tblUsuario where b.idPerfil==6 select b).ToList();
                ViewBag.Maestros = (from b in db.tblMaestro select b).ToList();
                ViewBag.Materias = db.SP_ObtenerMaterias().ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult AddMateriaPorMaestro(tblMateriaPorMaestro Materia)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OldMateria = (from p in db.tblMateriaPorMaestro where p.idAsignatura == Materia.idAsignatura select p).FirstOrDefault();

                if (OldMateria == null)
                {
                    Materia.fechaCreacion = DateTime.Now;
                    Materia.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tblMateriaPorMaestro.Add(Materia);
                        db.SaveChanges();
                    }
                }

                var Materias = db.SP_ObtenerMateriasPorMaestro(Materia.idUsuario).ToList();

                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMateriasPorMaestro(Materia.idUsuario).ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }

        public JsonResult UpdateMateriaPorMaestro(tblMateriaPorMaestro Materia)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldMateria = (from p in db.tblMateriaPorMaestro where p.idMateriaPorMaestro == Materia.idMateriaPorMaestro select p).FirstOrDefault();

                OldMateria.anio = Materia.anio;
                OldMateria.idUsuario = Materia.idUsuario;
                OldMateria.idAsignatura = Materia.idAsignatura;
                OldMateria.actualizadoPor = Session["IdUsurio"].ToString();
                OldMateria.fechaActualizado = DateTime.Now;

                db.SaveChanges();
                var Materias = db.SP_ObtenerMateriasPorMaestro(Materia.idUsuario).ToList();
                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMateriasPorMaestro(Materia.idUsuario).ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }

        public JsonResult DeleteMateriaPorMaestro(int idMateriaPorMaestro, int IdMaestro)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldMateria = (from p in db.tblMateriaPorMaestro where p.idMateriaPorMaestro == idMateriaPorMaestro select p).FirstOrDefault();


                db.tblMateriaPorMaestro.Remove(OldMateria);
                db.SaveChanges();
                var Materias = db.SP_ObtenerMateriasPorMaestro(IdMaestro).ToList();
                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMateriasPorMaestro(IdMaestro).ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }

        public JsonResult GetMateriaPorMaestro(int IdMaestro)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Materias = db.SP_ObtenerMateriasPorMaestro(IdMaestro).ToList();

                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMateriasPorMaestro(IdMaestro).ToList();
                jr.Data = new { Materias = Materias, Res = false };
                return jr;
            }
        }

        
        public JsonResult Syncmaterias()
        {
            JsonResult jr = new JsonResult();
            try
            {
                sm.ObtenerCursos();

                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Materias = db.SP_ObtenerMaterias().ToList();
                jr.Data = new { Materias = Materias, Res = false };
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
                        tblAsigatura registro = new tblAsigatura();
                        registro.idGrado = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 2));
                        registro.nombreAsignatura = sheet.GetCellValueAsString(idRow, 3);
                        registro.clave = sheet.GetCellValueAsString(idRow, 4);
                        registro.hora = sheet.GetCellValueAsString(idRow, 5);
                        registro.creadoPor = "ImportacionXLSX";
                        registro.fechaCreacion = DateTime.Now;

                        var OldItem = (from p in db.tblAsigatura where p.clave == registro.clave select p).FirstOrDefault();
                        if (OldItem == null)
                        {
                            db.tblAsigatura.Add(registro);
                            db.SaveChanges();
                        }
                        else
                        {
                            OldItem.idGrado = Convert.ToInt32(sheet.GetCellValueAsString(idRow, 2));
                            OldItem.nombreAsignatura = sheet.GetCellValueAsString(idRow, 3);
                            OldItem.clave = sheet.GetCellValueAsString(idRow, 4);
                            OldItem.hora = sheet.GetCellValueAsString(idRow, 5);
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