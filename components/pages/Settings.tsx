import { IonPage, IonHeader, IonItem, IonToolbar, IonTitle, IonContent, IonList, IonToggle, IonLabel, useIonRouter } from "@ionic/react";
import useAppStore from "@/lib/hooks/useStore";
import { supabase } from "@/lib/supabase/client";

const Settings = () => {
  const { settings, setSettings } = useAppStore();
  const router = useIonRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={(e) => {
                setSettings({
                  ...settings,
                  enableNotifications: e.target.checked,
                });
              }}
            />
          </IonItem>
          <IonItem button onClick={handleLogout}>
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
