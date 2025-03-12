// app/[...slug]/page.tsx
import DisplayHomepage from "../components/DisplayHomepage";
import DisplayPage from "../components/DisplayPage";
import DisplayPlpPage from "../components/DisplayPlpPage";

const CatchAllPage = () => {
  // Current path: {Array.isArray(slug) ? slug.join('/') : slug}

  return (
    <div>
      {/* <DisplayPage /> */}
      <DisplayPlpPage />
      <DisplayHomepage />
    </div>
  );
};

export default CatchAllPage;
