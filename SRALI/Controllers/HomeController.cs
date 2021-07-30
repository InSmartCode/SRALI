using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SRALI.Models;
using SRALI.Services;

namespace SRALI.Controllers
{
    public class HomeController : Controller
    {
        ConsultasMoodle sm = new ConsultasMoodle();
        private readonly SARADB_Entities db = new SARADB_Entities();

        public ActionResult Index()
        {
            
            if (Session["Usuario"] == null)
            {
                return RedirectToAction("Logout", "AccessController");
            }
            else
            {

                //sm.ObtenerAlumnos();
                return View();
            }
           
        }

        [ChildActionOnly]
        public ActionResult DynamicMenu()
        {
            List<tblOpcionesSistema> menus = new List<tblOpcionesSistema>();
            int userId = Convert.ToInt32(Session["IdUsurio"]);
            var userProfile = (from r in db.tblUsuario where r.id == userId select r.idPerfil).FirstOrDefault();
            var permissions = (from p in db.tblOpcionesxPerfil where p.id_perfil == userProfile select p).ToList();

            foreach (var item in permissions)
            {
                var menu = (from m in db.tblOpcionesSistema where m.id == item.id_opcion orderby m.id descending select m).FirstOrDefault();
                //System.Diagnostics.Debug.WriteLine(menu.id + " " +  menu.idPadre + " " + menu.nombreModulo);
                menus.Add(menu);
                
            }


            return PartialView(menus.ToList());
        }


        [ChildActionOnly]
        public ActionResult Periodos()
        {
            var Periodos = (from b in db.tbl_AnioEscolar select b).ToList();
            return PartialView(Periodos.ToList());
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


    }
}