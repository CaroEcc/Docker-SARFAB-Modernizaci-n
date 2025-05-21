using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modernization_SARFAB_Backend.Application.Interfaces.Common
{
    public interface IImageStorageService
    {
        Task SaveFileAsync(Stream fileStream, string folder, string fileName, string contentType);
        Task<Stream> GetFileAsync(string folder, string fileName);
        Task DeleteFileAsync(string folder, int id);
    }
}
