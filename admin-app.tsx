// admin/src/App.tsx
import React, { useCallback } from "react";
import {
  AppBar,
  CircularProgressCenter,
  CMSView,
  Drawer,
  FireCMS,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
  SnackbarProvider,
  useBuildLocalConfigurationPersistence,
  useBuildModeController,
  useBuildNavigationController,
  useValidateAuthenticator
} from "@firecms/core";
import {
  FirebaseAuthController,
  FirebaseLoginView,
  FirebaseSignInProvider,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDelegate,
  useInitialiseFirebase
} from "@firecms/firebase";
import { firebaseConfig } from "./firebase_config";
import { blogCollection } from "./collections/blog";
import { serviciosCollection } from "./collections/servicios";

export function App() {
  const title = "Quilla Electric Admin";

  const {
    firebaseApp,
    firebaseConfigLoading,
    configError
  } = useInitialiseFirebase({
    firebaseConfig
  });

  const collectionsBuilder = useCallback(() => {
    return [
      blogCollection,
      serviciosCollection
    ];
  }, []);

  const signInOptions: FirebaseSignInProvider[] = [
    "google.com",
    "password"
  ];

  const modeController = useBuildModeController();
  const firestoreDelegate = useFirestoreDelegate({ firebaseApp });
  const storageSource = useFirebaseStorageSource({ firebaseApp });
  
  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  const userConfigPersistence = useBuildLocalConfigurationPersistence();

  const {
    authLoading,
    canAccessMainView,
    notAllowedError
  } = useValidateAuthenticator({
    authController,
    dataSourceDelegate: firestoreDelegate,
    storageSource
  });

  const navigationController = useBuildNavigationController({
    collections: collectionsBuilder,
    authController,
    dataSourceDelegate: firestoreDelegate
  });

  if (firebaseConfigLoading || !firebaseApp) {
    return <CircularProgressCenter />;
  }

  if (configError) {
    return <>{configError}</>;
  }

  return (
    <SnackbarProvider>
      <ModeControllerProvider value={modeController}>
        <FireCMS
          apiKey={process.env.NEXT_PUBLIC_FIRECMS_API_KEY}
          navigationController={navigationController}
          authController={authController}
          userConfigPersistence={userConfigPersistence}
          dataSourceDelegate={firestoreDelegate}
          storageSource={storageSource}
        >
          {({ context, loading }) => {
            if (loading || authLoading) {
              return <CircularProgressCenter size="large" />;
            }

            if (!canAccessMainView) {
              return (
                <FirebaseLoginView
                  allowSkipLogin={false}
                  signInOptions={signInOptions}
                  firebaseApp={firebaseApp}
                  authController={authController}
                  notAllowedError={notAllowedError}
                />
              );
            }

            return (
              <Scaffold autoOpenDrawer={false}>
                <AppBar title={title} />
                <Drawer />
                <NavigationRoutes />
                <SideDialogs />
              </Scaffold>
            );
          }}
        </FireCMS>
      </ModeControllerProvider>
    </SnackbarProvider>
  );
}