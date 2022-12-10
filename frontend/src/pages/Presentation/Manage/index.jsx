import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingScreen from '~/components/LoadingScreen';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import useFetch from '~/hooks/useFetch';
import {
  addPresentation,
  removePresentation
} from '~/redux/slices/presentationSlice';
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
      ? `${ENDPOINTS.PRESENTATION}/get-by-code?code=${presentationId}`
      : null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isValidating && presentation) {
      dispatch(addPresentation(presentation));
    }
    return () => {
      dispatch(removePresentation());
    };
  }, [presentation]);

  if (isValidating) {
    return <LoadingScreen />;
  }

  if (!presentation || error) {
    return navigate(PATH.NOTFOUND);
  }

  const isHost = userId === presentation.owner?._id;

  return isHost ? <PresentHostView /> : <PresentMemberView />;
}

export default PresentationManagePage;
