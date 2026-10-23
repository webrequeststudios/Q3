import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner";
import { company } from "../data/content";

export default function NotFound() {
  return (
    <>
      <title>{`Page not found — ${company.name}`}</title>
      <PageBanner title="Page not found" image="/images/trench-excavation.jpg" position="center 60%">
        <p>The page you're looking for doesn't exist or has moved.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/contact" className="btn btn-outline-light">
            Contact Us
          </Link>
        </div>
      </PageBanner>
    </>
  );
}
