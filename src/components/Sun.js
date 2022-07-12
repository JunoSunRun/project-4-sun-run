import Footer from "./Footer";

const Sun = (props) => {

  return (
    <div className="sunAnimation">
      {props.children}

      <Footer />
    </div>
  )
}

export default Sun;