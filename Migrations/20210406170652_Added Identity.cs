using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Site.Migrations
{
    public partial class AddedIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: new Guid("421c909d-cdb5-4171-96a2-a9f928941fc5"));

            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: new Guid("6a4d7344-b8fc-4881-a671-f705b3507ad9"));

            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: new Guid("b2538f0d-348a-4a9e-a5c5-8a9b3d6206e2"));

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Date", "ImagePaths", "Title" },
                values: new object[] { new Guid("b70aa4cc-0376-4df7-826e-29f4c512b996"), "Test content #1", new DateTime(2021, 4, 6, 10, 6, 51, 915, DateTimeKind.Local).AddTicks(8800), "", "Test title #1" });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Date", "ImagePaths", "Title" },
                values: new object[] { new Guid("24cc5345-09a9-4182-8ba6-91afd2d54345"), "Test content #2", new DateTime(2021, 4, 7, 10, 6, 51, 917, DateTimeKind.Local).AddTicks(3514), "", "Test title #2" });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Content", "Date", "ImagePaths", "Title" },
                values: new object[] { new Guid("a49fd3a8-8d67-4a33-aeeb-8c6300cd2094"), "Test content #3", new DateTime(2021, 4, 8, 10, 6, 51, 917, DateTimeKind.Local).AddTicks(3552), "", "Test title #3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: new Guid("24cc5345-09a9-4182-8ba6-91afd2d54345"));

            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: new Guid("a49fd3a8-8d67-4a33-aeeb-8c6300cd2094"));

            migrationBuilder.DeleteData(
                table: "BlogPosts",
                keyColumn: "Id",
                keyValue: new Guid("b70aa4cc-0376-4df7-826e-29f4c512b996"));

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
    }
}
