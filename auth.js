// ===========================================
// ShubhCard Pro - Authentication & User Management
// Firebase Auth + Firestore Integration
// ===========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===========================================
// 🔑 FIREBASE CONFIG - YAHAN APNI KEYS DAAL
// ===========================================
const firebaseConfig = {
  apiKey: "AIzaSyAxPVD7Oedhz1Wj_gTB0KC51nbOjjljmP8",
  authDomain: "shubhcard-pro.firebaseapp.com",
  projectId: "shubhcard-pro",
  storageBucket: "shubhcard-pro.appspot.com",
  messagingSenderId: "616951986842",
  appId: "1:616951986842:web:328da2e7e3c06c0eb7fd23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ===========================================
// 👤 USER STATE MANAGEMENT
// ===========================================
window.currentUser = null;
window.isPremium = false;

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    window.currentUser = user;
    console.log('✅ User logged in:', user.email);
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      window.isPremium = userDoc.data().isPremium || false;
    } else {
      // First time user - create record
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null,
        isPremium: false,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    }
    
    updateAuthUI(user);
  } else {
    window.currentUser = null;
    window.isPremium = false;
    updateAuthUI(null);
  }
});

// ===========================================
// 🎨 UI UPDATES
// ===========================================
function updateAuthUI(user) {
  const loginBtn = document.getElementById('loginBtn');
  const userBadge = document.getElementById('userBadge');
  
  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userBadge) {
      userBadge.style.display = 'flex';
      userBadge.querySelector('.user-name').textContent = 
        user.displayName || user.email.split('@')[0];
      const avatar = userBadge.querySelector('.user-avatar');
      if (user.photoURL) {
        avatar.innerHTML = `<img src="${user.photoURL}" alt="">`;
      } else {
        avatar.textContent = (user.displayName || user.email)[0].toUpperCase();
      }
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userBadge) userBadge.style.display = 'none';
  }
}

// ===========================================
// 🔐 SIGNUP - Email/Password
// ===========================================
window.signupWithEmail = async function() {
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const name = document.getElementById('signupName').value.trim();
  const errorEl = document.getElementById('authError');
  
  if (!email || !password || !name) {
    showAuthError('Sab fields bharna zaroori hai');
    return;
  }
  if (password.length < 6) {
    showAuthError('Password 6 characters se zyada honi chahiye');
    return;
  }
  
  try {
    setAuthLoading(true);
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    
    // Save extra user data
    await setDoc(doc(db, "users", userCred.user.uid), {
      email: email,
      name: name,
      isPremium: false,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    });
    
    showToast('✅ Account ban gaya! Welcome ' + name);
    closeAuthModal();
  } catch (error) {
    showAuthError(getAuthErrorMessage(error.code));
  } finally {
    setAuthLoading(false);
  }
};

// ===========================================
// 🔓 LOGIN - Email/Password
// ===========================================
window.loginWithEmail = async function() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    showAuthError('Email aur password dono daalo');
    return;
  }
  
  try {
    setAuthLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    showToast('✅ Welcome back!');
    closeAuthModal();
  } catch (error) {
    showAuthError(getAuthErrorMessage(error.code));
  } finally {
    setAuthLoading(false);
  }
};

// ===========================================
// 🔵 GOOGLE LOGIN
// ===========================================
window.loginWithGoogle = async function() {
  try {
    setAuthLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    showToast('✅ Welcome ' + (result.user.displayName || ''));
    closeAuthModal();
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      showAuthError(getAuthErrorMessage(error.code));
    }
  } finally {
    setAuthLoading(false);
  }
};

// ===========================================
// 🚪 LOGOUT
// ===========================================
window.logoutUser = async function() {
  if (!confirm('Logout karna hai?')) return;
  try {
    await signOut(auth);
    showToast('👋 Logout ho gaya');
  } catch (error) {
    showToast('❌ Error: ' + error.message);
  }
};

// ===========================================
// 🔁 PASSWORD RESET
// ===========================================
window.resetPassword = async function() {
  const email = prompt('Apna email daalo, reset link bhejenge:');
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    showToast('📧 Reset link bhej diya — email check karo');
  } catch (error) {
    showToast('❌ ' + getAuthErrorMessage(error.code));
  }
};

// ===========================================
// 🛠️ HELPERS
// ===========================================
window.openAuthModal = function(mode = 'login') {
  document.getElementById('authModal').classList.add('show');
  switchAuthMode(mode);
};

window.closeAuthModal = function() {
  document.getElementById('authModal').classList.remove('show');
  document.getElementById('authError').textContent = '';
};

window.switchAuthMode = function(mode) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  
  if (mode === 'signup') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    loginTab.classList.remove('active');
    signupTab.classList.add('active');
  } else {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  }
  document.getElementById('authError').textContent = '';
};

function showAuthError(msg) {
  const el = document.getElementById('authError');
  if (el) el.textContent = msg;
}

function setAuthLoading(loading) {
  document.querySelectorAll('.auth-btn').forEach(btn => {
    btn.disabled = loading;
    btn.style.opacity = loading ? '0.6' : '1';
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

function getAuthErrorMessage(code) {
  const messages = {
    'auth/email-already-in-use': 'Ye email already register hai — login karo',
    'auth/invalid-email': 'Email galat format mein hai',
    'auth/weak-password': 'Password kamzor hai (6+ characters chahiye)',
    'auth/user-not-found': 'Account nahi mila — pehle signup karo',
    'auth/wrong-password': 'Galat password',
    'auth/invalid-credential': 'Email ya password galat hai',
    'auth/too-many-requests': 'Bahut try kiya, thoda ruk ke try karo',
    'auth/network-request-failed': 'Internet check karo',
    'auth/popup-blocked': 'Popup block hua — settings check karo'
  };
  return messages[code] || 'Kuch error aaya, dobara try karo';
}

// ===========================================
// 💎 PREMIUM CHECK (use this to lock features)
// ===========================================
window.checkPremium = function() {
  if (!window.currentUser) {
    openAuthModal('login');
    return false;
  }
  if (!window.isPremium) {
    if (typeof openModal === 'function') {
      openModal('proModal');
    }
    return false;
  }
  return true;
};

console.log('🔥 ShubhCard Auth loaded');
