export default function HeroSection() {
  return (
    <div className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 grid-cols-6 grid-rows-2">
      <div className="col-span-4 row-span-2 pt-4">
        <img src="Images/1.jpg" className="w-full h-full object-cover" alt="Image 1" />
      </div>
      <div className="col-span-2 row-span-1 pt-4">
        <img src="Images/2.jpg" className="w-full h-full object-cover" alt="Image 2" />
      </div>
      <div className="col-span-2 row-span-1">
        <img src="Images/3.jpg" className="w-full h-full object-cover" alt="Image 3" />
      </div>
    </div>
  );
}
