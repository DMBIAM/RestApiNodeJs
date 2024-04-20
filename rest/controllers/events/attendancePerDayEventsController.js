import AttendancePerDayEventsModels from '../../models/events/attendancePerDayEventsModels.js';

const AttendancePerDayEventsController = {
    async calculateAttendancePerDay(eventsList, req, res) {
        try {
            const attendancePerDay = await AttendancePerDayEventsModels.calculateAttendancePerDayEvents(eventsList);
            res.status(200).send({ msg: "Attendance per day calculated", attendancePerDay });
            return
        } catch (error) {
            console.log(error);
            res.status(error.status).send({ error: true, msg: error.message });
            return;
        }
    }
};

export default AttendancePerDayEventsController;
