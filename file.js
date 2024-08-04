import { db } from "./config.js"
import { 
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
  query,
  where,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";




const todo = document.querySelector("#todo");
const addBtn = document.querySelector("#add-btn");
const added = document.querySelector("#data");
const select = document.querySelector("#select");
const citiesBtn = document.querySelectorAll(".cities-btn");
const reset = document.querySelector(".reset");



let arr = [];


citiesBtn.forEach((btn)=>{
  btn.addEventListener("click" , async(event)=>{
    arr = [];
    console.log(event.target.innerHTML);
    
    const citiesRef = collection(db, "todocollection");
    
    const q = query(citiesRef, where("city", "==", event.target.innerHTML));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    console.log(arr);
    render();
  })
})

reset.addEventListener("click" , getData);



addBtn.addEventListener("click",async (event)=>{
  event.preventDefault()
  try {
    const docRef = await addDoc(collection(db, "todocollection"), {
      text: todo.value,
      city: select.value,
      time: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      text: todo.value,
      city: select.value,
      id: docRef.id,
    });
    render();
    todo.value = "";
  } catch (error) {
    console.error("Document: ", error);
  }
  render()
})


async function getData() {
  const q = query(collection(db, "todocollection"), orderBy("time", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({
      ...doc.data(),
      id: doc.id
    });
  });
  console.log(arr);
  render();
}

getData();


async function render(){
  added.innerHTML= "";

  if (arr.length === 0) {
    added.innerHTML = `No Data Found`;
    return;
  }
  
  arr.map((item)=>{
    added.innerHTML += `
    <li>${item.text}</li>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
    <p>${item.time ? item.time.toDate() : "no time"}</p>
    <hr/>
    `
  })
  
  
  const editBtn = document.querySelectorAll(".edit-btn");
  const deleteBtn = document.querySelectorAll(".delete-btn");


  editBtn.forEach((btn , index)=>{
    btn.addEventListener("click", async()=>{
      const newValue = prompt("Enter new Value")
      const newTodo = doc(db, "todocollection", arr[index].id);
      await updateDoc(newTodo, {
        text : newValue 
      });
      console.log("Updated");
      arr[index].text = newValue;
      render()
    })
  })

  deleteBtn.forEach((btn , index) =>{
    btn.addEventListener("click", async()=>{
      await deleteDoc(doc(db, "todocollection", arr[index].id));
      arr.splice(index , 1)
      render()
    })
  })
  
}
render()




