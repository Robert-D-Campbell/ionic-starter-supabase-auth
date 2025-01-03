import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { notificationsOutline, logOut } from "ionicons/icons";
import Notifications from "./Notifications";
import useAppStore from "@/lib/hooks/useStore";
import Card from "./Card";

interface FeedCardProps {
  title: string;
  type: string;
  text: string;
  author: string;
  authorAvatar: string;
  image: string;
}

const FeedCard: FC<FeedCardProps> = ({
  title,
  type,
  text,
  author,
  authorAvatar,
  image,
}) => (
  <Card className="my-4 mx-auto">
    <div className="h-32 w-full relative">
      <Image
        className="rounded-t-xl object-cover min-w-full min-h-full max-w-full max-h-full"
        src={image}
        alt=""
      />
    </div>
    <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
      <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">
        {type}
      </h4>
      <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">
        {text}
      </p>
      <div className="flex items-center space-x-4">
        <Image
          src={authorAvatar}
          className="rounded-full object-cover min-w-full min-h-full max-w-full max-h-full"
          alt=""
          layout="fill"
        />
      </div>
      <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">
        {author}
      </h3>
    </div>
  </Card>
);

const Home = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { homeItems } = useAppStore();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log({ error });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Feed</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
            <IonButton onClick={() => signOut()}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications
          open={showNotifications}
          onDidDismiss={() => setShowNotifications(false)}
        />
        {homeItems.map((i, index) => (
          <FeedCard {...i} key={index} />
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
