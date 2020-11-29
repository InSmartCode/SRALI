using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using SRALI.Models;
using SRALI.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace SRALI.Controllers
{
    public class GestionUsuariosController : Controller
    {
        private readonly SARADB_Entities db = new SARADB_Entities();


        //private readonly  string UserId = System.Web.HttpContext.Current.User.Identity.GetUserId();

       
        //private ApplicationUserManager _userManager;
        //public ApplicationUserManager UserManager
        //{
        //    get
        //    {
        //        return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
        //    }
        //    private set
        //    {
        //        _userManager = value;
        //    }
        //}

        //private ApplicationRoleManager _roleManager;
        //public ApplicationRoleManager RoleManager
        //{
        //    get
        //    {
        //        return _roleManager ?? HttpContext.GetOwinContext().Get<ApplicationRoleManager>();
        //    }
        //    private set
        //    {
        //        _roleManager = value;
        //    }
        //}

        //Constructores
        public GestionUsuariosController() { }

        //public GestionUsuariosController(ApplicationUserManager userManager, ApplicationRoleManager roleManager)
        //{
        //    UserManager = userManager;
        //    RoleManager = roleManager;
        //}



        // GET: GestionUsuarios
        public ActionResult Index()
        {

           var Usuarios = (from V_UsuariosSistema in db.V_UsuariosSistema
                           select V_UsuariosSistema).ToList();
            ViewBag.Users = Usuarios;

            return View();
           
        }

        // GET: GestionUsuarios/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: GestionUsuarios/Create
        public  ActionResult Create()
        {
         // ViewBag.RoleId = new SelectList(await RoleManager.Roles.ToListAsync(), "Name", "Name");
            var ListaPerfiles = (from l in db.tblPerfil
                                select l).ToList();
            ViewBag.Perfiles = ListaPerfiles;
            return View();
        }

        // POST: GestionUsuarios/Create
        [HttpPost]
        public ActionResult Create(tblUsuario UsuarioViewModel, FormCollection collection, params string[] PerfilSeleccionado)
        {
            if (ModelState.IsValid)
            {

                //foreach( string key in collection.AllKeys)
                //{
                //    System.Diagnostics.Debug.WriteLine("Key = " + key + " " + "Value = " + collection[key]);

                //}              
                // TODO: Add insert logic here

                // Validadciones antes de gauradar

                var nuevoemail = UsuarioViewModel.correo.ToString();
                var nuevousuario = UsuarioViewModel.nombre.ToString();

                var userexist = (from t in db.tblUsuario
                                 where t.nombre == nuevousuario || t.correo == nuevoemail
                                 select t).First();

                if (userexist != null)
                {
                    var ListaPerfiles = (from l in db.tblPerfil
                                         select l).ToList();
                    ViewBag.Perfiles = ListaPerfiles;

                    ViewBag.Error = "Los nombre de usaurio o correo ya estan registrados...";
                    return View(UsuarioViewModel);

                }


                var lastID = (from l in db.tblUsuario
                                        orderby l.id descending
                                         select l.id).First();

                    System.Diagnostics.Debug.WriteLine("Ultimo ID de Usuario:  " + lastID.ToString());

                    int newId = (int)lastID + 1;



                    if (UsuarioViewModel.estado=="True")
                        {
                            UsuarioViewModel.estado = "A";
                        }
                    else{
                                UsuarioViewModel.estado = "I";
                    }

                    var nompbrePerfil = collection["PerfilSeleccionado"].ToString();

                    var idperfil = (from p in db.tblPerfil
                                  where p.nombre == nompbrePerfil
                                  select p.id).First();


                    SecurityApp myhash = new SecurityApp();
                    string encpass = myhash.ConvertToHashMD5(UsuarioViewModel.password.Trim());
                    UsuarioViewModel.password = encpass;

                


                var usuario = new tblUsuario
                    {
                        id = newId,
                        nombre = UsuarioViewModel.nombre,
                        nombreCompleto = UsuarioViewModel.nombreCompleto,
                        password = UsuarioViewModel.password,
                        estado = UsuarioViewModel.estado,
                        idPerfil = idperfil,
                        correo = UsuarioViewModel.correo,
                        telefono = UsuarioViewModel.telefono,
                        archivofoto = UsuarioViewModel.archivofoto, 
                      
                    };
                    

                    //  IdPerfil = (int)UsuarioViewModel.idPerfil,

                    //var adminresult = await UserManager.CreateAsync((Aplication)user, UsuarioViewModel.password);
                   
                    //var adminresult2 = await UserManager.Create(user,user.password);

                    System.Diagnostics.Debug.WriteLine("ID de usuario: " + usuario.id );
                    System.Diagnostics.Debug.WriteLine("Nombre de usuario: " + usuario.nombre);
                    System.Diagnostics.Debug.WriteLine("Nombre completo de  usuario: " + usuario.nombreCompleto);
                    System.Diagnostics.Debug.WriteLine("Password: " + usuario.password);
                    System.Diagnostics.Debug.WriteLine("Estado: " + usuario.estado);
                    System.Diagnostics.Debug.WriteLine("Email: " + usuario.correo);
                    System.Diagnostics.Debug.WriteLine("ID Perfil: " + idperfil.ToString());
                    System.Diagnostics.Debug.WriteLine("Perfil: " + collection["PerfilSeleccionado"].ToString());
                    System.Diagnostics.Debug.WriteLine("Telefono: " + usuario.telefono);
                    System.Diagnostics.Debug.WriteLine("Nombre Archivo Foto:  " + usuario.archivofoto);


                // System.Diagnostics.Debug.WriteLine("Estado" + collection);

                // Then create:
                try {
                    //var createresult = await UserManager.CreateAsync(user);
                    db.tblUsuario.Add(usuario);
                    db.SaveChanges();
                    System.Diagnostics.Debug.WriteLine("Registro guardado... ");
                    // if (result.Succeeded)
                    var ListaPerfiles = (from l in db.tblPerfil
                                         select l).ToList();
                    ViewBag.Perfiles = ListaPerfiles;
                    return RedirectToAction("Index");      
                    
                }catch (Exception ex){

                        System.Diagnostics.Debug.WriteLine("Registro no se puede guardadar por un excepcion no controlada... ");
                        var ListaPerfiles = (from l in db.tblPerfil
                                             select l).ToList();
                        ViewBag.Perfiles = ListaPerfiles;
                    ViewBag.Error = ex.ToString();
                    return View();
                    //return RedirectToAction("Index");
                }

            }

            return RedirectToAction("Index");

        }
  




// GET: GestionUsuarios/Edit/5
public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: GestionUsuarios/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: GestionUsuarios/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: GestionUsuarios/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
