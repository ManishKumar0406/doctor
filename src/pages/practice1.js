import { useEffect, useState } from "react";

function Practice1() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

//     function useForceUpdate() {
//         const [value, setValue] = useState(0);
//         return () => setValue(value => value + 1);
//     }

// function deleteRecord(id){
//          alert(id);
//     // fetch(`https://jsonplaceholder.typicode.com/comments/${id}`,{

    //     method:'DELETE',
    // }).then((result)=>{
    //     result.json().then((response)=>{
    //         console.warn("response",response);
    //         getData();
    //         console.log("rahul");
    //     })
    // })
    //  const deleteData = data.find((subdata) => subdata.id == id);
    //  const index = data.indexOf(deleteData);
    //  data.splice(index, 1);
    //  useForceUpdate();
    //  console.log(JSON.stringify(data)); 
// }
    function getData() {
        fetch("https://jsonplaceholder.typicode.com/comments").then((result) => {
            result.json().then((response) => {
                console.warn("response", response)
                setData(response);
            })
        })
    }




    return (


        <div className="container text-center" >
            <h1 >Fetch data through API</h1>
            <table style={{ border: "1px solid green" }}>
                <thead>
                    <tr>
                    <th style={{ border: "1px solid green" }}>PostId</th>
                        <th style={{ border: "1px solid green" }}>Id</th>
                        <th style={{ border: "1px solid green" }}>Name</th>
                        <th style={{ border: "1px solid green" }}>Email</th>
                        <th style={{ border: "1px solid green" }}>Body</th>
                        <th style={{ border: "1px solid green" }}>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>
                    (
                        <tr style={{ border: "1px solid green" }} key={item.id}>
                            <td style={{ border: "1px solid green" }}>{item.postId}</td>
                            <td style={{ border: "1px solid green" }}>{item.id}</td>
                            <td style={{ border: "1px solid green" }}>{item.name}</td>
                            <td style={{ border: "1px solid green" }}>{item.email}</td>
                            <td style={{ border: "1px solid green" }}>{item.body}</td>
                            {/* <td><button type="button" onClick={()=>deleteRecord(item.id)}>Delete</button></td> */}
                        </tr>
                    )
                  ) 
                  }
                </tbody>
            </table>
        </div>

    );

}

export default Practice1;