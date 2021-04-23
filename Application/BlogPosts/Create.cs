using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Site.Domain;
using Site.Persistence;
using FluentValidation;

namespace Site.Application.BlogPosts
{
    public class Create
    {
        public class Command: IRequest
        {
            public Guid Id { get; set; }
            public string Title{ get; set; }
            public string Date { get; set; }
            public string Content { get; set; }
            public string ImagePaths { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Content).NotEmpty();
            }
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
                var blogpost = new BlogPost{
                    Id = request.Id,
                    Title = request.Title,
                    Date = DateTime.Parse(request.Date),
                    Content = request.Content,
                    ImagePaths = request.ImagePaths
                };

                _context.BlogPosts.Add(blogpost);
                var success = await _context.SaveChangesAsync() > 0;

                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}