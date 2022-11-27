import { Box, Grid } from '@cads-ui/core';
import CardGroupItem from '~/components/CardGroupItem';
import ComponentLoading from '~/components/ComponentLoading';
import ENDPOINTS from '~/constant/endpoints';
import useFetch from '~/hooks/useFetch';

function GroupListPage() {
  const { isValidating, data, error } = useFetch(
    `${ENDPOINTS.GROUP}/my-groups`
  );

  if (isValidating) return <ComponentLoading />;
  console.log(data);

  return error || !data?.groups || !data.groups.length ? (
    <Box>Bạn chưa tạo nhóm nào!</Box>
  ) : (
    <Grid rowSpacing={4} columnSpacing={8} container>
      {data.groups.map((group) => (
        <Grid key={group._id} item lg={4} sm={6}>
          <CardGroupItem group={group} />
        </Grid>
      ))}
    </Grid>
  );
}

export default GroupListPage;
