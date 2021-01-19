import * as React from "react";
import { Training } from "src/core/models";

export function useGetTraining(): [Training, (id: string) => void] {
    const [training, setTraining] = React.useState(undefined);
    function onGetTraining(training: Training) {
        setTraining(training);
    }

    function getTraining(id: string) {
        window.$flow.perform("GET_TRAINING", id);
    }

    React.useEffect(() => {
        const getTrainingSubscription = window.$flow.subscribe("GET_TRAINING", { finish: onGetTraining })
        return () => {
            window.$flow.unsubscribe("GET_TRAINING", getTrainingSubscription.id)
        }
    })
    return [training, getTraining]
}

export function getTraining(id: string) {
    window.$flow.perform("GET_TRAINING", id);
}


export function useCustomHookWithCallback(init: string): [string, (value: string) => void] {
    const [val, setVal] = React.useState(init);

    function onUpdate(val: string) {
        setVal(val)
    }

    return [val, (value: string) => {
        onUpdate(value)
    }];
}