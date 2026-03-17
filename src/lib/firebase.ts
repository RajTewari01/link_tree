import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, orderBy, query } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if config is present to prevent crashes during dev without keys
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export interface TreeLink {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  iconUrl?: string;
  order: number;
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Simple whitelisting check
    if (user.email === "tewari765@gmail.com") {
      return { success: true, user };
    } else {
      await auth.signOut();
      alert("Unauthorized access. Admin only.");
      return { success: false, error: "Unauthorized access" };
    }
  } catch (error) {
    console.error("Auth error:", error);
    return { success: false, error };
  }
}

export async function addTreeLink(linkData: Omit<TreeLink, 'id'>) {
  try {
    const linksRef = collection(db, "links");
    await addDoc(linksRef, linkData);
    return true;
  } catch (error) {
    console.error("Error adding link: ", error);
    return false;
  }
}

export async function getLinks(): Promise<TreeLink[]> {
  try {
    const linksRef = collection(db, "links");
    const q = query(linksRef, orderBy("order", "asc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as TreeLink[];
  } catch (error) {
    console.error("Error fetching links: ", error);
    
    return [];
  }
}
