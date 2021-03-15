using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class GradoController : Controller
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





    }
}