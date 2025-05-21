using System;
using Modernization_SARFAB_Backend.Domain.Exceptions;

namespace Modernization_SARFAB_Backend.Domain.Entities.Inventory
{
    public class ItemEntity
    {
        public int ItemId { get; private set; }
        public string Name { get; private set; }
        public int Quantity { get; private set; }
        public short? UserId { get; set; }
        public ItemStatus Status { get; private set; }

        public ItemEntity(int id, string name, int quantity, short? userId = null)
        {
            ItemId = id;
            if (string.IsNullOrWhiteSpace(name))
                throw new DomainException("El nombre del artículo no puede estar vacío.");

            if (quantity < 0)
                throw new DomainException("La cantidad no puede ser negativa.");

            Name = name;
            Quantity = quantity;
            UserId = userId;
        }
        public ItemEntity(string name, int quantity, short? userId = null)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new DomainException("El nombre del artículo no puede estar vacío.");

            if (quantity < 0)
                throw new DomainException("La cantidad no puede ser negativa.");

            Name = name;
            Quantity = quantity;
            UserId = userId;
            Status = ItemStatus.Active;
        }

        public void UpdateDetails(string? newName, int? newQuantity)
        {
            if (!string.IsNullOrWhiteSpace(newName))
            {
                Name = newName;
            }

            if (newQuantity.HasValue)
            {
                if (newQuantity < 0)
                    throw new DomainException("La cantidad no puede ser negativa.");

                Quantity = newQuantity.Value;
            }
        }

        public enum ItemStatus
        {
            Deleted = 0,
            Active = 1
        }
    }
}