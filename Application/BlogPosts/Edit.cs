using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Site.Persistence;

namespace Site.Application.BlogPosts
{
    public class Edit
    {
        public class Command: IRequest
        {
            public Guid Id { get; set; }
            public string Title{ get; set; }
            public DateTime? Date { get; set; }
            public string Content { get; set; }
            public string ImagePaths { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
    
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var blogpost = await _context.BlogPosts.FindAsync(request.Id);
                
                if(blogpost == null)
                {
                    throw new Exception("Unable to edit blog post. ID: " + request.Id);
                }

                //If null then right of ?? will execute
                blogpost.Title = request.Title ?? blogpost.Title;
                blogpost.Content = request.Content ?? blogpost.Content;
                blogpost.Date = request.Date ?? blogpost.Date;
                blogpost.ImagePaths = request.ImagePaths ?? blogpost.ImagePaths;
                
                var success = await _context.SaveChangesAsync() > 0;
        
                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}