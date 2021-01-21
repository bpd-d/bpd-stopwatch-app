import * as React from "react";
import { useState } from "react";
// import { Training } from "../../../core/models";
import { StopWatch, StopwatchCallback, StopWatchStateOptions } from "../../../api/stopwatch/stopwatch";
// import { StopwatchState } from "./PerformTraining";

// export function useStopwatch(callback: StopwatchCallback): StopWatch {
//     const [stopwatch, setStopwatch] = useState(new StopWatch());

//     React.useEffect(() => {
//         console.log("Stopwatch hook init")

//         let stop = new StopWatch();
//         stop.onTick(callback);
//         return () => {
//             console.log("Stopwatch hook end")
//         }
//     }, [])
//     return stopwatch;
// }

export function useStopwatch2(): [StopWatch, (callback: StopwatchCallback) => void] {
    const [stopwatch, setStopwatch] = React.useState(new StopWatch());

    React.useEffect(() => {
        console.log("Stopwatch hook init")
        return () => {
            console.log("Stopwatch hook end")
        }
    }, [])
    return [stopwatch, (callback: StopwatchCallback) => {
        stopwatch.onTick(callback);
        setStopwatch(stopwatch);
    }];
}

// export interface PerformTrainingHookObject {
//     current: StopwatchState,
//     pause: () => void;
//     resume: () => void;
//     start: () => void;
//     stop: () => void;
// }


// export function usePerformTraining(training: Training): PerformTrainingHookObject {
//     const [stopWatch, setOnTick] = useStopwatch2();
//     const [watchState, setWatchState] = React.useState<StopwatchState>({
//         timer: "-",
//         state: StopWatchStateOptions.STOPPED,
//         timerCls: "",
//         progress: 100,
//         roundProgress: 100,
//         trainingProgress: 100,
//         roundIdx: 0,
//         roundTotal: 0,
//         actionIdx: 0,
//         actionTotal: 0,
//         roundDuration: 0,
//         totalDuration: 0,
//         action: undefined,
//         round: undefined,
//     })


//     React.useEffect(() => {

//     }, [watchState])

//     return {

//     }
// }