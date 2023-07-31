import Heading from "./Heading";

export default function Header() {

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="https://www.rehashweb3.xyz/" className="-m-1.5 p-1.5">
            <span className="sr-only">Rehash</span>
            <img className="h-8 w-auto" src="https://ik.imagekit.io/mihirsinhparmar/rehash.png" alt="Rehash Logo" />
          </a>
        </div>
      <Heading heading={'Rehash Rights Checker'} />
        </nav>
    </header>
  )
}
