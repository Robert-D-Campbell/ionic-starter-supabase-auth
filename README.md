# Next.js 14 + TypeScript + Tailwind CSS + Ionic Framework + Capacitor Starter

This project is a state-of-the-art starter template designed for building scalable, cross-platform applications with Next.js 14, TypeScript, Tailwind CSS, Ionic Framework, and Capacitor. It enables developers to efficiently create apps that run on iOS, Android, and the web with a single codebase.

## Inspiration

This project was inspired by [Max Lynch's Next.js + Tailwind CSS + Ionic Framework + Capacitor Mobile Starter](https://github.com/mlynch/nextjs-tailwind-ionic-capacitor-starter). The original project provided a conceptual starting point for integrating these technologies into a cohesive development stack for building mobile and web applications. We have adapted and expanded upon this foundation to leverage the latest features of Next.js 14 and TypeScript, along with incorporating best practices and additional configurations to enhance the developer experience and application performance.

## Features

- **Next.js 14**: Leverages the latest Next.js features for optimized React applications.
- **TypeScript**: Integrates TypeScript for type safety and improved developer experience.
- **Tailwind CSS**: Uses Tailwind CSS for rapid UI development with utility-first styling.
- **Ionic Framework**: Employs Ionic Framework for high-quality, cross-platform UI components.
- **Capacitor**: Utilizes Capacitor to bridge web apps with native mobile functionality, providing full access to native SDKs on iOS and Android.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Android Studio or Xcode (for mobile app development)

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/UretzkyZvi/nextjs-typescript-tailwind-ionic-starter.git <project-directory>
   ```

2. **Install dependencies**:

   ```bash
   cd <project-directory>
   npm install
   ```

3. **Add platforms**:
   To add iOS and Android platforms to your project:

   ```bash
   npx cap add ios
   npx cap add android
   ```

   This step requires Xcode for iOS and Android Studio for Android development.

4. **Install Android Studio** (for Android development):
   To run and test your app on an Android emulator, [download and install Android Studio](https://developer.android.com/studio). During installation, ensure you include the Android SDK and configure it as per the installation instructions.

5. **Install Xcode** (for iOS development on Mac):
   To run and test your app on an iOS simulator, download and install Xcode from the Mac App Store. After installation, open Xcode to install additional required components when prompted. Xcode includes the iOS Simulator where you can run your iOS apps.

6. **Update .env**
   Example:
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

### Development

Start the development server with:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to see the app.

## Capacitor Configuration

The project integrates Capacitor for running on iOS and Android, configured in `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "nextjs-typescript-tailwind-ionic-starter",
  cordova: {},
  loggingBehavior: "debug",
  webDir: "out",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
  },
  server: {
    androidScheme: "https",
    hostname: "localhost:3000",
  },
  android: {
    loggingBehavior: "debug",
    webContentsDebuggingEnabled: true,
  },
};

export default config;
```

### Building and Running on Devices

To compile the application and prepare it for iOS and Android:

```bash
npm run build
npx cap sync
npx cap open ios
npx cap open android
```

If you have permission issues

```bash
sudo chmod 777 -R /dev/kvm
```

### Live Reload

For live reload on devices, ensure your development server is accessible as configured in `capacitor.config.ts`. Adjust the `hostname` to match your development environment if necessary.

## Project Structure

- `Card.tsx`, `Notifications.tsx`, `Settings.tsx`, `Tabs.tsx`: Showcase Ionic components.
- `AppShell.tsx`: Manages app layout and navigation.
- `[page].tsx`: Implements dynamic routing with Next.js.
- `capacitor.config.ts`: Contains Capacitor configuration for native platforms.
- `next.config.mjs`: Configures Next.js, including TypeScript and Tailwind CSS integration.

## Caveats

- The project setup excludes Server Side Rendering (SSR) to comply with Capacitor's requirements for mobile platforms.
- Adapted Next.js routing to accommodate Ionic's navigation system for a native app experience.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Ionic Framework Docs](https://ionicframework.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## Contributing

Contributions are welcome. Please review our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Initial Databse Schema

```
CREATE TYPE recipient_type_enum AS ENUM('profiles', 'clans', 'squads');

