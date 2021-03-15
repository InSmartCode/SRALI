using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class EvaluacionesController : Controller
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

        // GET: Evaluacion
        public ActionResult Evaluaciones()
        {
            if (CheckSession())
            {
                ViewBag.Grados = (from b in db.tblGrado select b).ToList();
                ViewBag.Materias = (from b in db.tblAsigatura select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult AddEvaluacion(tbl_Evaluacion Evaluacion)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OldEvaluacion = (from p in db.tbl_Evaluacion where p.IdEvaluacion == Evaluacion.IdEvaluacion select p).FirstOrDefault();

                if (OldEvaluacion == null)
                {
                    Evaluacion.fechaCreacion = DateTime.Now;
                    Evaluacion.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tbl_Evaluacion.Add(Evaluacion);
                        db.SaveChanges();
                    }
                }
                else
                {
                    OldEvaluacion.idAsignatura = Evaluacion.idAsignatura;
                    OldEvaluacion.NumEvaluacion = Evaluacion.NumEvaluacion;
                    OldEvaluacion.Descripcion = Evaluacion.Descripcion;
                    OldEvaluacion.Porcentaje = Evaluacion.Porcentaje;
                    OldEvaluacion.fechaCreacion = DateTime.Now;
                    OldEvaluacion.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.SaveChanges();
                    }
                }

                var Evaluacions = (from p in db.tbl_Evaluacion where p.IdEvaluacion == Evaluacion.IdEvaluacion select new { p.IdEvaluacion, p.idAsignatura, p.NumEvaluacion, p.Descripcion, p.Porcentaje }).ToList();

                jr.Data = new { Evaluacions = Evaluacions, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Evaluacions = (from p in db.tbl_Evaluacion where p.IdEvaluacion == Evaluacion.IdEvaluacion select new { p.IdEvaluacion, p.idAsignatura, p.NumEvaluacion, p.Descripcion, p.Porcentaje }).ToList();
                jr.Data = new { Evaluacions = Evaluacions, Res = false };
                return jr;
            }
        }

        public JsonResult GetEvaluacionPorMateria(int idAsignatura)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Evaluacions = (from p in db.tbl_Evaluacion where p.idAsignatura == idAsignatura select new { p.IdEvaluacion, p.idAsignatura, p.NumEvaluacion, p.Descripcion, p.Porcentaje }).ToList();

                jr.Data = new { Evaluacions = Evaluacions, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Evaluacions = "", Res = false };
                return jr;
            }
        }

        public JsonResult GetAsignaturaPorGrado(int IdGrado)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Asigaturas = (from p in db.tblAsigatura
                                  join g in db.tblGrado on p.idGrado equals g.idGrado
                                  where p.idGrado == IdGrado
                                  select new { p.idAsignatura, p.idGrado, g.descripcion, g.nivelEscolar, p.nombreAsignatura, p.hora }).ToList();

                jr.Data = new { Asigaturas = Asigaturas, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Asigaturas = "", Res = false };
                return jr;
            }
        }
    }
}