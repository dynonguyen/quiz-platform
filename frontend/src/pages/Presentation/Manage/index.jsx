import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import { IO_EVENTS, SOCKET_EVENTS } from '~/constant/socket';
import useFetch from '~/hooks/useFetch';
import {
  addPresentation,
  removePresentation,
  updatePresentation
} from '~/redux/slices/presentationSlice';
import { socket } from '~/socket';
import PresentHostView from './HostView';
import PresentMemberView from './MemberView';

function PresentationManagePage() {
  const { presentationId } = useParams();
  const { userId } = useSelector((state) => state.user);
  const {
    isValidating,
    data: presentation,
    error
  } = useFetch(
    presentationId
      ? `${ENDPOINTS.PRESENTATION}/get-by-code?code=${presentationId}&userid=${userId}`
      : null
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHost = userId === presentation?.owner?._id;
  // Add & remove presentation to redux
  React.useEffect(() => {
    if (!isValidating && presentation) {
      dispatch(addPresentation(presentation));
    }
    return () => {
      dispatch(removePresentation());
    };
  }, [presentation, isValidating]);

  // Socket handler
  React.useEffect(() => {
    if (!isValidating && presentation) {
      const presentationId = presentation._id;
      socket.emit(SOCKET_EVENTS.JOIN_PRESENTATION, { presentationId, isHost });

      socket.on(IO_EVENTS.UPDATE_PRESENTATION, ({ from, updateFields }) => {
        if (from !== socket.id) {
          dispatch(updatePresentation(updateFields));
        }
      });

      return () => {
        socket.emit(SOCKET_EVENTS.LEAVE_PRESENTATION);
        socket.off(IO_EVENTS.UPDATE_PRESENTATION);
      };
    }
  }, [presentation, isValidating]);

  if (isValidating) {
    return <LoadingScreen />;
  }

  if (!presentation || error) {
    return navigate(PATH.NOTFOUND);
  }

  return isHost ? <PresentHostView /> : <PresentMemberView />;
}

export default PresentationManagePage;
