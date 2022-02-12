import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedications } from "../../../redux/features/medications";
import Sidebar from "./sidebar";
import Medications from "./medications/Medications";
import { CircularProgress, Grid } from "@mui/material";
import { GridSidebar, LoadingWrapper } from "./styles";
import Navbar from "./navbar";

const Main = () => {
  const loading = useSelector((state) => state?.medications.loading);

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMedications());
  }, [dispatch]);

  const handleChangeFilter = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  return (
    <>
      <Grid container style={{ minHeight: "calc(100vh - 92px)" }}>
        <GridSidebar container item xs={2}>
          <Sidebar />
        </GridSidebar>

        <Grid item xs={10} style={{ padding: 40 }}>
          <Navbar onChangeFilter={handleChangeFilter} />

          <Grid container spacing={3}>
            <Medications search={search} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
