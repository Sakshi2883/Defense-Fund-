import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      document.getElementById("username").textContent = docSnap.data().name;
      document.getElementById("useremail").textContent = docSnap.data().email;
    } else {
      console.log("No such user document!");
    }
  } else {
    window.location.href = "login.html"; // Not logged in, redirect
  }
});
