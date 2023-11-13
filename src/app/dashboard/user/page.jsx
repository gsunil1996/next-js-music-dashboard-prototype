"use client"
import { useEffect, useState } from "react";
import { useLazyFetchBreedsQuery } from "../../redux/features/pets/petsSlice";

const User = () => {
  const [numOfDogs, setNumberOfDogs] = useState(10);

  const [getPets, { data, isFetching, isSuccess, isError, error }] = useLazyFetchBreedsQuery();

  // console.log("pets", data)

  const handleFetch = () => {
    getPets(numOfDogs)
  }

  useEffect(() => {
    getPets(numOfDogs)
  }, [])

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "center" }} >
        <div>
          <h1>Pets Api</h1>
          <div>
            <p>Pets to fetch</p>
            <input type="number" value={numOfDogs} onChange={(e) => setNumberOfDogs(e.target.value)} placeholder='enter number of dogs to fetch' />
            <button onClick={handleFetch} >Fetch</button>
          </div>
        </div>
      </div>

      {
        isFetching ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            Loading...
          </div>
        ) : isError ? (
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <h4>{error.message}</h4>
          </div>
        ) : data?.length == 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : isSuccess ? (
          <>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }} >
                <p>Number of dogs Fetched : {data.length}</p>
              </div>
              <table style={{ margin: "auto" }} >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Picture</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id} >
                      <td>{item.name}</td>
                      <td>
                        <img src={item.image.url} alt={item.name} style={{ width: "100px" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : ""
      }
    </div>
  )
}

export default User