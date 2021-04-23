using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Site.Domain;
using Microsoft.AspNetCore.Authorization;
using MediatR;
using Site.Application.BlogPosts;
using System.Threading;
using Microsoft.AspNetCore.Http;

namespace Site.Controllers
{
    [Authorize]
    public class BlogPostController : BaseController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<BlogPost>>> List(CancellationToken ct)
        {   
            return await Mediator.Send(new List.Query(), ct);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPut("{id}/images")]
        public async Task<ActionResult<Unit>> Upload([FromForm] Upload.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogPost>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
    }
}