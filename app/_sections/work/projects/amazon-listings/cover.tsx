import { assets } from "./assets"
import { ProductPage } from "./product-page"

export function AmazonCover() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-[6cqw]">
      <div
        className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-2"
        style={{ width: "min(92cqw, 150cqh)" }}
      >
        <ProductPage images={assets.vivazen} name="Vivazen Oil 100 ml" brand="TechClinic Connect" sizes="(min-width: 1024px) 520px, 70vw" />
      </div>
    </div>
  )
}
