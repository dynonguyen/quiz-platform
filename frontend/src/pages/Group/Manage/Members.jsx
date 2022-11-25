import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import { Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import groupApi from '~/apis/groupApi';
// -----------------------------

function Item({ user }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="DropDown">
          <ArrowDropDownCircleOutlinedIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar alt={user.name} src={user.avt} />
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary={null} />
    </ListItem>
  );
}

function GroupMembersPage() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { data, error } = groupApi.getGroup(groupId);
  if (error) return navigate('/404');
  // -----------------------------
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {data ? (
        <Grid container>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
              Giáo viên
            </Typography>
            <List>
              <Item user={data.owner} />
              {data.coOwners
                ? data.coOwners.map((user) => {
                    return <Item user={user} key={user.accountId} />;
                  })
                : null}
            </List>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h2" component="div">
              Bạn học
            </Typography>
            <List>
              {data.members
                ? data.members.map((user) => {
                    return <Item user={user} key={user.accountId} />;
                  })
                : null}
            </List>
          </Grid>
        </Grid>
      ) : null}
    </Container>
  );
}

export default GroupMembersPage;
