﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SRALI.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SARADB_Entities : DbContext
    {
        public SARADB_Entities()
            : base("name=SARADB_Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<tblConfGeneral> tblConfGeneral { get; set; }
        public virtual DbSet<tblEstudiante> tblEstudiante { get; set; }
        public virtual DbSet<tblOpcionesSistema> tblOpcionesSistema { get; set; }
        public virtual DbSet<tblOpcionesxPerfil> tblOpcionesxPerfil { get; set; }
        public virtual DbSet<tblPadredeFamilia> tblPadredeFamilia { get; set; }
        public virtual DbSet<tblPerfil> tblPerfil { get; set; }
        public virtual DbSet<tblUsuario> tblUsuario { get; set; }
        public virtual DbSet<V_UsuariosSistema> V_UsuariosSistema { get; set; }
        public virtual DbSet<tblResponsableEstudiante> tblResponsableEstudiante { get; set; }
    }
}
