// `page-flip` ships without type definitions; this covers the parts we use.
declare module "page-flip" {
  type FlipCorner = "top" | "bottom"
  type Orientation = "portrait" | "landscape"
  type FlipState = "user_fold" | "fold_corner" | "flipping" | "read"

  export type FlipSetting = {
    startPage: number
    size: "fixed" | "stretch"
    width: number
    height: number
    minWidth: number
    maxWidth: number
    minHeight: number
    maxHeight: number
    drawShadow: boolean
    flippingTime: number
    usePortrait: boolean
    startZIndex: number
    autoSize: boolean
    maxShadowOpacity: number
    showCover: boolean
    mobileScrollSupport: boolean
    swipeDistance: number
    clickEventForward: boolean
    useMouseEvents: boolean
    showPageCorners: boolean
    disableFlipByClick: boolean
  }

  type FlipEvents = {
    flip: number
    changeOrientation: Orientation
    changeState: FlipState
    init: { page: number; mode: Orientation }
    update: { page: number; mode: Orientation }
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: Partial<FlipSetting>)
    loadFromHTML(items: HTMLElement[] | NodeListOf<HTMLElement>): void
    on<K extends keyof FlipEvents>(event: K, callback: (e: { data: FlipEvents[K]; object: PageFlip }) => void): PageFlip
    flip(page: number, corner?: FlipCorner): void
    flipNext(corner?: FlipCorner): void
    flipPrev(corner?: FlipCorner): void
    turnToPage(page: number): void
    getCurrentPageIndex(): number
    getPageCount(): number
    getOrientation(): Orientation
    destroy(): void
  }
}
