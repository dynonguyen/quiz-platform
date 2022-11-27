import { Box, Button, Grid } from '@cads-ui/core';
import { Link } from 'react-router-dom';
import { useLeftMenuStyles } from '~/common/styles';
import CardGroupItem from '~/components/CardGroupItem';
import ComponentLoading from '~/components/ComponentLoading';
import Nodata from '~/components/Nodata';
import ENDPOINTS from '~/constant/endpoints';
import { PATH } from '~/constant/path';
import useFetch from '~/hooks/useFetch';

function GroupListPage() {
  const classes = useLeftMenuStyles();

  const { isValidating, data, error } = useFetch(
    `${ENDPOINTS.GROUP}/my-groups`
  );

  if (isValidating) return <ComponentLoading />;

  return error || !data?.groups || !data.groups.length ? (
    <Box className={classes.box}>
      <Nodata
        pageResultProps={{
          subTitle: 'Bạn chưa tạo lớp nào!',
          action: (
            <Link to={PATH.GROUP.NEW}>
              <Button variant="text">Tạo nhóm ngay</Button>
            </Link>
          )
        }}
      />
    </Box>
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
