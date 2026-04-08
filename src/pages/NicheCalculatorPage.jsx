import { useParams, Navigate } from "react-router-dom";
import { getNiche } from "../config/nicheConfig";
import Calculator from "../components/Calculator";
import SeoHead from "../components/SeoHead";
import PinterestMeta from "../components/PinterestMeta";

export default function NicheCalculatorPage() {
  const { niche: slug } = useParams();
  const niche = getNiche(slug);

  if (!niche) return <Navigate to="/" replace />;

  return (
    <>
      <SeoHead niche={niche} />
      <PinterestMeta
        title={niche.metaTitle}
        description={niche.metaDescription}
        nicheName={niche.name}
      />
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {niche.h1}
      </h1>
      <Calculator nicheConfig={niche} />
    </>
  );
}
