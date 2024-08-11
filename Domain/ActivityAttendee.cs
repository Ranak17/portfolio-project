using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserID { get; set; }
        public AppUser AppUser { get; set; }
        public PlannedActivity PlannedActivity { get; set; }
        public Guid ActivityID { get; set; }
        public bool IsHost {  get; set; }
    }
}
