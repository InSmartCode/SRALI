using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class SistemaController : Controller
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

        // GET: Sistema
        public ActionResult Perfiles()
        {
            if (CheckSession())
            {
                ViewBag.Perfiles = (from b in db.tblPerfil select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult GuardarPerfil(tblPerfil Perfil)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var Registro = (from p in db.tblPerfil where p.id == Perfil.id select p).FirstOrDefault();

                if (Registro == null)
                {
                    if (ModelState.IsValid)
                    {
                        db.tblPerfil.Add(Perfil);
                        db.SaveChanges();
                    }
                }
                else
                {
                    Registro.nombre = Perfil.nombre;
                    if (ModelState.IsValid)
                    {
                        db.SaveChanges();
                    }
                }

                var Perfiles = (from p in db.tblPerfil select new { p.id, p.nombre}).ToList();

                jr.Data = new { Perfiles = Perfiles, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Perfiles = (from p in db.tblPerfil select new { p.id, p.nombre }).ToList();

                jr.Data = new { Perfiles = Perfiles, Res = false };
                return jr;
            }
        }



        public ActionResult OpcionesxPerfil()
        {
            if (CheckSession())
            {
                ViewBag.Perfiles = (from b in db.tblPerfil select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult ObtenerInfoPerfil(int Perfil)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var OpcionesSistema = db.SP_ObtenerOpcionesSistemaXPerfil(Perfil).ToList();
                var OpcionesXPerfil = db.SP_ObtenerOpcionesXPerfil(Perfil).ToList();

                jr.Data = new { OpcionesSistema = OpcionesSistema, OpcionesXPerfil = OpcionesXPerfil, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { OpcionesSistema = "", OpcionesXPerfil = "", Res = false };
                return jr;
            }
        }

        public JsonResult GuardarOpcionXPerfil(tblOpcionesxPerfil tblOpcionesxPerfil)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var Registro = (from p in db.tblOpcionesxPerfil where p.numreg == tblOpcionesxPerfil.numreg select p).FirstOrDefault();

                if (Registro == null)
                {
                    if (ModelState.IsValid)
                    {
                        db.tblOpcionesxPerfil.Add(tblOpcionesxPerfil);
                        db.SaveChanges();
                    }
                }
                else
                {
                    Registro.id_perfil = tblOpcionesxPerfil.id_perfil;
                    Registro.id_opcion = tblOpcionesxPerfil.id_opcion;
                    if (ModelState.IsValid)
                    {
                        db.SaveChanges();
                    }
                }

                var OpcionesSistema = db.SP_ObtenerOpcionesSistemaXPerfil(tblOpcionesxPerfil.id_perfil).ToList();
                var OpcionesXPerfil = db.SP_ObtenerOpcionesXPerfil(tblOpcionesxPerfil.id_perfil).ToList();

                jr.Data = new { OpcionesSistema = OpcionesSistema, OpcionesXPerfil = OpcionesXPerfil, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { OpcionesSistema = "", OpcionesXPerfil = "", Res = false };
                return jr;
            }
        }

        public JsonResult EliminarOpcionXPerfil(tblOpcionesxPerfil tblOpcionesxPerfil)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var Registro = (from p in db.tblOpcionesxPerfil where p.id_perfil == tblOpcionesxPerfil.id_perfil && p.id_opcion == tblOpcionesxPerfil.id_opcion select p).FirstOrDefault();

                if (Registro != null)
                {
                    if (ModelState.IsValid)
                    {
                        db.tblOpcionesxPerfil.Remove(Registro);
                        db.SaveChanges();
                    }
                }

                var OpcionesSistema = db.SP_ObtenerOpcionesSistemaXPerfil(tblOpcionesxPerfil.id_perfil).ToList();
                var OpcionesXPerfil = db.SP_ObtenerOpcionesXPerfil(tblOpcionesxPerfil.id_perfil).ToList();

                jr.Data = new { OpcionesSistema = OpcionesSistema, OpcionesXPerfil = OpcionesXPerfil, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { OpcionesSistema = "", OpcionesXPerfil = "", Res = false };
                return jr;
            }
        }



    }
}