import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    let userDoc = await getDoc(userRef);

    // 🆕 Create user doc if missing
    if (!userDoc.exists()) {
      await setDoc(userRef, {
        name: user.email.split("@")[0],  // fallback name
        email: user.email,
        role: "Donor"
      });
      userDoc = await getDoc(userRef); // get the newly created doc
    }

    // ✅ Display data
    const data = userDoc.data();
    document.getElementById("email").value = data.email || user.email;
    document.getElementById("role").value = data.role || "Donor";

    // Save button
    document.getElementById("saveChanges").addEventListener("click", async () => {
      const newRole = document.getElementById("role").value;
      await updateDoc(userRef, { role: newRole });
      alert("Profile updated ✅");
    });

    // Update password
    document.getElementById("updatePassword").addEventListener("click", async () => {
      const newPassword = document.getElementById("newPassword").value;
      try {
        await user.updatePassword(newPassword);
        alert("Password updated ✅");
      } catch (error) {
        alert("Failed to update password: " + error.message);
      }
    });

  } else {
    // Not logged in
    window.location.href = "login.html";
  }
});

