using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Site.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPosts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Content = table.Column<string>(type: "TEXT", nullable: true),
                    ImagePaths = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Date", "ImagePaths", "Title" },
                values: new object[] { new Guid("6a4d7344-b8fc-4881-a671-f705b3507ad9"), "Test content #1", new DateTime(2021, 3, 11, 14, 57, 42, 113, DateTimeKind.Local).AddTicks(6664), "", "Test title #1" });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Date", "ImagePaths", "Title" },
                values: new object[] { new Guid("421c909d-cdb5-4171-96a2-a9f928941fc5"), "Test content #2", new DateTime(2021, 3, 12, 14, 57, 42, 115, DateTimeKind.Local).AddTicks(928), "", "Test title #2" });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Date", "ImagePaths", "Title" },
                values: new object[] { new Guid("b2538f0d-348a-4a9e-a5c5-8a9b3d6206e2"), "Test content #3", new DateTime(2021, 3, 13, 14, 57, 42, 115, DateTimeKind.Local).AddTicks(961), "", "Test title #3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPosts");
        }
    }
}
