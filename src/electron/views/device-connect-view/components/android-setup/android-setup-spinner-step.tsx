// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { NamedFC } from 'common/react/named-fc';
import { AndroidSetupActionCreator } from 'electron/flux/action-creator/android-setup-action-creator';
import { AndroidSetupSpinner } from 'electron/views/device-connect-view/components/android-setup/android-setup-spinner';
import * as React from 'react';
import { AndroidSetupStepLayout, AndroidSetupStepLayoutProps } from './android-setup-step-layout';

export type AndroidSetupSpinnerStepDeps = {
    androidSetupActionCreator: AndroidSetupActionCreator;
};

export type AndroidSetupSpinnerStepProps = {
    deps: AndroidSetupSpinnerStepDeps;
    spinnerLabel: string;
};

export const AndroidSetupSpinnerStep = NamedFC<AndroidSetupSpinnerStepProps>(
    'AndroidSetupSpinnerStep',
    props => {
        const layoutProps: AndroidSetupStepLayoutProps = {
            leftFooterButtonProps: {
                text: 'Cancel',
                onClick: props.deps.androidSetupActionCreator.cancel,
            },
            rightFooterButtonProps: {
                text: 'Next',
                disabled: true,
            },
        };

        return (
            <AndroidSetupStepLayout {...layoutProps}>
                <AndroidSetupSpinner label={props.spinnerLabel} />
            </AndroidSetupStepLayout>
        );
    },
);
