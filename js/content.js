
// Editable site content (Info + Rules sections), stored in Firestore "site_content/main"

function loadContent(fieldId, containerEl) {
  db.collection("site_content").doc("main").onSnapshot(doc => {
    const data = doc.exists ? doc.data() : {};
    const text = data[fieldId] || "Content coming soon!";
    containerEl.innerText = text;
  });
}

function saveContent(fieldId, newText) {
  const user = getCurrentUser();
  if (!user.isAdmin) {
    alert("Only admins can edit this.");
    return;
  }
  db.collection("site_content").doc("main").set({
    [fieldId]: newText
  }, { merge: true });
}
