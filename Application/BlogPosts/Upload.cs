using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Site.Persistence;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace Site.Application.BlogPosts
{
    public class Upload
    {
        public class Command: IRequest
        {
            public string Id {get; set;}
            public string FileName {get; set;}
            public IFormFile FormFile {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command command, CancellationToken cancellationToken)
            {
                var file = command.FormFile;
                if(file != null && file.Length > 0)
                {
                    string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), @"ClientApp/build/assets", command.Id);
                    string filePath = Path.Combine(directoryPath, command.FileName);

                    if(!Directory.Exists(directoryPath))
                    {
                        Directory.CreateDirectory(directoryPath);
                    }

                    using(var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream, cancellationToken);
                    }
		    Console.WriteLine(filePath);
                }
                else
                {
                    throw new Exception("Problem uploading file");
                }
                return Unit.Value;
            }
        }
    }
}
