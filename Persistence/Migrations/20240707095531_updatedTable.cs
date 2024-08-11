using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class updatedTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendees_Activities_PlannedActivityId",
                table: "ActivityAttendees");

            migrationBuilder.DropIndex(
                name: "IX_ActivityAttendees_PlannedActivityId",
                table: "ActivityAttendees");

            migrationBuilder.DropColumn(
                name: "PlannedActivityId",
                table: "ActivityAttendees");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAttendees_ActivityID",
                table: "ActivityAttendees",
                column: "ActivityID");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendees_Activities_ActivityID",
                table: "ActivityAttendees",
                column: "ActivityID",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityAttendees_Activities_ActivityID",
                table: "ActivityAttendees");

            migrationBuilder.DropIndex(
                name: "IX_ActivityAttendees_ActivityID",
                table: "ActivityAttendees");

            migrationBuilder.AddColumn<Guid>(
                name: "PlannedActivityId",
                table: "ActivityAttendees",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ActivityAttendees_PlannedActivityId",
                table: "ActivityAttendees",
                column: "PlannedActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityAttendees_Activities_PlannedActivityId",
                table: "ActivityAttendees",
                column: "PlannedActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
