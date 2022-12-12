// TODO: implement UI & handle logic
// Tham khảo HostView

import useSelectorOnly from '~/hooks/useOnlySelector';

function PresentMemberView() {
  // Handle logic trong getPresentationByCode trước khi implement
  const presentation = useSelectorOnly('presentation', [], true);
  console.log(presentation);

  return <div>PresentMemberView</div>;
}

export default PresentMemberView;
