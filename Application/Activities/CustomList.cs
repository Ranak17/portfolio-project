using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class CustomList
    {
        public class Query : IRequest<Result<List<ActivityDTO>>>
        {
        }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    //.Include(a=>a.Attendees)
                    //.ThenInclude(u=>u.AppUser)
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                List<ActivityDTO> activitiesToReturn = _mapper.Map<List<ActivityDTO>>(activities);
                return Result<List<ActivityDTO>>.Success(activitiesToReturn);
            }
        }


    }
}
