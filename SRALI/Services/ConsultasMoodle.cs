using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MySql.Data.MySqlClient;
using SRALI.Models;

namespace SRALI.Services
{
    public class ConsultasMoodle
    {
        SARADB_Entities db = new SARADB_Entities();
        MySqlConnection databaseConnection;

        public void CrearConexionMoodle()
        {
            var datasource = (from p in db.tbl_Parametros where p.IdParametro == 1 select p.Parametro).FirstOrDefault();
            var port = (from p in db.tbl_Parametros where p.IdParametro == 2 select p.Parametro).FirstOrDefault();
            var username = (from p in db.tbl_Parametros where p.IdParametro == 3 select p.Parametro).FirstOrDefault();
            var password = (from p in db.tbl_Parametros where p.IdParametro == 4 select p.Parametro).FirstOrDefault();
            var database = (from p in db.tbl_Parametros where p.IdParametro == 5 select p.Parametro).FirstOrDefault();

            //string connectionString = "datasource=74.220.213.190;port=3306;username=liceoin1_sra;password=SraL12021.;database=liceoin1_mood391;";
            string connectionString = "datasource="+ datasource +";port="+ port +";username="+ username +";password="+ password +";database="+ database +";";

            databaseConnection = new MySqlConnection(connectionString);
            // Abre la base de datos
            databaseConnection.Open();
        }

        public void ObtenerAlumnos()
        {
            // A consultar !
            try
            {
                CrearConexionMoodle();

                string query = "SELECT id, firstname, lastname, email, city, country, lastaccess, lastlogin FROM liceoin1_mood391.mo_user where deleted=0 and suspended=0 ;";

                // Prepara la conexión
                MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
                commandDatabase.CommandTimeout = 60;

                // Ejecuta la consultas
                MySqlDataReader reader = commandDatabase.ExecuteReader();

                // Hasta el momento todo bien, es decir datos obtenidos

                // IMPORTANTE :#
                // Si la consulta retorna un resultado, se usa el siguiente proceso para obtener datos
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        // Hacer algo con cada fila obtenida
                        string[] row = { reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4), reader.GetString(5), reader.GetString(6), reader.GetString(7) };
                        tblEstudiante estudiante = new tblEstudiante();
                        estudiante.nombres = row[1].ToString();
                        estudiante.primerApellido = row[2];
                        estudiante.segundoApellido = "";
                        estudiante.nie = "";

                        var nuevo = (from e in db.tblEstudiante select e.idAlumno).Max() + 1;
                        estudiante.codigo = (estudiante.nombres.Substring(0, 1) + estudiante.primerApellido.Substring(0, 1) + nuevo.ToString("D5")).Replace(" ", "");

                        estudiante.correo = row[3].ToString();
                        estudiante.departamento = row[4];

                        //validar campos no null y crear codigo estudiante
                        var OldRegister = (from e in db.tblEstudiante where e.correo == estudiante.correo select e).FirstOrDefault();
                        if (OldRegister == null)
                        {
                            db.tblEstudiante.Add(estudiante);
                            db.SaveChanges();
                        }
                    }
                }
                else
                {
                    Console.WriteLine("No se encontraron datos.");
                }

