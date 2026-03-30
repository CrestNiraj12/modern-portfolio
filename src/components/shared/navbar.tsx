const Navbar = () => {
  return (
    <nav className="w-full flex flex-row justify-between items-center">
      <div className="flex-3">
        <p>&copy; Niraj Shrestha</p>
      </div>
      <div className="flex-2" />
      <ol className="flex-1 flex flex-row items-center justify-between">
        <li>Work</li>
        <li>About</li>
        <li>Contact</li>
      </ol>
    </nav>
  );
};

export { Navbar };
