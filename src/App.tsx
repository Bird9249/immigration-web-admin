import { Router } from "@solidjs/router";
import "flowbite";
import { type Component } from "solid-js";
import { ConfirmProvider } from "./contexts/confirm/ConfirmContext";
import { MessageProvider } from "./contexts/message/MessageContext";
import routes from "./router";

const App: Component = () => {
  return (
    <MessageProvider>
      <ConfirmProvider>
        <Router>{routes}</Router>
      </ConfirmProvider>
    </MessageProvider>
  );
};

export default App;
