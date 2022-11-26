import { Box, Container, Flex } from '@cads-ui/core';
import { Tab, Tabs } from '@mui/material';
import { Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import ComponentLoading from '~/components/ComponentLoading';
import { PATH } from '~/constant/path';

// -----------------------------
const ROOT_PATH = PATH.MANAGE_GROUP;

// -----------------------------
function ManageGroupPage() {
  const { groupId } = useParams();
  const { pathname } = useLocation();

  const genTabVal = (path = '') => path.replace(':groupId', groupId);

  const MENU = [
    { label: 'Chung', value: genTabVal(ROOT_PATH.GENERAL) },
    { label: 'Bảng tin', value: genTabVal(ROOT_PATH.NEWS) },
    { label: 'Thành viên', value: genTabVal(ROOT_PATH.MEMBERS) },
    { label: 'Bài tập', value: genTabVal(ROOT_PATH.PRACTICES) },
    { label: 'Xoá nhóm', value: genTabVal(ROOT_PATH.DELETE) }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Flex center>
        <Tabs
          value={pathname}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {MENU.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              label={item.label}
              LinkComponent={Link}
              to={item.value}
            />
          ))}
        </Tabs>
      </Flex>

      <Box sx={{ mt: 6 }}>
        <Suspense fallback={<ComponentLoading />}>
          <Outlet />
        </Suspense>
      </Box>
    </Container>
  );
}

export default ManageGroupPage;
