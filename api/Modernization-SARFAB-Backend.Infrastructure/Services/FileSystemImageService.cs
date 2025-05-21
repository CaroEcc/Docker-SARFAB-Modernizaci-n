using Modernization_SARFAB_Backend.Application.Interfaces.Common;

namespace Modernization_SARFAB_Backend.Infrastructure.Services
{
    public class FileSystemImageService : IImageStorageService
    {
        private readonly string _basePath;
        private readonly Dictionary<string, string> _allowedExtensions = new()
       {
           { "image/jpeg", ".jpg" },
           { "image/png", ".png" },
           { "application/pdf", ".pdf" },
           { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", ".xlsx" }
       };

        public FileSystemImageService(string basePath)
        {
            _basePath = Path.Combine(basePath, "Images");
        }

        public async Task SaveFileAsync(Stream fileStream, string folder, string fileName, string contentType)
        {
            if (!_allowedExtensions.TryGetValue(contentType, out string extension))
                throw new InvalidOperationException($"Tipo de archivo no soportado: {contentType}");

            var directory = Path.Combine(_basePath, folder);
            Directory.CreateDirectory(directory);

            var filePath = Path.Combine(directory, fileName);
            using var fs = new FileStream(filePath, FileMode.Create);
            await fileStream.CopyToAsync(fs);
        }

        public async Task<Stream> GetFileAsync(string folder, string fileName)
        {
            if (string.IsNullOrEmpty(fileName)) return null;

            var filePath = Path.Combine(_basePath, folder, fileName);
            if (!File.Exists(filePath)) return null;

            var memoryStream = new MemoryStream();
            using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                await fileStream.CopyToAsync(memoryStream);
            }
            memoryStream.Position = 0;
            return memoryStream;
        }

        public Task DeleteFileAsync(string folder, int id)
        {
            var directory = Path.Combine(_basePath, folder);
            var files = Directory.GetFiles(directory, $"{folder}_{id}.*");

            foreach (var file in files)
            {
                File.Delete(file);
            }

            return Task.CompletedTask;
        }

        private string GetFilePath(string folder, int id, string extension) =>
            Path.Combine(_basePath, folder, $"{folder}_{id}{extension}");
    }
}
