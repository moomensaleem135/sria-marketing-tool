'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import {
  CalendarStyles,
  CancelButton,
  CheckBoxDiv,
  CheckButton,
  CheckButtonDiv,
  Checkicon,
  DeleteBgDiv,
  DeleteButton,
  DeleteButtonDiv,
  DeleteOverLaySubDiv,
  DeleteOverlayDiv,
  DeletePDiv,
  DeleteParagraph,
  DialogPanel,
  DialogPanelDiv1,
  DialogPanelDiv2,
  DialogPanelDiv3,
  DialogTitle,
  Dialogue,
  DragEventDiv,
  EventInput,
  Icon,
  InputDiv,
  Main,
  NewButton,
  TitleDiv
} from './index.styles';
import SharedLayout from '@/components/layout/shared-layout';

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function Calendar1a() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    title: '',
    start: '',
    allDay: false,
    id: 0
  });

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title');
          let id = eventEl.getAttribute('data');
          let start = eventEl.getAttribute('start');
          return { title, id, start };
        }
      });
    }
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime()
    });
    setShowModal(true);
  }

  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime()
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  }

  function handleDelete() {
    setAllEvents(allEvents.filter((event) => Number(event.id) !== Number(idToDelete)));
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewEvent({
      ...newEvent,
      title: e.target.value
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      title: '',
      start: '',
      allDay: false,
      id: 0
    });
  }

  return (
    <SharedLayout title="Calender">
      <Main>
        <CalendarStyles>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: '',
              center: 'prev,title,next',
              right: ''
            }}
            height="100%"
            firstDay={1}
            fixedWeekCount={false}
            events={allEvents as EventSourceInput}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            dateClick={handleDateClick}
            drop={(data) => addEvent(data)}
            eventClick={(data) => handleDeleteModal(data)}
            eventClassNames={(arg) =>
              new Date(arg.event.start as Date) < new Date() ? 'past-event' : ''
            }
          />
          <DragEventDiv id="draggable-el">
            <NewButton>New Task</NewButton>
          </DragEventDiv>
        </CalendarStyles>

        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialogue as="div" className="relative z-10" onClose={setShowDeleteModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DeleteBgDiv />
            </Transition.Child>

            <DeleteOverlayDiv>
              <DeleteOverLaySubDiv>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel>
                    <DialogPanelDiv1>
                      <DialogPanelDiv2>
                        <DialogPanelDiv3>
                          <Icon aria-hidden="true" />
                        </DialogPanelDiv3>
                        <TitleDiv>
                          <DialogTitle as="h3">Delete Event</DialogTitle>
                          <DeletePDiv>
                            <DeleteParagraph>
                              Are you sure you want to delete this event?
                            </DeleteParagraph>
                          </DeletePDiv>
                        </TitleDiv>
                      </DialogPanelDiv2>
                    </DialogPanelDiv1>
                    <DeleteButtonDiv>
                      <DeleteButton type="button" onClick={handleDelete}>
                        Delete
                      </DeleteButton>
                      <CancelButton type="button" onClick={handleCloseModal}>
                        Cancel
                      </CancelButton>
                    </DeleteButtonDiv>
                  </DialogPanel>
                </Transition.Child>
              </DeleteOverLaySubDiv>
            </DeleteOverlayDiv>
          </Dialogue>
        </Transition.Root>
        <Transition.Root show={showModal} as={Fragment}>
          <Dialogue as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DeleteBgDiv />
            </Transition.Child>

            <DeleteOverlayDiv>
              <DeleteOverLaySubDiv>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel>
                    <div>
                      <CheckBoxDiv>
                        <Checkicon aria-hidden="true" />
                      </CheckBoxDiv>
                      <TitleDiv>
                        <DialogTitle as="h3">Add Event</DialogTitle>
                        <form action="submit" onSubmit={handleSubmit}>
                          <InputDiv>
                            <EventInput
                              type="text"
                              name="title"
                              value={newEvent.title}
                              onChange={(e) => handleChange(e)}
                              placeholder="Title"
                            />
                          </InputDiv>
                          <CheckButtonDiv>
                            <CheckButton type="submit" disabled={newEvent.title === ''}>
                              Create
                            </CheckButton>
                            <CancelButton type="button" onClick={handleCloseModal}>
                              Cancel
                            </CancelButton>
                          </CheckButtonDiv>
                        </form>
                      </TitleDiv>
                    </div>
                  </DialogPanel>
                </Transition.Child>
              </DeleteOverLaySubDiv>
            </DeleteOverlayDiv>
          </Dialogue>
        </Transition.Root>
      </Main>
    </SharedLayout>
  );
}
