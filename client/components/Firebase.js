import {
    getFirestore,
    setDoc,
    getDoc,
    doc,
} from "firebase/firestore";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    reauthenticateWithPopup,
    reauthenticateWithCredential,
    EmailAuthProvider,

} from "firebase/auth";
import {initializeApp, getApps, getApp} from "firebase/app";
import { snackActions } from '../utils/SnackbarUtils';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = getApps().length>0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();


auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.displayName);
    } else {
        console.log('user not logged in');
    }
}
);

const loginInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const u = res.user;
        const docRef = doc(db, "users", u.email);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(doc(db, "users", u.uid), {
                authProvider: "google",
                isAdmin: false,
            });
        }
    } catch (err) {
        console.error(err);
        snackActions.error('Failed to login with Google');
    }
};


const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.log(err.code)
        if (err.code === "auth/user-not-found") {
            snackActions.error('User not found');
        }
        else if (err.code === "auth/wrong-password") {
            snackActions.error('Wrong password');
        }
        else {
            snackActions.error('Something went wrong');
        }
    }
};



const registerWithEmailAndPassword = async (email, password, displayName) => {
    try {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            snackActions.error('User already exists');
        } else {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const u = res.user;
            updateName(displayName);
            await setDoc(doc(db, "users", u.uid), {
                authProvider: "password",
                isAdmin: false,
            });
        }

    } catch (err) {
        console.log(err);
        snackActions.error('Something went wrong');
    }
};

const updatePhoneNumber = async (phoneNumber, sendNotification = false) => {
    try {
        auth.currentUser.phoneNumber = phoneNumber;
        await updateProfile(auth.currentUser, {
            phoneNumber: phoneNumber,
        });
        if (sendNotification) {
            snackActions.success('Phone number updated');
        }
    } catch (err) {
        if (sendNotification) {
            console.log(err);
            snackActions.error('Something went wrong');
        }
    }
}

const updateEmail = async (email, sendNotification = false) => {
    try {
        auth.currentUser.displayName = email;
        await updateProfile(auth.currentUser, {
            email: email,
        });
        if (sendNotification) {
            snackActions.success('Email updated');
        }
    }
    catch (err) {
        if (sendNotification) {
            console.log(err);
            snackActions.error('Something went wrong');
        }
    }
}

const updateName = async (name, sendNotification = false) => {
    try {
        auth.currentUser.displayName = name;
        await updateProfile(auth.currentUser, {
            displayName: name,
        });
        if (sendNotification) {
            snackActions.success('Name updated');
        }
    } catch (err) {
        if (sendNotification) {
            console.log(err);
            snackActions.error('Something went wrong');
        }
    }
}

const updatePicture = async (pic, sendNotification = false) => {
    try {
        auth.currentUser.photoURL = pic;
        await updateProfile(auth.currentUser, {
            photoURL: pic,
        });
        if (sendNotification) {
            snackActions.success('Picture updated');
        }
    } catch (err) {
        if (sendNotification) {
            console.log(err);
            snackActions.error('Something went wrong');
        }
    }
}


const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        snackActions.error('Something went wrong');
    }
};

const reauthWithGoogle = async () => {
    try {
        await reauthenticateWithPopup(auth.currentUser, googleProvider).then(() => {
            auth.currentUser.delete();
        }).catch(err => {
            console.error(err);
            snackActions.error('Something went wrong');
        })
    } catch (err) {
        console.error(err);
        snackActions.error('Something went wrong');
    }

}

const reautWithPassword = async (password) => {
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )
    try {
        await reauthenticateWithCredential(auth.currentUser, credential).then(() => {
            auth.currentUser.delete();
            console.log('reauthenticated');
        }).catch(err => {
            console.error(err);
            snackActions.error('Something went wrong');
        })
    } catch (err) {
        console.error(err);
        snackActions.error('Something went wrong');
    }
}


const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    updateName,
    reauthWithGoogle,
    reautWithPassword,
    updatePicture,
    updateEmail,
    updatePhoneNumber,
    loginInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};