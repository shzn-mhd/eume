import { useEffect, useRef, useState } from 'react';

// material-ui
import { useMediaQuery, Box, Dialog, SpeedDial, Tooltip } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

// project imports
import { PopupTransition } from 'components/@extended/Transitions';
import CalendarStyled from 'sections/apps/calendar/CalendarStyled';
import Toolbar from 'sections/apps/calendar/Toolbar';
import AddEventForm from 'sections/apps/calendar/AddEventForm';
import { useGetEvents, updateEvent } from 'api/calender';

// assets
import { PlusOutlined } from '@ant-design/icons';

// ==============================|| CALENDAR - MAIN ||============================== //

const Calendar = () => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [calendarView, setCalendarView] = useState();
  const [date, setDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState(null);
  const calendarRef = useRef(null);
  const { events } = useGetEvents();

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = matchDownSM ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setCalendarView(newView);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownSM]);

  // calendar toolbar events
  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleViewChange = (newView) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(newView);
      setCalendarView(newView);
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  // calendar events
  const handleRangeSelect = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    setSelectedRange({ start: arg.start, end: arg.end });
    setModalOpen(true);
  };

  const handleEventSelect = (arg) => {
    if (arg?.event?.id) {
      const event = events.find((event) => event.id === arg.event.id);
      setSelectedEvent(event);
    }

    setModalOpen(true);
  };

  const handleEventUpdate = async ({ event }) => {
    await updateEvent(event.id, {
      allDay: event.allDay,
      start: event.start,
      end: event.end
    });
    setModalOpen(true);
  };

  const modalCallback = (openModal) => {
    // open/close modal based on dialog state
    if (!openModal) {
      setSelectedEvent(null);
    }
    setModalOpen(openModal);
  };

  const handleModal = () => {
    if (isModalOpen) {
      setSelectedEvent(null);
    }
    setModalOpen(!isModalOpen);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CalendarStyled>
        <Toolbar
          date={date}
          view={calendarView}
          onClickNext={handleDateNext}
          onClickPrev={handleDatePrev}
          onClickToday={handleDateToday}
          onChangeView={handleViewChange}
        />

        <FullCalendar
          weekends
          editable
          droppable
          selectable
          events={events}
          ref={calendarRef}
          rerenderDelay={10}
          initialDate={date}
          initialView={calendarView}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          allDayMaintainDuration
          eventResizableFromStart
          select={handleRangeSelect}
          eventDrop={handleEventUpdate}
          eventClick={handleEventSelect}
          eventResize={handleEventUpdate}
          height={matchDownSM ? 'auto' : 720}
          plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
        />
      </CalendarStyled>

      {/* Dialog renders its body even if not open */}
      <Dialog
        maxWidth="sm"
        TransitionComponent={PopupTransition}
        fullWidth
        onClose={handleModal}
        open={isModalOpen}
        sx={{ '& .MuiDialog-paper': { p: 0 } }}
      >
        <AddEventForm modalCallback={modalCallback} event={selectedEvent} range={selectedRange} onCancel={handleModal} />
      </Dialog>
      <Tooltip title="Add New Event">
        <SpeedDial
          ariaLabel="add-event-fab"
          sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
          icon={<PlusOutlined style={{ fontSize: '1.5rem' }} />}
          onClick={handleModal}
        />
      </Tooltip>
    </Box>
  );
};

export default Calendar;
