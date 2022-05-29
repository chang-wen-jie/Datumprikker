  const updateJob = async () => {
    await setDoc(jobCollectionRef, {
      title: "poep",
      task: "poep",
      date: "poep",
      status: "poep",
      author: {
        name: "poep",
        id: "poep",
      },
    });
  }

  const deleteJob = async (id) => {
    const postDoc = doc(db, "tasks", id);
    await deleteDoc(postDoc);
  }