                // Cerrar la conexión
                databaseConnection.Close();
            }
            catch (Exception ex)
            {
                // Mostrar cualquier excepción
            }
        }


        public void ObtenerCursos()
        {
            // A consultar !
            try
            {
                CrearConexionMoodle();
                string query = "SELECT category, fullname, shortname, idnumber FROM liceoin1_mood391.mo_course;";

                // Prepara la conexión
                MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
                commandDatabase.CommandTimeout = 60;
                MySqlDataReader reader = commandDatabase.ExecuteReader();

                // Hasta el momento todo bien, es decir datos obtenidos

                // IMPORTANTE :#
                // Si tu consulta retorna un resultado, usa el siguiente proceso para obtener datos

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        // En nuestra base de datos, el array contiene:  ID 0, FIRST_NAME 1,LAST_NAME 2, ADDRESS 3
                        // Hacer algo con cada fila obtenida
                        char[] separators = new char[] { '-' };
                        string clave = "";
                        try
                        {
                            string[] subs = reader.GetString(2).Split(separators, StringSplitOptions.RemoveEmptyEntries);
                            clave = subs[0];
                        }
                        catch (Exception ex)
                        {
                        }

                        tblAsigatura materia = new tblAsigatura();
                        if (Convert.ToInt32(reader.GetString(0)) == 0)
                        {
                            materia.idGrado = Convert.ToInt32(reader.GetString(0)) + 1;
                        }
                        else
                        {
                            materia.idGrado = Convert.ToInt32(reader.GetString(0));
                        }
                        //materia.idGrado =Convert.ToInt32(reader.GetString(0));
                        materia.nombreAsignatura = reader.GetString(1);
                        materia.clave = reader.GetString(2);
                        materia.hora = "";
                        materia.creadoPor = "SyncManual";
                        materia.fechaCreacion = DateTime.Now;

                        var OldRegister = (from g in db.tblAsigatura where g.clave == materia.clave select g).FirstOrDefault();
                        if (OldRegister == null)
                        {
                            db.tblAsigatura.Add(materia);
                            db.SaveChanges();
                        }
                        else
                        {
                            if (Convert.ToInt32(reader.GetString(0)) == 0)
                            {
                                OldRegister.idGrado = Convert.ToInt32(reader.GetString(0)) + 1;
                            }
                            else
                            {
                                OldRegister.idGrado = Convert.ToInt32(reader.GetString(0));
                            }
                            OldRegister.nombreAsignatura = reader.GetString(1);
                            OldRegister.clave = clave;
                            OldRegister.actualizadoPor = "";
                            OldRegister.fechaActualizado = DateTime.Now;
                            db.SaveChanges();
                        }
                    }
                }
                else
                {
                    Console.WriteLine("No se encontraron datos.");
                }

                // Cerrar la conexión
                databaseConnection.Close();
            }
            catch (Exception ex)
            {
                // Mostrar cualquier excepción
            }
        }


        public void ObtenerCategorias()
        {
            // A consultar !
            try
            {
                CrearConexionMoodle();

                string query = "SELECT id, name, idnumber, description, parent FROM liceoin1_mood391.mo_course_categories order by id asc;";

                // Prepara la conexión
                MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
                commandDatabase.CommandTimeout = 60;
                MySqlDataReader reader = commandDatabase.ExecuteReader();

                // Hasta el momento todo bien, es decir datos obtenidos

                // IMPORTANTE :#
                // Si tu consulta retorna un resultado, usa el siguiente proceso para obtener datos

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        // En nuestra base de datos, el array contiene:  ID 0, FIRST_NAME 1,LAST_NAME 2, ADDRESS 3
                        // Hacer algo con cada fila obtenida
                        //string[] row = { reader.GetString(0), reader.GetString(1), reader.GetString(2), reader.GetString(3), reader.GetString(4)};

                        //string s = "You win some. You lose some.";
                        char[] separators = new char[] { '-' };
                        string clave = "";
                        try
                        {
                            string[] subs = reader.GetString(2).Split(separators, StringSplitOptions.RemoveEmptyEntries);
                            clave = subs[0];
                        }
                        catch (Exception ex)
                        {
                        }

                        tblGrado grado = new tblGrado();
                        //grado.idGrado = Convert.ToInt32(reader.GetString(0));
                        grado.descripcion = reader.GetString(1);
                        grado.nivelEscolar = "";
                        grado.clave = clave;
                        if (Convert.ToInt32(reader.GetString(4))==0)
                        {
                            grado.referencia = Convert.ToInt32(reader.GetString(4)) + 1;
                        }
                        else
                        {
                            grado.referencia = Convert.ToInt32(reader.GetString(4));
                        }
                        grado.Capacidad = 0;
                        grado.Vacantes = 0;
                        grado.creadoPor = "SyncManual";
                        grado.fechaCreacion = DateTime.Now;


                        var Ref = (from r in db.tblGrado where r.idGrado == grado.referencia select r).FirstOrDefault();

                        var OldRegister = (from g in db.tblGrado where g.clave == grado.clave select g).FirstOrDefault();
                        if (OldRegister==null)
                        {
                            if (Ref == null)
                            {
                                grado.nivelEscolar = reader.GetString(1);
                            }
                            else
                            {
                                grado.nivelEscolar = Ref.descripcion;
                            }
                            db.tblGrado.Add(grado);
                            db.SaveChanges();
                        }
                        else
                        {
                           //OldRegister.idGrado = Convert.ToInt32(reader.GetString(0));
                            OldRegister.descripcion = reader.GetString(1);
                            OldRegister.nivelEscolar = Ref.descripcion;
                            OldRegister.clave = clave;
                            if (Convert.ToInt32(reader.GetString(4)) == 0)
                            {
                                OldRegister.referencia = Convert.ToInt32(reader.GetString(4)) + 1;
                            }
                            else
                            {
                                OldRegister.referencia = Convert.ToInt32(reader.GetString(4));
                            }
                            db.SaveChanges();
                        }

                        //var nuevo = (from e in db.tblEstudiante select e.idAlumno).Max() + 1;
                        ////var numeroFormato = nuevo.ToString("D5");
                        //estudiante.codigo = (estudiante.nombres.Substring(0, 1) + estudiante.primerApellido.Substring(0, 1) + nuevo.ToString("D5")).Replace(" ", "");

                        //estudiante.correo = row[3].ToString();
                        //estudiante.departamento = row[4];

                        ////validar campos no null y crear codigo estudiante
                        //var OldRegister = (from e in db.tblEstudiante where e.correo == estudiante.correo select e).FirstOrDefault();
                        //if (OldRegister == null)
                        //{
                        //    db.tblEstudiante.Add(estudiante);
                        //    db.SaveChanges();
                        //}
                    }
                }
                else
                {
                    Console.WriteLine("No se encontraron datos.");
                }

                // Cerrar la conexión
                databaseConnection.Close();
            }
            catch (Exception ex)
            {
                // Mostrar cualquier excepción
            }
        }



    }
}