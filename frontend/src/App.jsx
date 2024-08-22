import { ProSidebarProvider } from "react-pro-sidebar";
import React from "react";
import Routes from "./Routes";
import { Helmet } from "react-helmet";
function App() {
  const defaultTitle =
    process.env.REACT_APP_DEFAULT_TITLE ||
    "Email Warm-Up | 100% Inbox Guaranteed";
  const defaultDescription =
    process.env.REACT_APP_DEFAULT_DESCRIPTION ||
    "automated email warm-up is free email warm-up tool that warm-up your email domain so you land in inbox over spam.";

  return (
    <div>
      <Helmet>
        <title>{defaultTitle}</title>
        <meta name="description" content={defaultDescription} />
      </Helmet>
      <ProSidebarProvider>
        <Routes />
      </ProSidebarProvider>
    </div>
  );
}

export default App;
