import { isEqualTo, validateObject } from "@figurl/core-utils"

export type MandelbrotViewData = {
    type: 'jfm.Mandelbrot',
    spec: any
}

export const isMandelbrotViewData = (x: any): x is MandelbrotViewData => {
    return validateObject(x, {
        type: isEqualTo('jfm.Mandelbrot'),
        spec: () => (true)
    })
}