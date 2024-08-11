using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public PlannedActivity PlannedActivity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.PlannedActivity).SetValidator(new ActivityValidator());
            }
        }


        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context,IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                AppUser? user = await _context.Users.FirstOrDefaultAsync(x=>x.UserName==_userAccessor.GetUsername());

                ActivityAttendee activityAttendee = new ActivityAttendee
                {
                    AppUser = user,
                    PlannedActivity = request.PlannedActivity,
                    IsHost = true
                };
                request.PlannedActivity.Attendees.Add(activityAttendee);
                _context.Activities.Add(request.PlannedActivity);
                var result = await _context.SaveChangesAsync()>0;
                if (!result) return Result<Unit>.Failure("Failed to create activity");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
