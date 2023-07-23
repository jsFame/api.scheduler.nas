select e.title, u.email as guest, u.id as guestId, u2.email host, e."hostId", t."startTime"::time, e.duration from calendars c, users u, timeslots t, events e
    left join users u2 on e."hostId" = u2.id
    where
        t.id=c."timeSlotId" and
        t."startTime">CURRENT_TIME and
        u.id in (c."guestId");
