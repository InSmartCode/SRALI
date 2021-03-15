using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class ColegiaturaController : Controller
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

        // GET: Colegiatura
        public ActionResult Colegiaturas()
        {
            if (CheckSession())
            {
                ViewBag.Alumnos = (from b in db.tblEstudiante select b).ToList();
                ViewBag.Colegiaturas = db.SP_GET_EXPEDIENTES_POR_ALUMNO(0).ToList();//0 -> All 
                ViewBag.Fecha = DateTime.Now.ToString("dd-MM-yyyy");
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult AddColegiatura(tbl_Colegiaturas Colegiatura)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OldColegiatura = (from p in db.tbl_Colegiaturas where p.IdColegiatura == Colegiatura.IdColegiatura select p).FirstOrDefault();

                if (OldColegiatura == null)
                {
                    Colegiatura.fechaCreacion = DateTime.Now;
                    Colegiatura.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tbl_Colegiaturas.Add(Colegiatura);
                        db.SaveChanges();
                    }
                }
                else
                {
                    OldColegiatura.idExpediente = Colegiatura.idExpediente;
                    OldColegiatura.Num = Colegiatura.Num;
                    OldColegiatura.Fecha = Colegiatura.Fecha;
                    OldColegiatura.Monto = Colegiatura.Monto;
                    OldColegiatura.fechaCreacion = DateTime.Now;
                    OldColegiatura.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.SaveChanges();
                    }
                }

                var Colegiaturas = (from p in db.tbl_Colegiaturas where p.idExpediente == Colegiatura.idExpediente select new { p.IdColegiatura, p.idExpediente, p.Num, p.Fecha, p.Monto}).ToList();

                jr.Data = new { Colegiaturas = Colegiaturas, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Colegiaturas = (from p in db.tbl_Colegiaturas where p.idExpediente == Colegiatura.idExpediente select new { p.IdColegiatura, p.idExpediente, p.Num, p.Fecha, p.Monto }).ToList();
                jr.Data = new { Colegiaturas = Colegiaturas, Res = false };
                return jr;
            }
        }

        public JsonResult GetColegiaturaPorExpediente(int idExpediente)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Colegiaturas = (from p in db.tbl_Colegiaturas where p.idExpediente == idExpediente select new { p.IdColegiatura, p.Num, p.Fecha, p.Monto}).ToList();

                jr.Data = new { Colegiaturas = Colegiaturas, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { Colegiaturas = "", Res = false };
                return jr;
            }
        }
    }
}