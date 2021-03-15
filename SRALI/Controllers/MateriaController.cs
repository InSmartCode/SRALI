using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class MateriaController : Controller
    {
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




    }
}