alter table "Calendar"
    add constraint if not exists schedule_not_in_past
        check (date>now());

alter table "TimeSlot"
    add constraint "startTime less than endTime"
        check ("startTime"<"endTime");

alter table "Event"
    add constraint min_duration
        check (duration>=5);
