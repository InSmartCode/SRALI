 using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class AnioEscolarController : Controller
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

        // GET: AnioEscolar
        public ActionResult Index()
        {
            if (CheckSession())
            {
                ViewBag.Date = DateTime.Now.ToString("MM/yyyy");
                ViewBag.DateNow = DateTime.Now.ToString("dd/MM/yyyy");
                ViewBag.TimeNow = DateTime.Now.ToString("hh:mm tt");
                ViewBag.EventosAnioEscolar = (from b in db.tbl_EventosAnioEscolar select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        public ActionResult NuevoAnioEscolar()
        {
            if (CheckSession())
            {
                ViewBag.AniosEscolares = (from b in db.tbl_AnioEscolar select b).ToList();
                return View();
            }
            else
            {
                return RedirectToAction("LogOut", "Access");
            }
        }


        public JsonResult GuardarAnioEscolar(tbl_AnioEscolar tbl_AnioEscolar)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var Registro = (from p in db.tbl_AnioEscolar where p.IdAnioEscolar == tbl_AnioEscolar.IdAnioEscolar select p).FirstOrDefault();

                if (Registro == null)
                {
                    if (ModelState.IsValid)
                    {
                        tbl_AnioEscolar.FechaCreado = DateTime.Now;
                        tbl_AnioEscolar.CreadoPor = Session["IdUsurio"].ToString();
                        db.tbl_AnioEscolar.Add(tbl_AnioEscolar);
                        db.SaveChanges();
                    }
                }
                else
                {
                    if (Registro.Estado != "C")
                    {
                        Registro.Nombre = tbl_AnioEscolar.Nombre;
                        Registro.Anio = tbl_AnioEscolar.Anio;
                        Registro.Semanas = tbl_AnioEscolar.Semanas;
                        Registro.Descripcion = tbl_AnioEscolar.Descripcion;
                        Registro.Estado = tbl_AnioEscolar.Estado;
                        Registro.FechaActualizado = DateTime.Now;
                        Registro.ActualizadoPor = Session["IdUsurio"].ToString();

                        db.SaveChanges();
                    }
                }

                var data = (from p in db.tbl_AnioEscolar select new { p.IdAnioEscolar, p.Nombre, p.Anio, p.Semanas, p.Descripcion, p.Estado}).ToList();

                jr.Data = new { AniosEscolares = data, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { AniosEscolares = "", Res = false };
                return jr;
            }
        }

        public JsonResult GuardarEventoAnioEscolar(tbl_EventosAnioEscolar tbl_EventosAnioEscolar)
        {
            JsonResult jr = new JsonResult();
            try
            {

                var Registro = (from p in db.tbl_EventosAnioEscolar where p.IdEventosAnioEscolar == tbl_EventosAnioEscolar.IdEventosAnioEscolar select p).FirstOrDefault();

                if (Registro == null)
                {
                    if (ModelState.IsValid)
                    {
                        tbl_EventosAnioEscolar.Mes = Convert.ToInt32(((DateTime)tbl_EventosAnioEscolar.FechaEvento).ToString("MM"));
                        tbl_EventosAnioEscolar.Dia = Convert.ToInt32(((DateTime)tbl_EventosAnioEscolar.FechaEvento).ToString("dd"));
                        tbl_EventosAnioEscolar.FechaCreado = DateTime.Now;
                        tbl_EventosAnioEscolar.CreadoPor = Session["IdUsurio"].ToString();
                        db.tbl_EventosAnioEscolar.Add(tbl_EventosAnioEscolar);
                        db.SaveChanges();
                    }
                }
                else
                {
                    if (Registro.Estado != "C")
                    {
                        Registro.IdAnioEscolar = tbl_EventosAnioEscolar.IdAnioEscolar;
                        Registro.Evento = tbl_EventosAnioEscolar.Evento;
                        Registro.FechaEvento = tbl_EventosAnioEscolar.FechaEvento;
                        Registro.Mes = Convert.ToInt32(((DateTime)tbl_EventosAnioEscolar.FechaEvento).ToString("MM"));
                        Registro.Dia = Convert.ToInt32(((DateTime)tbl_EventosAnioEscolar.FechaEvento).ToString("dd"));
                        Registro.Hora = tbl_EventosAnioEscolar.Hora;
                        Registro.Estado = tbl_EventosAnioEscolar.Estado;
                        Registro.FechaActualizado = DateTime.Now;
                        Registro.ActualizadoPor = Session["IdUsurio"].ToString();

                        db.SaveChanges();
                    }
                }

                var data = (from p in db.tbl_EventosAnioEscolar select new { p.IdEventosAnioEscolar, p.IdAnioEscolar,p.Evento, p.FechaEvento, p.Mes, p.Dia, p.Hora, p.Estado }).ToList();

                jr.Data = new { EventosAnioEscolar = data, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { EventosAnioEscolar = "", Res = false };
                return jr;
            }
        }

        public JsonResult GetEventosAnioEscolar(string Fecha, int AnioEscolar)
        {
            JsonResult jr = new JsonResult();
            try
            {
                var Date = Convert.ToDateTime(Fecha+"-01");
                var data = db.SP_GetEventosAnioEscolar(Date, AnioEscolar).ToList();

                jr.Data = new { EventosAnioEscolar = data, Res = true };
                return jr;
            }
            catch (Exception ex)
            {
                jr.Data = new { EventosAnioEscolar = "", Res = false };
                return jr;
            }
        }
    }
}