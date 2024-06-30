import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { supabase } from "./lib/supabase/client";
import Tabs from "./components/Tabs";

import "@ionic/react/css/ionic.bundle.css";

/* Theme variables */
// import "./theme/variables.css";
import { LoginPage } from "./pages/Login";
// import { AccountPage } from "./pages/Account";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

setupIonicReact({});

const AppShell = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const _session = await supabase.auth.getSession();
      setSession(_session.data.session);
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/tabs" render={() => <Tabs />} />
          <Route path="/" render={() => (session ? <Redirect to="/tabs/feed" /> : <LoginPage />)} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
