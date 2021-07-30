using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SRALI.Models;
using SRALI.Controllers;
using Microsoft.SqlServer;
using System.Data.SqlClient;

namespace SRALI.Utilities
{
    public class SyncEstudiante
    {
        private SAE7Entities dbsae = new SAE7Entities();
        private SARADB_Entities db = new SARADB_Entities();
        private string host = "", userdb = "", passdb = "", dbname= "";

        public SqlConnection SQLSERVERConnection()
        {

            SqlConnection cnn = null;
            try
            {
                string connectionString = null;
                host = (from p in db.tbl_Parametros where p.IdParametro == 6 select p.Parametro).FirstOrDefault();
                userdb = (from p in db.tbl_Parametros where p.IdParametro == 7 select p.Parametro).FirstOrDefault();
                passdb = (from p in db.tbl_Parametros where p.IdParametro == 8 select p.Parametro).FirstOrDefault();
                dbname = (from p in db.tbl_Parametros where p.IdParametro == 9 select p.Parametro).FirstOrDefault();

                connectionString = "Data Source=" + host + ";Initial Catalog=" + dbname + ";User ID=" + userdb + ";Password=" + passdb + "";
                cnn = new SqlConnection(connectionString);

                return cnn;
            }
            catch (Exception ex)
            {
                return cnn;
            }
        }


        public int GetMaxIdSAEStudent()
        {
            try
            {
                var mx = (from s in dbsae.CLIE01 where s.CLAVE != "MOSTR" select s.CLAVE).Max();
                var max = Convert.ToInt32(mx);
                return max;
            }
            catch (Exception ex)
            {
                return 0;
            }
        } 

        public string SetClaveStudent(int clave)
        {
            var nuevaclave = "";
            if(clave < 10)
            {
                nuevaclave = "         " + clave.ToString();
            }else if (clave < 100)
            {
                nuevaclave = "        " + clave.ToString();
            }
            else if (clave < 1000)
            {
                nuevaclave = "       " + clave.ToString();
            }
            else if (clave < 10000)
            {
                nuevaclave = "      " + clave.ToString();
            }
            else if (clave < 100000)
            {
                nuevaclave = "     " + clave.ToString();
            }
            else if (clave < 1000000)
            {
                nuevaclave = "    " + clave.ToString();
            }
            else if (clave < 10000000)
            {
                nuevaclave = "   " + clave.ToString();
            }
            else if (clave < 100000000)
            {
                nuevaclave = "  " + clave.ToString();
            }
            else if (clave < 1000000000)
            {
                nuevaclave = " " + clave.ToString();
            }

            return nuevaclave;
        }
            
    }
}