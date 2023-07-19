alter table "calendars"
    add constraint if not exists schedule_not_in_past
        check (date>now());

alter table "timeslots"
    add constraint "startTime less than endTime"
        check ("startTime"<"endTime");

alter table "events"
    add constraint min_duration
        check (duration>=5);
