import { Box, Container, Flex } from '@cads-ui/core';
import { Tab, Tabs } from '@mui/material';
import { Suspense } from 'react';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useParams
} from 'react-router-dom';
import ComponentLoading from '~/components/ComponentLoading';
import { GROUP_ROLES } from '~/constant';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import useFetch from '~/hooks/useFetch';

// -----------------------------
const ROOT_PATH = PATH.MANAGE_GROUP;

// -----------------------------
function ManageGroupPage() {
  const { groupId } = useParams();
  const { pathname } = useLocation();
  const { isValidating, data, error } = useFetch(
    `${ENDPOINTS.GROUP}/${groupId}/role`
  );

  if (isValidating) return null;

  if (error || !data?.role) return <Navigate to={PATH.NOTFOUND} />;

  const { role } = data;
  const genTabVal = (path = '') => path.replace(':groupId', groupId);

  const MENU = [
    { label: 'Chung', value: genTabVal(ROOT_PATH.GENERAL) },
    { label: 'Bảng tin', value: genTabVal(ROOT_PATH.NEWS) },
    { label: 'Thành viên', value: genTabVal(ROOT_PATH.MEMBERS) },
    { label: 'Bài tập', value: genTabVal(ROOT_PATH.PRACTICES) },
    {
      label: role === GROUP_ROLES.OWNER ? 'Xoá nhóm' : 'Rời nhóm',
      value:
        role === GROUP_ROLES.OWNER
          ? genTabVal(ROOT_PATH.DELETE)
          : genTabVal(ROOT_PATH.LEAVE)
    }
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
