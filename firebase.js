import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyBW9zssZOBZvJlTpNmdLUjlfcjTAWIMdsM",
  authDomain: "rn-todo-prac-7cf77.firebaseapp.com",
  projectId: "rn-todo-prac-7cf77",
  storageBucket: "rn-todo-prac-7cf77.appspot.com",
  messagingSenderId: "47160925799",
  appId: "1:47160925799:web:9f4e6b25d0b57d38433ec2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
