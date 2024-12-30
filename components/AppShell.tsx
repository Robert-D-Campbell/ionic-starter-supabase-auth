import { useEffect, useState } from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";
import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

import Login from "@/components/pages/SignIn";
import Signup from "@/components/pages/SignUp";
import Home from "@/components/pages/Home";
import Settings from "@/components/pages/Settings";
import NotFound from "@/components/pages/NotFound";

import "@ionic/react/css/ionic.bundle.css";

setupIonicReact({});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch {}
});

const AppShell = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    console.log("AppShell useEffect");
    const fetchSession = async () => {
      const _session = await supabase.auth.getSession();
      setSession(_session.data.session);
    };

    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      // Automatically update session on changes (login/logout)
      setSession(session);
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route exact path="/register" component={Signup} />
          <Route exact path="/" component={session ? Home : Login} />
          <Route exact path="/settings" component={Settings} />
          <Route component={NotFound} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
