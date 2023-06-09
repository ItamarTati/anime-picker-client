import React, { useState, useEffect, SetStateAction } from "react";
import Cover from "../cover/Cover";
import Loading from "../../common/loading/Loading";
import classes from "./Shows.module.css";
import Header from "../../components/header/Header";
import { Pagination } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";
import _without from "lodash/without";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import NotFound from "../../common/videos/page-not-found .gif";
import { Link } from "react-router-dom";

interface AnimesInformation {
  animes: Array<Show>;
  numberOfPages: number;
  listOfGenres: Array<string>;
  searchTerm: string;
  listOfAnimeIds: Array<string>;
}

export interface Show {
  _id: string;
  title: string;
  author: string;
  description: string;
  genres: Array<string>;
  frontCoverImage: string;
  backCoverImage: string;
  backgroundImage: string;
  trailer: string;
  animeReleaseDate: Date;
  numberOfEpisodes: number;
  isDubbed: boolean;
  mangaChapters: number;
  hasEnded: boolean;
}

const Shows: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnimesInformation>();
  const [open, setOpen] = React.useState(false);
  const [genres, setGenres] = React.useState<Array<string>>([]);
  const [userSelctedGenres, setUserSelctedGenres] = React.useState<
    Array<string>
  >([]);
  const [searchValue, setSearchValue] = useState("");
  const [limit, setLimit] = useState<number>(4);
  const [sortField, setSortField] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function fetchData(
    userSelctedGenres: Array<string> = [],
    searchValue: string = "",
    limit: number = 4,
    sortField: string = "title",
    sortOrder: string = "asc",
    page: number = 1
  ) {
    const pageParam = `?page=${page}`;
    const genresParam = `&genres=${userSelctedGenres.join(",")}`;
    const searchParam = `&search=${searchValue}`;
    const limitParam = `&limit=${limit}`;
    const sortParam = `&sort=${sortField}:${sortOrder}`;
    fetch(
      `https://tame-puce-sawfish-coat.cyclic.app//api/shows${pageParam}${genresParam}${searchParam}${limitParam}${sortParam}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setGenres(data.listOfGenres);
        setLoading(false);
        if (page === 1) setCurrentPage(1);
      })
      .catch((error) => console.error(error));
  }

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setLoading(true);
    setCurrentPage(page);
    fetchData(
      userSelctedGenres,
      searchValue,
      limit,
      sortField,
      sortOrder,
      page
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleGenresChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUserSelctedGenres(event.target.value as string[]);
  };

  const handleGenresDelete = (e: React.MouseEvent, value: string) => {
    e.preventDefault();
    setUserSelctedGenres((current) => _without(current, value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
  };

  const handleSortFieldChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSortField(event.target.value as SetStateAction<string>);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSortOrder(event.target.value as SetStateAction<string>);
  };

  const excuteSearchOnClick = (
    userSelctedGenres: Array<string>,
    searchValue: string,
    limit: number,
    sortField: string,
    sortOrder: string
  ) => {
    fetchData(userSelctedGenres, searchValue, limit, sortField, sortOrder);

    handleClose();
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Header />
          <div id="animes" className={classes.Shows}>
            <div>
              <h1>Animes & Manga (アニメやマンガ)</h1>
              {searchValue ? (
                <Typography variant="h6" component="h2">
                  For Search Term: '{searchValue}'
                </Typography>
              ) : (
                ""
              )}
            </div>
            {data?.animes.length === 0 ? (
              <div className={classes.NotFound}>
                <Typography variant="h6" component="h2">
                  We're sorry, but we couldn't find any anime matching your
                  search term "<span>{data.searchTerm}</span>". If the anime
                  you're looking for isn't in our database, please let us know
                  and we will notify the developer to consider adding it. In the
                  meantime, Check out our other animes. By selecting Advance
                  Setting Below.
                </Typography>
                <img src={NotFound} alt="anime was not found" />
              </div>
            ) : (
              data?.animes.map((show) => {
                return (
                  <Cover
                    key={show._id}
                    frontCoverImage={show.frontCoverImage}
                    title={show.title}
                    _id={show._id}
                  />
                );
              })
            )}
          </div>
        </div>
      )}

      <div className={classes.Pagination}>
        <Pagination
          count={data?.numberOfPages}
          showFirstButton
          showLastButton
          size="large"
          variant="outlined"
          color="secondary"
          disabled={!data?.animes.length ? true : false}
          onChange={handlePageChange}
          page={currentPage}
        />
      </div>
      <div className={classes.Search}>
        {loading ? (
          ""
        ) : (
          <>
            <button className={classes.Setting} onClick={handleOpen}>
              Advance Search Settings
            </button>
            {data?.listOfAnimeIds && data?.listOfAnimeIds.length > 1 ? (
              <Link
                to={`/anime/${
                  data?.listOfAnimeIds[
                    Math.floor(Math.random() * data?.listOfAnimeIds.length)
                  ]
                }`}
              >
                <button className={classes.Random}>
                  Select Random Anime Adventure
                </button>
              </Link>
            ) : (
              ""
            )}
          </>
        )}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className={classes.Modal}>
          <div>
            <Typography variant="h6" component="h2">
              Advance Search Settings
            </Typography>

            <TextField
              inputProps={{
                style: {
                  padding: 20,
                },
              }}
              label="Search by Anime"
              variant="outlined"
              sx={{ mt: 2 }}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <Typography sx={{ mt: 2 }}>
              Refine your search by filtering genres. Add one or more genres to
              find anime that match your preferences.
            </Typography>
            <Select
              SelectDisplayProps={{ style: { whiteSpace: "unset" } }}
              multiple
              value={userSelctedGenres}
              onChange={handleGenresChange}
              IconComponent={KeyboardArrowDownIcon}
              renderValue={(selected) => (
                <div>
                  {(selected as string[]).map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      clickable
                      deleteIcon={
                        <CancelIcon
                          onMouseDown={(event) => event.stopPropagation()}
                        />
                      }
                      className={classes.chip}
                      onDelete={(e) => handleGenresDelete(e, value)}
                    />
                  ))}
                </div>
              )}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  <Checkbox checked={userSelctedGenres.includes(genre)} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </div>

          <div>
            <Typography sx={{ mt: 2 }}>Anime per page?</Typography>
            <TextField
              id="outlined-number"
              type="number"
              defaultValue="4"
              InputProps={{
                inputProps: { min: 1 },
                style: {
                  width: "50px",
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleLimitChange}
            />
          </div>

          <div>
            <Typography sx={{ mt: 2 }}>
              Looking for a specific? Try sorting our collection by title,
              number of episodes, number of manga chapters, or the day it was
              released!
            </Typography>
            <div>
              <Select
                value={sortField}
                label="Rankers"
                onChange={handleSortFieldChange}
              >
                <MenuItem value={"title"}>Title</MenuItem>
                <MenuItem value={"numberOfEpisodes"}>
                  Number of Episodes
                </MenuItem>
                <MenuItem value={"mangaChapters"}>
                  Number of Manga Chapters
                </MenuItem>
                <MenuItem value={"animeReleaseDate"}>
                  Day the Anime Released
                </MenuItem>
              </Select>

              <Select
                value={sortOrder}
                label="Order"
                onChange={handleSortOrderChange}
              >
                <MenuItem value={"asc"}>Ascending</MenuItem>
                <MenuItem value={"desc"}>Decreasing</MenuItem>
              </Select>
            </div>
          </div>

          <div>
            <button
              className={classes.Submit}
              onClick={() =>
                excuteSearchOnClick(
                  userSelctedGenres,
                  searchValue,
                  limit,
                  sortField,
                  sortOrder
                )
              }
            >
              Search
            </button>
            <button className={classes.Cancel} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Shows;
