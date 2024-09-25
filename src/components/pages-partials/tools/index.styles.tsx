import styled from '@emotion/styled';
import { Dialog } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export const Main = styled.div`
  border-style: none;
  justify-content: space-between;
  margin-bottom: 12px;
  border-bottom: 1px solid #805ad5;
  padding: 1rem 7rem;
`;

export const CalendarStyles = styled.div`
  position: relative;
  height: 94vh;
  .fc-day {
    color: var(--Grey-600, rgba(92, 102, 112, 0.8));
    text-align: center;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    margin: 8px;
  }

  .fc-view {
    width: 100%;
    background-color: white;
  }

  .fc-toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fc-daygrid-day-top {
    display: flex;
    justify-content: center;
  }

  .fc-h-event,
  .fc-v-event {
    background-color: #4f9ef8;
    border: 1px solid #4f9ef8;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #f3ebff;
  }
  .fc-event.past-event {
    background-color: red;
    border-color: red;
    color: white; /* You can adjust the text color as needed */
  }

  .fc .fc-button {
    background-color: transparent;
    border: none;
    font-size: 2em;
    color: black;
  }

  .fc-toolbar div {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    font-family: Inter;
  }

  .fc-toolbar h2 {
    font-size: 2rem;
    font-weight: 1000;
  }

  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:disabled {
    background-color: #9333ea;
  }
`;

export const DragEventDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
  position: absolute;
  top: 0%;
  left: 90%;
`;
export const NewButton = styled.button`
  justify-content: center;
  border-radius: 0.5rem;
  background-color: var(--Blue-600, #3a6fb6);
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: var(--Blue-600, #3a6fb6);
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  /* @media screen and (max-width: 640px) {
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
} */
`;
export const Heading = styled.h1`
  font-weight: bold;
  font-size: 1.125rem;
  text-align: center;
`;
export const EventsDiv = styled.div`
  border-width: 2px;
  padding: 0.25rem;
  margin: 0.5rem;
  width: 100%;
  margin-left: auto;
  text-align: center;
  background-color: white;
`;

export const DeleteBgDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #718096;
  background-color: rgba(113, 128, 150, 0.75);
  transition-property: opacity;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;
export const DeleteOverlayDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
`;
export const DeleteOverLaySubDiv = styled.div`
  display: flex;
  min-height: 60vh;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  text-align: center;
`;
export const DialogPanel = styled(Dialog.Panel)`
  position: relative;
  transform: translateY(0);
  overflow: hidden;
  border-radius: 1rem;
  background-color: #fff;
  padding: 1rem 1.5rem 1.25rem;
  text-align: left;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  @media (min-width: 640px) {
    margin-top: 2rem;
    width: 100%;
    max-width: 32rem;
    padding: 2rem;
  }
`;

export const DialogPanelDiv1 = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  padding-bottom: 0.5rem;
  padding-top: 1.25rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
    padding-bottom: 1rem;
    padding-top: 1.75rem;
  }
`;
export const DialogPanelDiv2 = styled.div`
  @media (min-width: 640px) {
    display: flex;
    align-items: flex-start;
  }
`;
export const DialogPanelDiv3 = styled.div`
  margin: auto;
  display: flex;
  height: 3rem;
  width: 3rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #feb2b2;

  @media (min-width: 640px) {
    margin-left: 0;
    margin-right: 0;
    height: 2.5rem;
    width: 2.5rem;
  }
`;

export const Icon = styled(ExclamationTriangleIcon)`
  height: 1.5rem;
  width: 1.5rem;
  color: #ef4444;
`;

export const TitleDiv = styled.div`
  margin-top: 0.75rem;
  text-align: center;

  @media (min-width: 640px) {
    margin-left: 1rem;
    margin-top: 0;
    text-align: left;
  }
`;
export const Dialogue = styled(Dialog)`
  position: relative;
  z-index: 10;
`;

export const DialogTitle = styled(Dialog.Title)`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5;
  color: #333333;
`;
export const DeletePDiv = styled.div`
  margin-top: 0.5rem;
`;
export const DeleteParagraph = styled.p`
  font-size: 0.875rem;
  color: #718096;
`;

export const DeleteButtonDiv = styled.div`
  background-color: #f7fafc;
  padding: 1rem;
  display: flex;
  flex-direction: row-reverse;

  @media (min-width: 640px) {
    .bg-gray-50-container {
      padding: 1rem 2rem;
    }
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: #dc2626;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b91c1c;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  @media screen and (max-width: 640px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
`;

export const CancelButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: gray;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  @media screen and (max-width: 640px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
`;

export const CheckBoxDiv = styled.div`
  margin-left: auto;
  display: flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #d1f3c4;
`;

export const Checkicon = styled(CheckIcon)`
  height: 1.5rem;
  width: 1.5rem;
  color: #34d399;
`;
export const InputDiv = styled.div`
  margin-top: 0.1rem;
`;
export const EventInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.375rem;
  color: #111827;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-width: 1px;
  border-style: inset;
  border-color: #d1d5db;
  font-size: 1rem;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 1.125rem;
    line-height: 1.75;
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
    line-height: 1.75;
  }
`;
export const CheckButtonDiv = styled.div`
  margin-top: 1.25rem;
  display: flex;
  gap: 0.75rem;
  @media (min-width: 640px) {
    .event-container {
      display: grid;
      margin-top: 1.5rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;

export const CheckButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 0.375rem;
  background-color: #10b981;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #059669;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  @media screen and (max-width: 640px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
`;
