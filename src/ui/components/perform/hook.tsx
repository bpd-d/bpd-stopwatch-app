import * as React from "react";
import { useState } from "react";
import { StopWatch, StopwatchCallback } from "../../../api/stopwatch/stopwatch";

export function useStopwatch(callback: StopwatchCallback): StopWatch {
    const [stopwatch, setStopwatch] = useState(null);

    React.useEffect(() => {
        console.log("Stopwatch hook init")

        let stop = new StopWatch();
        stop.onTick(callback);
        setStopwatch(stop);
        return () => {
            console.log("Stopwatch hook end")
        }
    }, [])
    return stopwatch;
}