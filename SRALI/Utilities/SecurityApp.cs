using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;

namespace SRALI.Utilities
{
    public class SecurityApp 
    {
        public string ConvertToHashMD5(string cadenatexto)
        {
            StringBuilder hash = new StringBuilder();
            MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
            byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(cadenatexto));
            return Convert.ToBase64String(bytes);
        }
    }
}