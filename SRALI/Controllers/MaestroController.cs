using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class MaestroController : Controller
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

        // GET: Maestro
        public ActionResult Maestros()
        {
            if (CheckSession())
            {
                ViewBag.Maestros = (from b in db.tblMaestro select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
            
        }

        public JsonResult AddMaestro(tblMaestro Maestro)
        {
            JsonResult jr = new JsonResult();
            try
            {
                
                var OldMaestro = (from p in db.tblMaestro where p.dui == Maestro.dui select p).FirstOrDefault();

                if (OldMaestro == null)
                {
                    Maestro.fechaCreacion = DateTime.Now;
                    Maestro.creadoPor = Session["IdUsurio"].ToString();
                    if (ModelState.IsValid)
                    {
                        db.tblMaestro.Add(Maestro);
                        db.SaveChanges();
                    }
                }

                var Maestros = (from b in db.tblMaestro
                                    select new
                                    {
                                        b.idMaestro,
                                        b.nombres,
                                        b.apellidos,
                                        b.titulacion,
                                        b.correo,
                                        b.telefono,
                                        b.dirección,
                                        b.nit,
                                        b.dui
                                    }).ToList();

                jr.Data = new { Maestros = Maestros, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Maestros = (from b in db.tblMaestro
                                    select new
                                    {
                                        b.idMaestro,
                                        b.nombres,
                                        b.apellidos,
                                        b.titulacion,
                                        b.correo,
                                        b.telefono,
                                        b.dirección,
                                        b.nit,
                                        b.dui
                                    }).ToList();
                jr.Data = new { Maestros = Maestros, Res = false };
                return jr;
            }
        }


        public JsonResult UpdateMaestro(tblMaestro Maestro)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldMaestro = (from p in db.tblMaestro where p.idMaestro == Maestro.idMaestro select p).FirstOrDefault();

                OldMaestro.nombres = Maestro.nombres;
                OldMaestro.apellidos = Maestro.apellidos;
                OldMaestro.titulacion = Maestro.titulacion;
                OldMaestro.correo = Maestro.correo;
                OldMaestro.telefono = Maestro.telefono;
                OldMaestro.dirección = Maestro.dirección;
                OldMaestro.nit = Maestro.nit;
                OldMaestro.dui = Maestro.dui;
                OldMaestro.actualizadoPor = Session["IdUsurio"].ToString();
                OldMaestro.fechaActualizado = DateTime.Now;

                db.SaveChanges();
                var Maestros = (from b in db.tblMaestro
                                    select new
                                    {
                                        b.idMaestro,
                                        b.nombres,
                                        b.apellidos,
                                        b.titulacion,
                                        b.correo,
                                        b.telefono,
                                        b.dirección,
                                        b.nit,
                                        b.dui
                                    }).ToList();
                jr.Data = new { Maestros = Maestros, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Maestros = (from b in db.tblMaestro
                                    select new
                                    {
                                        b.idMaestro,
                                        b.nombres,
                                        b.apellidos,
                                        b.titulacion,
                                        b.correo,
                                        b.telefono,
                                        b.dirección,
                                        b.nit,
                                        b.dui
                                    }).ToList();
                jr.Data = new { Maestros = Maestros, Res = false };
                return jr;
            }
        }

        public JsonResult DeleteMaestro(int idMaestro)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var OldMaestro = (from p in db.tblMaestro where p.idMaestro == idMaestro select p).FirstOrDefault();


                db.tblMaestro.Remove(OldMaestro);
                db.SaveChanges();
                var Maestros = (from b in db.tblMaestro
                                    select new
                                    {
                                        b.idMaestro,
                                        b.nombres,
                                        b.apellidos,
                                        b.titulacion,
                                        b.correo,
                                        b.telefono,
                                        b.dirección,
                                        b.nit,
                                        b.dui
                                    }).ToList();
                jr.Data = new { Maestros = Maestros, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                var Maestros = (from b in db.tblMaestro
                                    select new
                                    {
                                        b.idMaestro,
                                        b.nombres,
                                        b.apellidos,
                                        b.titulacion,
                                        b.correo,
                                        b.telefono,
                                        b.dirección,
                                        b.nit,
                                        b.dui
                                    }).ToList();
                jr.Data = new { Maestros = Maestros, Res = false };
                return jr;
            }
        }


    }
}