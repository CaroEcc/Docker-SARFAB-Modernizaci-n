using System;
using Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Personnel;

namespace Modernization_SARFAB_Backend.Infrastructure.Persistence.Models.Inventory
{
    public partial class VolunteerInventoryTracking
    {
        public int PersonId { get; set; }
        public int ItemId { get; set; }
        public int PendingAmount { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Propiedades de navegación
        public virtual Person Person { get; set; } = null!;
        public virtual Item Item { get; set; } = null!;
    }
}
