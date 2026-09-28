
// Q&A wall: anyone can post a question, admins can post answers.
// Stored in Firestore collection "questions"

function postQuestion(text) {
  const user = getCurrentUser();
  if (!user.username) {
    alert("Please enter a username first.");
    return;
  }
  const clean = text.trim();
  if (!clean) return;

  db.collection("questions").add({
    username: user.username,
    question: clean,
    answer: null,
    answeredBy: null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function postAnswer(questionId, answerText) {
  const user = getCurrentUser();
  if (!user.isAdmin) {
    alert("Only admins can answer.");
    return;
  }
  const clean = answerText.trim();
  if (!clean) return;

  db.collection("questions").doc(questionId).update({
    answer: clean,
    answeredBy: "Admin",
    answeredAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function deleteQuestion(questionId) {
  const user = getCurrentUser();
  if (!user.isAdmin) return;
  db.collection("questions").doc(questionId).delete();
}

function renderQuestions(containerEl, isAdminView) {
  db.collection("questions").orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      containerEl.innerHTML = "";
      snapshot.forEach(doc => {
        const q = doc.data();
        const card = document.createElement("div");
        card.className = "qa-card";

        let html = `<p class="qa-question"><strong>${escapeHtml(q.username)}:</strong> ${escapeHtml(q.question)}</p>`;

        if (q.answer) {
          html += `<p class="qa-answer"><strong>Admin:</strong> ${escapeHtml(q.answer)}</p>`;
        } else if (isAdminView) {
          html += `
            <div class="qa-answer-form">
              <input type="text" placeholder="Type answer..." class="answer-input" />
              <button class="answer-btn">Reply</button>
            </div>`;
        } else {
          html += `<p class="qa-pending">Waiting for an answer...</p>`;
        }

        card.innerHTML = html;

        if (isAdminView) {
          const delBtn = document.createElement("button");
          delBtn.textContent = "Delete";
          delBtn.className = "delete-btn";
          delBtn.onclick = () => deleteQuestion(doc.id);
          card.appendChild(delBtn);

          if (!q.answer) {
            const btn = card.querySelector(".answer-btn");
            const input = card.querySelector(".answer-input");
            btn.onclick = () => postAnswer(doc.id, input.value);
          }
        }

        containerEl.appendChild(card);
      });
    });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
