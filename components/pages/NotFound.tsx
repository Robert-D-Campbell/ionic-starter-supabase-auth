import { IonContent, IonPage, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" text="Home" />
        </IonButtons>
      </IonToolbar>
      <IonContent className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Error</h1>
          <p className="text-xl">Invalid component</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
