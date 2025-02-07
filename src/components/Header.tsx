const Header = () => {
  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <MainMenu />
        <div className="flex items-center gap-4">
          <SearchButton />
          <LanguageSelector />
          <ContactButton />
        </div>
      </nav>
    </header>
  )
} 