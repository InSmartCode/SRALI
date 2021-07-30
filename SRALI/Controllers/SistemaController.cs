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

        public ActionResult Parametros()
        {
            if (CheckSession())
            {
                ViewBag.Parametros = (from b in db.tbl_Parametros select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult CargarParametros()
        {
            JsonResult json = new JsonResult();
            try
            {
                var Parametros = (from b in db.tbl_Parametros select b).ToList();
                json.Data = new { Parametros = Parametros, Status = 0, Msj = "Data cargada.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

        public JsonResult InsertarParametros(string parametro, string valor)
        {
            JsonResult json = new JsonResult();
            try
            {
                tbl_Parametros p = new tbl_Parametros();
                p.Descripcion = parametro;
                p.Parametro = valor;
                db.tbl_Parametros.Add(p);
                db.SaveChanges();

                var Parametros = (from b in db.tbl_Parametros select b).ToList();
                json.Data = new { Parametros = Parametros, Status = 0, Msj = "Parámetro agregado.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

        public JsonResult ActualizarParametros(string id, string valor)
        {
            JsonResult json = new JsonResult();
            try
            {
                var realid = Convert.ToInt32(id);
                var p = (from par in db.tbl_Parametros where par.IdParametro == realid select par).FirstOrDefault();
                //p.Descripcion = parametro;
                p.Parametro = valor;
                db.SaveChanges();

                var Parametros = (from b in db.tbl_Parametros select b).ToList();
                json.Data = new { Parametros = Parametros, Status = 0, Msj = "Parámetro modificado.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

        public ActionResult OpcionesSistema()
        {
            if (CheckSession())
            {
                ViewBag.Opciones = db.SP_OpcionesSistema().ToList();
                ViewBag.OpcionesPadres = (from b in db.tblOpcionesSistema where b.idPadre == 0 select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public JsonResult CargarOpciones()
        {
            JsonResult json = new JsonResult();
            try
            {
                var opciones = db.SP_OpcionesSistema().ToList();

                json.Data = new { Opciones = opciones, Status = 0, Msj = "Mostrando Módulos del sistema.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

        public JsonResult InsertarOpcion(string nombre, string descripcion, string idpadre, string url)
        {
            JsonResult json = new JsonResult();
            try
            {
                var opcion = new tblOpcionesSistema();
                opcion.nombreModulo = nombre;
                opcion.descripcionModulo = descripcion;
                opcion.idPadre = Convert.ToInt32(idpadre);
                opcion.nombreVista = url;
                db.tblOpcionesSistema.Add(opcion);
                db.SaveChanges();

                var opciones = db.SP_OpcionesSistema().ToList();

                json.Data = new { Opciones = opciones, Status = 0, Msj = "Módulo agregado al sistema.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

        public JsonResult ActualizarOpcion(string idopcion, string nombre, string descripcion, string idpadre, string url)
        {
            JsonResult json = new JsonResult();
            try
            {
                var realid = Convert.ToInt32(idopcion);
                var opcion = (from o in db.tblOpcionesSistema where o.id == realid select o).FirstOrDefault();
                opcion.nombreModulo = nombre;
                opcion.descripcionModulo = descripcion;
                opcion.idPadre = Convert.ToInt32(idpadre);
                opcion.nombreVista = url;
                db.SaveChanges();

                var opciones = db.SP_OpcionesSistema().ToList();

                json.Data = new { Opciones = opciones, Status = 0, Msj = "Módulo actualizado.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

        public JsonResult EliminarOpcion(string idopcion)
        {
            JsonResult json = new JsonResult();
            try
            {
                var realid = Convert.ToInt32(idopcion);
                var opcion = (from o in db.tblOpcionesSistema where o.id == realid select o).FirstOrDefault();
                db.tblOpcionesSistema.Remove(opcion);
                db.SaveChanges();

                var opciones = db.SP_OpcionesSistema().ToList();

                json.Data = new { Opciones = opciones, Status = 0, Msj = "Módulo eliminado.", JsonRequestBehavior.AllowGet };
                return json;
            }
            catch (Exception ex)
            {
                json.Data = new { Status = 1, Msj = ex.Message, JsonRequestBehavior.AllowGet };
                return json;
            }
        }

    }
}