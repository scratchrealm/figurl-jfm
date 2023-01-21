// Adapted from https://github.com/wmhilton/mandelbrot-playground

import { FunctionComponent, useEffect, useState } from "react";
import { MandelbrotViewData } from "./MandelbrotViewData";
import Opts from "./Opts";
import { pan } from "./utils/pan";
import { zoom } from "./utils/zoom";

type Props = {
	data: MandelbrotViewData
	width: number
	height: number
}

const bounds = [{r: 0.2361513689220573, i: -0.5210970613723728}, {r: 0.23662026741217732, i: -0.5207844623789595}] as [{r: number, i: number}, {r: number, i: number}]

const MandelbrotView: FunctionComponent<Props> = ({data, width, height}) => {

    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null)

    const W = 800
    const H = 600

    useEffect(() => {
        if (!canvasElement) return
        const worker = new Worker(new URL('./worker.ts', import.meta.url))
        const offscreenCanvas = canvasElement.transferControlToOffscreen();
        const opts: Opts = {
            width: W,
            height: H,
            bounds,
            N: 1024
        }
        
        worker.postMessage({
            canvas: offscreenCanvas,
            opts
        }, [offscreenCanvas])

        let prevMouseXY: [number, number] | null = null
        let isMouseDown: boolean = false

        const onwheel = (event: WheelEvent) => {
            event.preventDefault();
            opts.bounds = zoom(event.offsetX, event.offsetY, event.deltaY, opts.bounds, {WIDTH: opts.width, HEIGHT: opts.height})
            worker.postMessage({
                opts
            }, [])
        }
        const onmousedown = (event: MouseEvent) => {
            isMouseDown = true;
        }
        const onmouseup = (event: MouseEvent) => {
            isMouseDown = false;
            prevMouseXY = null;
        }
        const onmousemove = (event: MouseEvent) => {
            event.preventDefault();
            if (isMouseDown) {
                if (prevMouseXY) {
                    opts.bounds = pan(event.offsetX, event.offsetY, prevMouseXY[0], prevMouseXY[1], opts.bounds, {WIDTH: opts.width, HEIGHT: opts.height})
                }
                prevMouseXY = [event.offsetX, event.offsetY];
                worker.postMessage({
                    opts
                }, [])
            }
        }
        canvasElement.addEventListener("wheel", onwheel);
        canvasElement.addEventListener("mousedown", onmousedown)
        canvasElement.addEventListener("mouseup", onmouseup)
        canvasElement.addEventListener("mousemove", onmousemove)
        return () => {
            worker.terminate()
            canvasElement.removeEventListener("wheel", onwheel)
            canvasElement.removeEventListener("mousedown", onmousedown)
            canvasElement.removeEventListener("mouseup", onmouseup)
            canvasElement.removeEventListener("mousemove", onmousemove)
        }
    }, [canvasElement])

    return (
        <div>
            <canvas
                ref={elmt => {setCanvasElement(elmt)}}
                width={W}
                height={H}
            />
        </div>
    )
}

export default MandelbrotView