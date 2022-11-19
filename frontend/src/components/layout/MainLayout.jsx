import TopBar from './TopBar';

function MainLayout({ children }) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}

export default MainLayout;
