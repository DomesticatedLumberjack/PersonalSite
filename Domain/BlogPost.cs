using System;

namespace Site.Domain
{
    public class BlogPost
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImagePaths { get; set; }
    }
}