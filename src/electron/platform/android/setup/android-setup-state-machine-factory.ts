// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AndroidSetupActions } from 'electron/flux/action/android-setup-actions';
import {
    AndroidSetupStateMachineFactory,
    AndroidSetupStepTransitionCallback,
} from 'electron/flux/types/android-setup-state-machine-types';
import { AndroidSetupStepId } from 'electron/platform/android/setup/android-setup-step-id';
import { createAndroidSetupSteps } from 'electron/platform/android/setup/android-setup-steps-factory';
import { StateMachine } from 'electron/platform/android/setup/state-machine/state-machine';
import { AndroidSetupStepDeps } from './android-setup-step-deps';
import { StateMachineSteps } from './state-machine/state-machine-steps';

type AndroidSetupStepsFactory = (
    stepTransition: AndroidSetupStepTransitionCallback,
) => StateMachineSteps<AndroidSetupStepId, AndroidSetupActions>;

const stepsFactory = (
    deps: Omit<AndroidSetupStepDeps, 'stepTransition'>,
): AndroidSetupStepsFactory => {
    return (stateMachineStepTransition: AndroidSetupStepTransitionCallback) => {
        const allDeps = {
            ...deps,
            stepTransition: stateMachineStepTransition,
        };

        return createAndroidSetupSteps(allDeps);
    };
};

export const createAndroidSetupStateMachineFactory = (
    deps: Omit<AndroidSetupStepDeps, 'stepTransition'>,
): AndroidSetupStateMachineFactory => {
    return storeStepTransition => {
        return new StateMachine<AndroidSetupStepId, AndroidSetupActions>(
            stepsFactory(deps),
            storeStepTransition,
            'detect-adb',
        );
    };
};
