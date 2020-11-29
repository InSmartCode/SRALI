using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(SRALI.Startup))]
namespace SRALI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
