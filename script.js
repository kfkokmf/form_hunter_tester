// Importar SDKs necessários
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDXPsaw0p0XO8XZe3rrWSDzjEjOYsKGA10",
  authDomain: "modern-js-aadac.firebaseapp.com",
  projectId: "modern-js-aadac",
  storageBucket: "modern-js-aadac.firebasestorage.app",
  messagingSenderId: "334129239686",
  appId: "1:334129239686:web:7cae7e639833fdbd29a307",
  measurementId: "G-9HEKQNFT37"
};

// Inicializar Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submeter o formulário
document.getElementById("newsletter-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem");

  try {
    // Verificar se o email já existe
    const q = query(collection(db, "emails"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      mensagem.textContent = "Este e-mail já está registado.";
    } else {
      await addDoc(collection(db, "emails"), { email });
      mensagem.textContent = "Obrigado por te registares!";
    }
  } catch (err) {
    console.error("Erro ao registar:", err);
    mensagem.textContent = "Ocorreu um erro. Tenta novamente.";
  }

  document.getElementById("newsletter-form").reset();
});
