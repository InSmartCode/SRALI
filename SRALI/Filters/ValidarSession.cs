using SRALI.Controllers;
using SRALI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Filters
{
    public class ValidarSession : ActionFilterAttribute

    {
        private tblUsuario oUsuario;

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {

            try
            {
                base.OnActionExecuting(filterContext);

                oUsuario = (tblUsuario)HttpContext.Current.Session["Usuario"];
                if(oUsuario == null)
                {
                    if (filterContext.Controller is AccessController == false)
                    {
                        filterContext.HttpContext.Response.Redirect("/Access/Login");
                    }
                }
            }

            catch
            {
                filterContext.Result = new RedirectResult("/Access/Login");
            }
            
        }

    }
}