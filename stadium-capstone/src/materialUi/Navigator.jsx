import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StadiumIcon from '@mui/icons-material/Stadium';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReplyIcon from '@mui/icons-material/Reply';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArticleIcon from '@mui/icons-material/Article';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import FeedIcon from '@mui/icons-material/Feed';
import { Link, useLocation } from "react-router-dom";

const categories = [
  {
    id: "Explore",
    children: [
      {
        id: "My Stats",
        icon: <DashboardIcon />,
        link: "/users/me",
      },
      {
        id: "Ballparks",
        icon: <StadiumIcon />,
        link: "/users/me/ballpark",
      },
      { 
        id: "Reviews", 
        icon: <RateReviewIcon />, 
        link: "/users/me/reviews" 
      },
      {
        id: "Replies",
        icon: <ReplyIcon />,
        link: "/users/me/replies",
      },
    ],
  },
  {
    id: "Social",
    children: [
      {
        id: "Feed",
        icon: <FeedIcon />,
        // link: "/users/me/feed",
      },
      { 
        id: "Followers", 
        icon: <PeopleIcon />,
        // link: "/users/me/followers"
      },
      { 
        id: "Following", 
        icon: <PersonAddIcon />,
        // link: "/users/me/following"
      },
      {
        id: "Posts",
        icon: <ArticleIcon />,
        // link: "/users/me/posts"
      },
    ],
  },
  {
    id: "Preferences",
    children: [
      { 
        id: "Account Details", 
        icon: <ManageAccountsIcon />, 
        link: "/users/me/account-details" 
      },
      { 
        id: "Login", 
        icon: <LoginIcon />, 
        // link: "/login" 
      }
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { ...other } = props;
  const location = useLocation();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }} as={Link} to="/"
        >
          Ballpark Ballers
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }} as={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, link }) => (
              <ListItem disablePadding key={childId} as={Link} to={link}>
                <ListItemButton
                  selected={location.pathname.includes(link)}
                  sx={item}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
