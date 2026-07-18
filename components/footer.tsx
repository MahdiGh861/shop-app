
function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="p-5 text-center">
        تمام حقوق برای فروشگاه محفوظ است &copy; {currentYear}
      </div>
    </footer>
  )
}

export default Footer
