using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Site.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Site.Persistence;

namespace Site.Application.BlogPosts
{
    public class List
    {
        public class Query : IRequest<List<BlogPost>> {}

        public class Handler : IRequestHandler<Query, List<BlogPost>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            public Handler(DataContext context, ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<List<BlogPost>> Handle(Query request, CancellationToken ct)
            {
                var blogposts = await _context.BlogPosts.ToListAsync(ct);
                return blogposts;
            }
        }
    }
}