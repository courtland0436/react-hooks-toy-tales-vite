import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Task 2: Fetch toys on page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Helper function to add a new toy to state
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // Helper function to remove a toy from state
  function handleDeleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // Helper function to update a toy (likes) in state
  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy} 
        onUpdateToy={handleUpdateToy} 
      />
    </>
  );
}

export default App;