using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace SRALI.Utilities
{
    public class SaveImage
    {
        public int SendImage(string filename, string urlLocal)
        {

            FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://192.168.11.232/Collections/GTCollections/" + filename);
            request.Credentials = new NetworkCredential("Imacanet", "pass%imaca09");
            request.Method = WebRequestMethods.Ftp.UploadFile;

            using (Stream fileStream = File.OpenRead(urlLocal))
            using (Stream ftpStream = request.GetRequestStream())
            {
                fileStream.CopyTo(ftpStream);
            }

            ////////////Moved = 301,
            ////////////OK = 200,
            ////////////Redirect = 302,
            FtpWebResponse response = (FtpWebResponse)request.GetResponse();
            //Returns "MovedPermanently", not 301 which is what I want.
            var result = (int)response.StatusCode;
            return result;
        }


    }
}