CREATE TYPE post_target_type_enum AS ENUM('profiles', 'clans', 'communities');

CREATE TABLE
  profiles (
    id uuid PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    display_name VARCHAR(100) NOT NULL unique,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

CREATE TABLE
  profile_friends (
    profile_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    friend_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, friend_id)
  );

CREATE TABLE
  games (
    id uuid PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    community_id uuid
  );

CREATE TABLE
  communities (
    id uuid PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

ALTER TABLE games
ADD CONSTRAINT games_community_id_fk FOREIGN KEY (community_id) REFERENCES communities (id) ON DELETE SET NULL;

CREATE TABLE
  clans (
    id uuid PRIMARY KEY,
    game_id uuid NOT NULL REFERENCES games (id) ON DELETE CASCADE,
    community_id uuid REFERENCES communities (id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

CREATE TABLE
  clan_members (
    clan_id uuid NOT NULL REFERENCES clans (id) ON DELETE CASCADE,
    profile_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE
  );

CREATE TABLE
  squads (
    id uuid PRIMARY KEY,
    game_id uuid NOT NULL REFERENCES games (id) ON DELETE CASCADE,
    clan_id uuid REFERENCES clans (id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

CREATE TABLE
  squad_members (
    squad_id uuid NOT NULL REFERENCES squads (id) ON DELETE CASCADE,
    profile_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE
  );

CREATE TABLE
  profile_games (
    profile_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    game_id uuid NOT NULL REFERENCES games (id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, game_id)
  );

CREATE TABLE
  posts (
    id uuid PRIMARY KEY,
    author_profile_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

CREATE TABLE
  post_targets (
    post_id uuid NOT NULL REFERENCES posts (id) ON DELETE CASCADE,
    target_type post_target_type_enum NOT NULL,
    target_id uuid NOT NULL,
    PRIMARY KEY (post_id, target_type, target_id)
  );

CREATE TABLE
  messages (
    id uuid PRIMARY KEY,
    sender_profile_id uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
    recipient_type recipient_type_enum NOT NULL,
    recipient_id uuid NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

CREATE
OR REPLACE FUNCTION update_timestamp () RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profile_update_timestamp BEFORE
UPDATE ON profiles FOR EACH ROW
EXECUTE PROCEDURE update_timestamp ();

CREATE
OR REPLACE FUNCTION add_friend (p_profile_id UUID, p_friend_id UUID) RETURNS VOID AS $$
BEGIN
    INSERT INTO profile_friends (profile_id, friend_id)
    VALUES (p_profile_id, p_friend_id)
    ON CONFLICT DO NOTHING;

    INSERT INTO profile_friends (profile_id, friend_id)
    VALUES (p_friend_id, p_profile_id)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

CREATE
OR REPLACE FUNCTION remove_friend () RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM profile_friends WHERE profile_id = OLD.friend_id AND friend_id = OLD.profile_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER remove_friend_symmetry
AFTER DELETE ON profile_friends FOR EACH ROW
EXECUTE PROCEDURE remove_friend ();

create function public.handle_new_user () returns trigger language plpgsql security definer
set
  search_path = '' as $$
begin
  insert into profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();

CREATE INDEX idx_profiles_display_name ON profiles (display_name);

CREATE INDEX idx_posts_author ON posts (author_profile_id);

CREATE INDEX idx_posts_created_at ON posts (created_at);

CREATE INDEX idx_messages_recipient ON messages (recipient_type, recipient_id);

CREATE INDEX idx_post_targets_by_target ON post_targets (target_type, target_id);

CREATE INDEX idx_clan_members_clan ON clan_members (clan_id);

CREATE INDEX idx_squad_members_squad ON squad_members (squad_id);

```
