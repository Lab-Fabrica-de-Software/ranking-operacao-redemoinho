export default function Footer() {
  return (
    <footer className="bg-black/50 fixed bottom-0 w-full">
      <div className="container mx-auto py-4 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} Lab. Fábrica de Software. All rights reserved.
      </div>
    </footer>
  )
}
