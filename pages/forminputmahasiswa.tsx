import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";

import Link from 'next/link'
 const koneksiMahasiswa = axios.create({
  
  baseURL: "http://127.0.0.1:5000/api/mahasiswa" 
});

export default function FormMahasiswa() {
    const [statenama, setNama] = useState("");
    const [statenim, setNim] = useState("");
    const [statetanggal, setTanggal] = useState("2018-07-22");
    const [statealamat, setAlamat] = useState("");
    const [statefoto, setFoto] = useState("");
    const [mahasiswa, setMahasiswa] =  useState(null);
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
     
    const [stateedit,setEdit]=useState("hide");

     
    
    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
   
  const handleSubmitAdd =  (event) => {
    
    event.preventDefault();
    alert('lewat');
    const formData = new FormData(event.target);
    koneksiMahasiswa
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
     
 }
 const handleSubmitEdit =  (event) => {
    
  event.preventDefault();
  const address = "/"+event.target.nim.value;
  alert(address);
  //const formData = new FormData(event.target);
  const formData = {
    nim: event.target.nim.value,
    nama: event.target.nama.value,
    alamat: event.target.alamat.value,
    tanggal_lahir: event.target.tanggal_lahir.value
}
  alert(formData);
  koneksiMahasiswa
    .put( address,formData)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}
  const handleAdd = (event) => {
    
     setAdd("show boxInput");
     setbtnAdd("hide");
     setEdit("hide");
 
      
  }
  const handleCancelAdd = (event) => {
    
     setAdd("hide");
     setbtnAdd("show");
     setEdit("hide");
 
      
  }
  const handleCancelEdit = (event) => {
    
    setAdd("hide");
    setbtnAdd("show");
    setEdit("hide");
    setNama("");
    setNim("");
    setAlamat("");
    setTanggal(formatDate("2018-07-22"));
    setFoto("");
     
 }
   const handleDelete = (event) => {
            event.preventDefault();
            var nim = event.target.value;
            koneksiMahasiswa.delete(`/${nim}`)
              .then(response => {
                console.log('Data berhasil dihapus:', response.data);
                setMahasiswa(
                  mahasiswa.filter((mahasiswa) => {
                     return mahasiswa.nim !== nim;
                  }))
             
                // Lakukan langkah-langkah lain setelah penghapusan data
              })
              .catch(error => {
                console.error('Gagal menghapus data:', error);
              })
          }

      const handleEdit = (event) => {
            event.preventDefault();
            var nim = event.target.value;
            
               const mhsEdit =  mahasiswa.filter((mahasiswa) => {
                     return mahasiswa.nim == nim;
                  });
                  if(mhsEdit!=null){

                    setNama(mhsEdit[0].nama);
                    setNim(mhsEdit[0].nim);
                    setAlamat(mhsEdit[0].alamat);
                    setTanggal(formatDate(mhsEdit[0].tanggal_lahir));
                    setFoto(mhsEdit[0].foto);
                    setAdd("hide");
                    setbtnAdd("show");
                    setEdit("show box");

                  }
          }
  useEffect(() => {
      async function getMahasiswa() {
        const response = await koneksiMahasiswa.get("/").then(function (axiosResponse) {
            setMahasiswa(axiosResponse.data.data); 
     
         })
         .catch(function (error) {   
          alert('error from mahasiswa in api mahasiswa: '+error);
         });;
          }
      getMahasiswa();
    }, []);
  
   
if(mahasiswa==null){
return(
  <div>
    waiting...
  </div>
)
}else{

  return (
    <div>
      
     <button id="btnadd" onClick={handleAdd} className={statebutonadd}>add</button>
    
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
        <table border={0}>
            <tbody>
            <tr>
            <td> <label> nim:</label></td>
            <td><input type="text" id="nim" name="nim"  className="text"/>
              
              </td>
        </tr>
        <tr>
            <td>  <label> nama:</label></td>
            <td><input type="text" id="nama"   name="nama" className="text"
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>   <input
                    type="file" name="image"/>  </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Lahir:</label></td>
            <td>  <input type="date" name="tanggal_lahir"  className="text"
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}}  name="alamat"  className="text" ></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" className="btn btn-blue"  />
          <input type="button" value="cancel" onClick={handleCancelAdd} className="btn btn-blue" />
          </form>  
      <form id="formedit" className={stateedit} onSubmit={handleSubmitEdit}>
 
          <table border={0}>
            <tbody>
            <tr>
            <td> <label> nim:</label></td>
            <td><input type="text" id="nim"  value={statenim} name="nim"/>
              {/* onChange={handleOnchangeNim}  /> */}
              </td>
        </tr>
        <tr>
            <td>  <label> nama:</label></td>
            <td><input type="text" id="nama"  value={statenama} name="nama"
               onChange={(e) => setNama(e.target.value)}
               /></td>
        </tr>
        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>
        <tr>
            <td>  <label> Tanggal Lahir:</label></td>
            <td>  <input type="date" value={statetanggal} name="tanggal_lahir"  onChange={(e) => setTanggal(e.target.value)}
           min="1970-01-01" max="2025-12-31"/>
     </td>
        </tr>
        <tr>
            <td>  <label> alamat:</label></td>
            <td><textarea  id="address" style={{resize: "none"}} value={statealamat} name="alamat"  onChange={(e) => setAlamat(e.target.value)}></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" className="btn btn-blue"  />
          <input type="button" value="cancel" onClick={handleCancelEdit} className="btn btn-blue"  />
          </form>  
        <br/>
        <br/>
       <h1 className="purples">Menggunakan CSS Native</h1>
       <hr/>
        <div className="container">
          
          {mahasiswa.map((mhs) => 
           
           <div className="card">
             <h2>{mhs.nim} - {mhs.nama}</h2>
             <div class="title title--epic">{mhs.alamat}</div>
             <div class="desc">{formatDate(mhs.tanggal_lahir)}</div>
            
             <img src={mhs.foto} width="80"/>
             
               <div class="actions">
               <button class="actions__like"  onClick={handleEdit} value={mhs.nim}>Edit &nbsp; <i class="fas fa-heart"></i> </button>
               <button class="actions__trade"  onClick={handleDelete} value={mhs.nim}>Delete &nbsp; <i class="fas fa-exchange-alt"></i> </button>
             
             </div>
           
          
           </div>

            
                )}     
          
          </div>
          <hr/>
          <br/>
          <h1>Menggunakan Tailwind</h1>
<div>
<div className="container my-12 mx-auto px-4 md:px-12">
    <div className="flex flex-wrap -mx-1 lg:-mx-4">

       
{mahasiswa.map((mhs) => 

        <div className="box my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
    <a href="#">
        <img className="rounded-t-lg" src={mhs.foto} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{mhs.nama}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{mhs.alamat}</p>
       
        <button className="btn btn-blue"  onClick={handleEdit} value={mhs.nim}>Edit &nbsp; <i className="fas fa-heart"></i> </button>
             &nbsp;  <button className="btn btn-blue"  onClick={handleDelete} value={mhs.nim}>Delete &nbsp; <i className="fas fa-exchange-alt"></i> </button>
            
    </div>
</div>

)}
   </div></div>   
</div>

          </div>
        )
}
  
  }
   