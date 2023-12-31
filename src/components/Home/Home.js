import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { getPosts ,getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import Pagination from "../Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  const handleAddChip = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDeleteChip = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };


  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAddChip}
                onDelete={handleDeleteChip}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            { (!searchQuery && !tags.length) &&  
            <Paper elevation={6} className={classes.pagination}>
              <Pagination page={page} />
            </Paper>}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
