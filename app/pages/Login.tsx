import { useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonLoading,
} from "@ionic/react";
import { supabase } from "../lib/supabase/client";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLoading, hideLoading] = useIonLoading();
  const [showToast] = useIonToast();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await showLoading();
    try {
      await supabase.auth.signInWithPassword({ email, password });
      await showToast({ message: "Successfully logged in", duration: 5000 });
    } catch (e: any) {
      await showToast({ message: e.error_description || e.message, duration: 5000 });
    } finally {
      await hideLoading();
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ion-padding">
          <h1>Supabase + Ionic React</h1>
        </div>
        <IonList inset={true}>
          <form onSubmit={handleLogin}>
            <IonItem>
              <IonLabel id="lbl-email" position="stacked">
                Email
              </IonLabel>
              <IonInput value={email} name="email" onIonChange={(e) => setEmail(e.detail.value ?? "")} type="email" aria-labelledby="lbl-email"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel id="lbl-password" position="stacked">
                Password
              </IonLabel>
              <IonInput
                value={password}
                name="password"
                onIonChange={(e) => setPassword(e.detail.value ?? "")}
                type="password"
                aria-labelledby="lbl-password"
              ></IonInput>
            </IonItem>
            <div className="ion-text-center">
              <IonButton type="submit" fill="clear">
                Login
              </IonButton>
            </div>
          </form>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
