import { ViewComponentProps } from "@figurl/core-views"
import { FunctionComponent } from "react"
import MandelbrotView from "./view-Mandelbrot/MandelbrotView"
import { isMandelbrotViewData } from "./view-Mandelbrot/MandelbrotViewData"

const loadView = (o: {data: any, width: number, height: number, opts: any, ViewComponent: FunctionComponent<ViewComponentProps>}) => {
    const {data, width, height} = o
    if (isMandelbrotViewData(data)) {
        // adapted from https://github.com/wmhilton/mandelbrot-playground
        return <MandelbrotView data={data} width={width} height={height} />
    }
    else return undefined
}

export default loadView