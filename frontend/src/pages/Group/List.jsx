import { Grid, Typography } from '@cads-ui/core';
import CardGroupItem from '~/components/CardGroupItem';
import ComponentLoading from '~/components/ComponentLoading';
import ENDPOINTS from '~/constant/endpoints';
import useFetch from '~/hooks/useFetch';

function GroupListPage() {
  const { isValidating, data, error } = useFetch(
    `${ENDPOINTS.GROUP}/my-groups`
  );

  if (isValidating) return <ComponentLoading />;

  return error || !data?.groups || !data.groups.length ? (
    <Typography>Bạn chưa tạo nhóm nào!</Typography>
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
