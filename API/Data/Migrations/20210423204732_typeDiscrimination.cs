using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class typeDiscrimination : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Project",
                table: "Medias");

            migrationBuilder.RenameColumn(
                name: "PublicID",
                table: "Medias",
                newName: "PublicId");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Medias",
                newName: "TypeDiscriminator");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PublicId",
                table: "Medias",
                newName: "PublicID");

            migrationBuilder.RenameColumn(
                name: "TypeDiscriminator",
                table: "Medias",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "Project",
                table: "Medias",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
