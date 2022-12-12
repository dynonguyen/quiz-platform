// TODO: implement UI & handle logic
// Tham khảo HostView

import useSelectorOnly from '~/hooks/useOnlySelector';

function PresentMemberView() {
  // Handle logic trong getPresentationByCode trước khi implement
  const { slides } = useSelectorOnly('presentation', ['slides']);
  console.log(slides);

  return <div>PresentMemberView</div>;
}

export default PresentMemberView;
