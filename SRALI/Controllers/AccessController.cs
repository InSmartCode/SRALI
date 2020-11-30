using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security.Provider;
using SRALI.Models;
using SRALI.Utilities;

namespace SRALI.Controllers
{
    public class AccessController : Controller
    {
        //private string idRol;
        private readonly SARADB_Entities db = new SARADB_Entities();

        // GET: Access
        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(tblUsuario ModelUsuario)
        {
            try
            {
                SecurityApp myhash = new SecurityApp();
                string encpass = myhash.ConvertToHashMD5(ModelUsuario.password.Trim());
                   {
                    var oUsuario = (from u in db.tblUsuario
                                    where u.correo == ModelUsuario.correo.Trim() && u.password == encpass
                                    select u).FirstOrDefault();
                    if (oUsuario == null)
                    {
                        ViewBag.Error = "Usuario o contraseña invalida";
                        return View();
                    }

                    if (oUsuario.estado != "A")
                    {
                        ViewBag.Error = "Cuenta de usaurio desactivada ... ";
                        return View();
                    }

                    Session["Usuario"] = oUsuario;

                    if (oUsuario.archivofoto == null)
                    {
                        Session["AvatarUsuario"] = "/Content/images/profiles/generic_img.png";
                    }
                    else
                    {
                        Session["AvatarUsuario"] = "/Content/images/profiles/" + oUsuario.archivofoto.ToString();
                    }

                    Session["NombreCompletoUsuario"] = oUsuario.nombreCompleto.ToString();
                    Session["IdUsurio"] = oUsuario.id.ToString();
                    return RedirectToAction("Index", "Home");
                }
            }

                


            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View();
            }

        }


        public ActionResult LogOut()
        {
            Session.Abandon();
            Session.RemoveAll();
            Session.Clear();
            return RedirectToAction("Login", "Access");
        }

    }

   


}