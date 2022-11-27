import { Flex, Grid, Typography } from '@cads-ui/core';
import { useLeftMenuStyles } from '~/common/styles';
import CardGroupItem from '~/components/CardGroupItem';
import ComponentLoading from '~/components/ComponentLoading';
import JoinGroup from '~/components/JoinGroup';
import ENDPOINTS from '~/constant/endpoints';
import useFetch from '~/hooks/useFetch';

function JoinedGroupPage() {
  const classes = useLeftMenuStyles();
  const { isValidating, data, error } = useFetch(
    `${ENDPOINTS.GROUP}/joined-groups`
  );

  if (isValidating) return <ComponentLoading />;

  return error || !data?.groups || !data.groups.length ? (
    <Flex
      sx={{ h: 1 }}
      className={classes.box}
      direction="column"
      spacing={4}
      center
    >
      <Typography color="text.secondary">Bạn chưa tham gia lớp nào!</Typography>
      <JoinGroup />
    </Flex>
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

export default JoinedGroupPage;
