import * as React from "react"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt || ""}
        className={className}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
