using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class InheritanceStructureImprovements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_BlogPosts_BlogPostId",
                table: "Medias");

            migrationBuilder.RenameColumn(
                name: "media_type",
                table: "Medias",
                newName: "MediaType");

            migrationBuilder.AlterColumn<int>(
                name: "BlogPostId",
                table: "Medias",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "BlogPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_BlogPosts_BlogPostId",
                table: "Medias",
                column: "BlogPostId",
                principalTable: "BlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_BlogPosts_BlogPostId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "BlogPosts");

            migrationBuilder.RenameColumn(
                name: "MediaType",
                table: "Medias",
                newName: "media_type");

            migrationBuilder.AlterColumn<int>(
                name: "BlogPostId",
                table: "Medias",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_BlogPosts_BlogPostId",
                table: "Medias",
                column: "BlogPostId",
                principalTable: "BlogPosts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
