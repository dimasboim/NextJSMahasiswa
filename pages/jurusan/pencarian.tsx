import Link from 'next/link'
 
export default function Pencarianjurusan() {
    return(
        <div>
            test
            <ul>
      <li>
        <Link href="/mahasiswa">Mahasiswa</Link>
      </li>
      
    </ul>

    <h1 className="text-3xl font-bold underline">Pencarian jurusan</h1>
    <button class="btn btn-blue">
  Button
</button>
        </div>
    )
}