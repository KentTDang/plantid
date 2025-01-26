import { getStorage } from "firebase/storage";

// Get the default bucket from a custom firebase.app.App
const storage1 = getStorage(customApp);

// Get a non-default bucket from a custom firebase.app.App
const storage2 = getStorage(customApp, "gs://my-custom-bucket");