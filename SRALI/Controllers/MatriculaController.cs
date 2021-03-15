using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class MatriculaController : Controller
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
        // GET: Matricula
        public ActionResult Matriculas()
        {
            if (CheckSession())
            {
                ViewBag.Alumnos = (from b in db.tblEstudiante select b).ToList();
                ViewBag.Grados = (from b in db.tblGrado select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }


        public JsonResult AddExpediente(tblExpediente Expediente)
        {
            JsonResult jr = new JsonResult();
            try
             {

                var OldExpediente = (from p in db.tblExpediente where p.idExpediente == Expediente.idExpediente select p).FirstOrDefault();

                if (OldExpediente == null)
                {
                    Expediente.fechaCreacion = DateTime.Now;
                    Expediente.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tblExpediente.Add(Expediente);
                        db.SaveChanges();
                    }
                }
                else
                {
                    OldExpediente.idAlumno = Expediente.idAlumno;
                    OldExpediente.idGrado = Expediente.idGrado;
                    OldExpediente.AnioEscolar = Expediente.AnioEscolar;
                    OldExpediente.TipoIngreso = Expediente.TipoIngreso;
                    OldExpediente.Turno = Expediente.Turno;
                    OldExpediente.Monto = Expediente.Monto;
                    OldExpediente.Colegiaturas = Expediente.Colegiaturas;
                    OldExpediente.fechaCreacion = DateTime.Now;
                    OldExpediente.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.SaveChanges();
                    }
                }

                var Expedientes = db.SP_GET_EXPEDIENTES_POR_ALUMNO(Expediente.idAlumno).ToList();

                jr.Data = new { Expedientes = Expedientes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Expedientes = db.SP_GET_EXPEDIENTES_POR_ALUMNO(Expediente.idAlumno).ToList();
                jr.Data = new { Expedientes = Expedientes, Res = false };
                return jr;
            }
        }

        public JsonResult GetExpedientePorAlumno(int idAlumno)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Expedientes = db.SP_GET_EXPEDIENTES_POR_ALUMNO(idAlumno).ToList();

                jr.Data = new { Expedientes = Expedientes, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Expedientes = "", Res = false };
                return jr;
            }
        }
    }
}