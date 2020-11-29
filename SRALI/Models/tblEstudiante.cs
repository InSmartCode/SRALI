//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class tblEstudiante
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblEstudiante()
        {
            this.tblPadredeFamilia = new HashSet<tblPadredeFamilia>();
        }
    
        public int idAlumno { get; set; }
        public string codigo { get; set; }
        public string nombres { get; set; }
        public string primerApellido { get; set; }
        public string segundoApellido { get; set; }
        public Nullable<System.DateTime> fechaNacimiento { get; set; }
        public Nullable<int> edad { get; set; }
        public string sexo { get; set; }
        public string nie { get; set; }
        public string lugarNacimiento { get; set; }
        public string numeroPartidaNacimiento { get; set; }
        public string tomo { get; set; }
        public string folio { get; set; }
        public string libro { get; set; }
        public string departamento { get; set; }
        public string municipio { get; set; }
        public string direccion { get; set; }
        public string institucionProcedencia { get; set; }
        public string gradoIngreso { get; set; }
        public string archivofoto { get; set; }
        public Nullable<int> idResponsable { get; set; }
        public string creadoPor { get; set; }
        public Nullable<System.DateTime> fechaCreacion { get; set; }
        public string actualizadoPor { get; set; }
        public Nullable<System.DateTime> fechaActualizado { get; set; }
    
        public virtual tblResponsableEstudiante tblResponsableEstudiante { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblPadredeFamilia> tblPadredeFamilia { get; set; }
    }
}
