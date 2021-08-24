import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { CONSTANTS } from "../../app/constants";
import { NoteDetails } from "../../pages/NoteDetails";
import { Notes } from "../../pages/Notes";
import { Container } from ".././Container";
import { Header } from "../Header";

export const MainRoutes = () => {
  return (
    <>
      <Header />
      <Container style={{ marginTop: 20 }}>
        <Switch>
          <Route
            exact
            path={`${CONSTANTS.ROUTES.NOTES_PAGE}/:noteId`}
            component={NoteDetails}
          />
          <Route exact path={CONSTANTS.ROUTES.NOTES_PAGE} component={Notes} />
          <Redirect to={CONSTANTS.ROUTES.NOTES_PAGE} />
        </Switch>
      </Container>
    </>
  );
};
