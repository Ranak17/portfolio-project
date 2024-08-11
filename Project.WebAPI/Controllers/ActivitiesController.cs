using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;

namespace Project.WebAPI.Controllers
{

    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities() 
        {
            return HandleResult(await Mediator.Send(new CustomList.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(PlannedActivity plannedActivity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { PlannedActivity = plannedActivity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, PlannedActivity plannedActivity)
        {
            plannedActivity.Id = id;
            await Mediator.Send(new Edit.Command
            {
                PlannedActivity = plannedActivity
            });

            return Ok();
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }


    }
}
