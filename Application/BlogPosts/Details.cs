using Site.Domain;
using MediatR;
using Site.Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Site.Application.BlogPosts
{
    public class Details
    {
        public class Query : IRequest<BlogPost>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BlogPost>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<BlogPost> Handle(Query request, CancellationToken cancellationToken)
            {
                var blogpost = await _context.BlogPosts.FindAsync(request.Id);

                if(blogpost == null)
                {
                    throw new Exception("Blogpost not found. " + request.Id);
                }

                return blogpost;
            }
        }
    }
}